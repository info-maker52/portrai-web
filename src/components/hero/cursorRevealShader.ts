/**
 * GLSL shader for the cursor-reveal hero portrait.
 *
 * The fragment shader takes:
 *   - two textures (uTextureBase, uTextureReveal)
 *   - mouse position in 0..1 UV coordinates (uMouse)
 *   - a smoothed mouse position for the lag/trail (uMouseSmoothed)
 *   - time (uTime)
 *   - viewport aspect (uAspect)
 *
 * It blends from base → reveal in a soft circular region around the cursor,
 * with subtle displacement for that "liquid" feel from the Lorenzo template
 * Reijo loved.
 *
 * If no real textures are provided, it falls back to procedural placeholders
 * (noise for base, brand gradient for reveal) so the effect ships even
 * before real photos arrive.
 */

export const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  precision highp float;

  uniform sampler2D uTextureBase;
  uniform sampler2D uTextureReveal;
  uniform bool uHasTextures;
  uniform vec2 uMouse;          // 0..1 UV
  uniform vec2 uMouseSmoothed;  // 0..1 UV, lagged
  uniform float uTime;
  uniform vec2 uAspect;         // (1, 1) when square; corrects circle in non-square

  varying vec2 vUv;

  // Hash + simplex-ish noise for placeholder textures.
  vec3 hash3(vec2 p) {
    vec3 q = vec3(dot(p, vec2(127.1, 311.7)),
                  dot(p, vec2(269.5, 183.3)),
                  dot(p, vec2(419.2, 371.9)));
    return fract(sin(q) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash3(i).x;
    float b = hash3(i + vec2(1, 0)).x;
    float c = hash3(i + vec2(0, 1)).x;
    float d = hash3(i + vec2(1, 1)).x;
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  vec3 placeholderBase(vec2 uv) {
    float n = noise(uv * 6.0) * 0.6 + noise(uv * 24.0) * 0.4;
    return vec3(n) * 0.45;  // dim greyscale so the reveal pops
  }

  vec3 placeholderReveal(vec2 uv) {
    // Brand gradient: purple -> pink, with subtle noise variation.
    vec3 purple = vec3(0.4745, 0.2823, 1.0);   // #7948FF
    vec3 pink   = vec3(1.0, 0.6353, 1.0);       // #FFA2FF
    float t = uv.x * 0.6 + uv.y * 0.4;
    t += (noise(uv * 4.0) - 0.5) * 0.3;
    return mix(purple, pink, smoothstep(0.0, 1.0, t));
  }

  void main() {
    vec2 uv = vUv;

    // Distance from current fragment to the mouse, aspect-corrected so the
    // reveal is a true circle no matter the canvas shape.
    vec2 d = (uv - uMouseSmoothed) * uAspect;
    float dist = length(d);

    // Soft mask radius — bigger = bigger reveal area.
    float radius = 0.25;
    float softness = 0.18;

    float mask = 1.0 - smoothstep(radius - softness, radius, dist);
    mask = pow(mask, 0.85);

    // Liquid displacement near the cursor — small UV warp inside the mask.
    vec2 toMouse = uv - uMouseSmoothed;
    float pull = mask * 0.04;
    vec2 displaced = uv - toMouse * pull;

    vec3 base = uHasTextures
      ? texture2D(uTextureBase, displaced).rgb
      : placeholderBase(displaced);

    vec3 reveal = uHasTextures
      ? texture2D(uTextureReveal, uv).rgb
      : placeholderReveal(uv);

    vec3 color = mix(base, reveal, mask);

    // Add a faint outline glow at the reveal edge to catch the eye.
    float edge = smoothstep(radius - softness * 0.3, radius - softness * 0.7,
                            dist) - smoothstep(radius - softness * 0.05,
                                                radius, dist);
    color += edge * vec3(1.0, 0.6353, 1.0) * 0.4;

    gl_FragColor = vec4(color, 1.0);
  }
`;
