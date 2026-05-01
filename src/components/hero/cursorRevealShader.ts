/**
 * GLSL shaders for the cursor-reveal hero portrait — Lorenzo template style.
 *
 * Architecture: two passes, ping-pong render targets.
 *
 * 1. TRAIL pass (offscreen, ping-pong)
 *    Reads previous trail buffer, multiplies by decay factor (~0.985),
 *    paints a Gaussian splat at the current cursor, writes new trail buffer.
 *    Result: a persistent reveal mask that decays over ~3-4 seconds.
 *
 * 2. COMPOSITE pass (to screen)
 *    Reads two textures (base + reveal) and the current trail buffer.
 *    Uses trail as a mask to blend base→reveal.
 *    Adds liquid displacement weighted by trail gradient (Lorenzo's "wet"
 *    feel near the active reveal).
 *    Adds an edge glow at the trail boundary.
 *
 * If textures aren't provided, falls back to procedural placeholders so the
 * effect ships before real photos arrive.
 */

export const screenVertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/**
 * Trail accumulation pass.
 *
 * uniforms:
 *   uPrev          — previous trail texture (ping-pong source)
 *   uMouse         — 0..1 UV coords (current cursor)
 *   uMouseSmoothed — 0..1 UV coords, smoothed (where the splat is painted)
 *   uMouseActive   — 1.0 if cursor is over the canvas, 0.0 otherwise
 *   uAspect        — vec2 to keep the splat circular regardless of canvas shape
 *   uDecay         — per-frame decay multiplier (e.g. 0.985)
 *   uSplatRadius   — splat size in UV units (e.g. 0.07)
 *   uSplatStrength — splat intensity per frame (e.g. 0.35)
 */
export const trailFragmentShader = /* glsl */ `
  precision highp float;

  uniform sampler2D uPrev;
  uniform vec2 uMouseSmoothed;
  uniform float uMouseActive;
  uniform vec2 uAspect;
  uniform float uDecay;
  uniform float uSplatRadius;
  uniform float uSplatStrength;

  varying vec2 vUv;

  void main() {
    // Read the previous frame's trail value, multiply by decay.
    float prev = texture2D(uPrev, vUv).r * uDecay;

    // Add a Gaussian splat at the current smoothed cursor position.
    vec2 d = (vUv - uMouseSmoothed) * uAspect;
    float dist = length(d);
    float falloff = exp(-(dist * dist) / (uSplatRadius * uSplatRadius));
    float splat = falloff * uSplatStrength * uMouseActive;

    float trail = clamp(prev + splat, 0.0, 1.0);

    gl_FragColor = vec4(trail, 0.0, 0.0, 1.0);
  }
`;

/**
 * Final composite pass.
 *
 * uniforms:
 *   uTrail         — the persistent trail buffer (R channel)
 *   uTextureBase   — "before" portrait (greyscale-ish recommended)
 *   uTextureReveal — "after / AI styled" portrait
 *   uHasTextures   — 1.0 if both textures provided, 0.0 to use procedural
 *   uMouseSmoothed — for live displacement near the cursor
 *   uTime          — for subtle ambient noise
 *   uAspect        — for circular displacement
 */
export const compositeFragmentShader = /* glsl */ `
  precision highp float;

  uniform sampler2D uTrail;
  uniform sampler2D uTextureBase;
  uniform sampler2D uTextureReveal;
  uniform bool uHasTextures;
  uniform vec2 uMouseSmoothed;
  uniform float uMouseActive;
  uniform float uTime;
  uniform vec2 uAspect;

  varying vec2 vUv;

  // ---- noise helpers (used for procedural fallback textures) ----
  vec3 hash3(vec2 p) {
    vec3 q = vec3(dot(p, vec2(127.1, 311.7)),
                  dot(p, vec2(269.5, 183.3)),
                  dot(p, vec2(419.2, 371.9)));
    return fract(sin(q) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    float a = hash3(i).x;
    float b = hash3(i + vec2(1, 0)).x;
    float c = hash3(i + vec2(0, 1)).x;
    float d = hash3(i + vec2(1, 1)).x;
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  vec3 placeholderBase(vec2 uv) {
    float n = noise(uv * 6.0) * 0.6 + noise(uv * 24.0) * 0.4;
    return vec3(n) * 0.45;
  }
  vec3 placeholderReveal(vec2 uv) {
    vec3 purple = vec3(0.4745, 0.2823, 1.0);
    vec3 pink   = vec3(1.0, 0.6353, 1.0);
    float t = uv.x * 0.6 + uv.y * 0.4;
    t += (noise(uv * 4.0) - 0.5) * 0.3;
    return mix(purple, pink, smoothstep(0.0, 1.0, t));
  }

  // Sample the trail and a few neighbours so we can derive a gradient.
  // Used to push the displacement vector along the trail edge —
  // produces the "liquid" feeling Lorenzo's hero has.
  void main() {
    vec2 uv = vUv;
    float trail = texture2D(uTrail, uv).r;

    // Trail gradient: estimates how rapidly the trail mask is changing.
    // Strong near the edges of the reveal — that's where we want
    // displacement to be most pronounced.
    float texelX = 1.0 / 512.0;
    float texelY = 1.0 / 512.0;
    float tL = texture2D(uTrail, uv + vec2(-texelX, 0.0)).r;
    float tR = texture2D(uTrail, uv + vec2( texelX, 0.0)).r;
    float tU = texture2D(uTrail, uv + vec2(0.0,  texelY)).r;
    float tD = texture2D(uTrail, uv + vec2(0.0, -texelY)).r;
    vec2 gradient = vec2(tR - tL, tU - tD);

    // Live cursor pull: extra displacement that's strongest near the
    // current cursor position, fading with distance.
    vec2 cursorDelta = (uv - uMouseSmoothed) * uAspect;
    float cursorDist = length(cursorDelta);
    float cursorPull = (1.0 - smoothstep(0.0, 0.4, cursorDist)) * uMouseActive;

    // Combine: gradient pushes the sample, cursor pulls it.
    vec2 displacement = gradient * 0.06 + normalize(cursorDelta + 1e-5) * cursorPull * 0.012;

    // Sample base with displacement (so the underlying image squishes
    // around the reveal edge), reveal without (the AI version stays sharp).
    vec2 baseUv   = clamp(uv - displacement, 0.0, 1.0);
    vec2 revealUv = clamp(uv - displacement * 0.4, 0.0, 1.0);

    vec3 baseCol = uHasTextures
      ? texture2D(uTextureBase, baseUv).rgb
      : placeholderBase(baseUv);

    vec3 revealCol = uHasTextures
      ? texture2D(uTextureReveal, revealUv).rgb
      : placeholderReveal(revealUv);

    // Smooth the trail mask a touch so the blend doesn't have hard edges.
    float mask = smoothstep(0.05, 0.7, trail);
    vec3 color = mix(baseCol, revealCol, mask);

    // Edge glow: brand pink along the trail boundary.
    float edge = abs(trail - 0.4) < 0.06 ? 1.0 - abs(trail - 0.4) / 0.06 : 0.0;
    color += edge * vec3(1.0, 0.6353, 1.0) * 0.45;

    // Subtle vignette so the corners drop into surface tone.
    float vig = smoothstep(1.0, 0.5, length(uv - 0.5));
    color *= mix(0.85, 1.0, vig);

    gl_FragColor = vec4(color, 1.0);
  }
`;

// Backward-compatible exports for the current hero component.
// The richer ping-pong trail shaders above can be wired in later without
// breaking the existing homepage structure.
export const vertexShader = screenVertexShader;

export const fragmentShader = /* glsl */ `
  precision highp float;

  uniform sampler2D uTextureBase;
  uniform sampler2D uTextureReveal;
  uniform bool uHasTextures;
  uniform vec2 uMouse;
  uniform vec2 uMouseSmoothed;
  uniform float uMouseActive;
  uniform float uTime;
  uniform vec2 uAspect;

  varying vec2 vUv;

  vec3 hash3(vec2 p) {
    vec3 q = vec3(
      dot(p, vec2(127.1, 311.7)),
      dot(p, vec2(269.5, 183.3)),
      dot(p, vec2(419.2, 371.9))
    );
    return fract(sin(q) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash3(i).x;
    float b = hash3(i + vec2(1.0, 0.0)).x;
    float c = hash3(i + vec2(0.0, 1.0)).x;
    float d = hash3(i + vec2(1.0, 1.0)).x;
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  vec3 placeholderBase(vec2 uv) {
    vec2 p = uv - 0.5;
    float radial = length(p * vec2(1.08, 0.96));
    float haze = exp(-radial * radial * 5.5);
    float grain = noise(uv * 5.0 + uTime * 0.03) * 0.65 +
      noise(uv * 24.0 - uTime * 0.05) * 0.35;
    vec3 base = mix(
      vec3(0.018, 0.024, 0.05),
      vec3(0.08, 0.06, 0.14),
      haze
    );
    return base + vec3(grain) * 0.08;
  }

  vec3 placeholderReveal(vec2 uv) {
    vec3 purple = vec3(0.4745, 0.2823, 1.0);
    vec3 pink = vec3(1.0, 0.6353, 1.0);
    vec2 p = uv - 0.5;
    float radial = length(p * vec2(0.92, 1.1));
    float t = uv.x * 0.55 + uv.y * 0.45;
    t += (noise(uv * 4.0 + uTime * 0.08) - 0.5) * 0.18;
    vec3 blend = mix(purple, pink, smoothstep(0.0, 1.0, t));
    return mix(blend * 0.72, blend, smoothstep(0.56, 0.08, radial));
  }

  void main() {
    vec2 scene = (vUv - 0.5) * uAspect;
    vec2 cursorDelta = (vUv - uMouseSmoothed) * uAspect;
    float cursorDist = length(cursorDelta);
    float sceneRadius = length(scene * vec2(0.92, 1.06));

    float orbit = noise(vUv * 8.0 + vec2(uTime * 0.06, -uTime * 0.04));
    float halo = 1.0 - smoothstep(0.0, 0.62, cursorDist);
    float revealRadius = mix(0.11, 0.34, uMouseActive);
    float reveal = 1.0 - smoothstep(0.0, revealRadius, cursorDist);
    reveal = pow(reveal, mix(6.0, 1.8, uMouseActive));

    vec2 field = scene;
    field.x += sin(scene.y * 10.0 + uTime * 0.7) * 0.018;
    field.y += cos(scene.x * 8.0 - uTime * 0.62) * 0.015;
    float volume = exp(-dot(field * vec2(1.45, 0.82), field * vec2(1.45, 0.82)) * 4.5);
    float shell = smoothstep(0.38, 0.2, sceneRadius) *
      (1.0 - smoothstep(0.2, 0.05, sceneRadius));
    float scan = exp(-pow((scene.x - sin(uTime * 0.38) * 0.16) * 6.5, 2.0)) *
      smoothstep(0.78, 0.12, sceneRadius);
    float tunnel = smoothstep(0.44, 0.08, abs(scene.x)) *
      smoothstep(0.92, -0.2, scene.y + 0.06);
    float pulse = (sin(uTime * 1.25 + sceneRadius * 30.0) * 0.5 + 0.5) *
      smoothstep(0.74, 0.08, sceneRadius);

    float shimmer =
      (sin(cursorDist * 42.0 - uTime * 6.0) * 0.5 + 0.5) *
      halo *
      uMouseActive;

    vec2 drift = vec2(
      noise(vUv * 11.0 + uTime * 0.18) - 0.5,
      noise(vUv.yx * 11.0 - uTime * 0.14) - 0.5
    );

    vec2 displacement =
      normalize(cursorDelta + 0.0001) * reveal * (0.008 + uMouseActive * 0.018) +
      drift * halo * (0.002 + uMouseActive * 0.008);

    vec2 baseUv = clamp(vUv - displacement, 0.0, 1.0);
    vec2 revealUv = clamp(vUv - displacement * 0.45, 0.0, 1.0);

    vec3 baseCol = uHasTextures
      ? texture2D(uTextureBase, baseUv).rgb
      : placeholderBase(baseUv);

    vec3 revealCol = uHasTextures
      ? texture2D(uTextureReveal, revealUv).rgb
      : placeholderReveal(revealUv);

    float revealMix = reveal * mix(0.14, 1.0, uMouseActive);
    float glow = halo * mix(0.08, 0.28, uMouseActive);

    vec3 color = mix(baseCol, revealCol, revealMix);
    color += volume * mix(vec3(0.02, 0.03, 0.08), vec3(0.18, 0.1, 0.34), 0.7);
    color += shell * vec3(0.24, 0.16, 0.46) * 0.42;
    color += tunnel * vec3(0.08, 0.07, 0.16) * 0.42;
    color += scan * vec3(0.35, 0.28, 0.7) * 0.16;
    color += pulse * vec3(0.26, 0.18, 0.52) * 0.08;
    color += glow * vec3(1.0, 0.6353, 1.0) * 0.18;
    color += shimmer * vec3(0.56, 0.8, 1.0) * 0.16;
    color += orbit * vec3(0.025, 0.02, 0.05);

    float vignette = smoothstep(0.95, 0.35, length(vUv - 0.5));
    color *= mix(0.88, 1.0, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`;
