# PortrAI — Asset shot-list & ComfyUI spec (Phase 1 imagery)

This is the asset deliverable that unblocks the visual rebuild. Generate
these in ComfyUI, drop the files at the exact paths below, and the site
swaps the stopgap images for the real ones with no further code changes
(except wiring noted in §A).

**Two non-negotiable rules for the hero/style sets:**
1. **Text-free.** No baked-in labels, no "GREEN-SCREEN", no logos, no
   "AGES 3+". The UI adds any labels itself.
2. **Same subject, registered crop.** For the transformation set, ONE
   generated guest face, identical pose and framing across all outputs, so
   a before/after slider and a cross-fade line up pixel-to-pixel. This is
   what makes the "watch the guest transform" moment land. It is also the
   one thing the current site fakes (it cross-fades five *different* people
   and calls them "one guest").

General render settings (all stills): SDXL or Flux, 1024×1280 (4:5
portrait), CFG ~5–7, a real-looking person (not uncanny), plain dark studio
background (#02091E-ish) unless a style calls for its own scene. Negative
prompt for all: `text, watermark, logo, caption, label, distorted hands,
extra fingers, deformed face, oversaturated, lowres, jpeg artifacts`.

---

## A. THE HERO DELIVERABLE — same-subject 12-style set (priority #1)

### Step 1 — generate the base portrait (do this once, lock the seed)
One neutral source portrait that everything else transforms from.

- Prompt: `studio portrait of a friendly person, shoulders up, facing
  camera, neutral expression, even soft ring-light, plain dark studio
  background, photorealistic, 50mm, sharp focus`
- Pick a result you like. **Record its seed and the latent/image** — you
  reuse this exact image as the img2img source for every style so the face
  and pose stay constant.
- Save as: `public/images/hero/source.png`

### Step 2 — img2img each of the 12 styles from that base
For every style: **img2img from `source.png`**, denoise **0.45–0.60**
(lower = stays closer to the source face/pose; tune so the person is
clearly the same but the style is strong), same 1024×1280 size, same crop.
Append the style fragment to a base prompt of
`portrait of the same person, same pose and framing,` + fragment.

| File (`public/images/styles/…`) | style id | prompt fragment |
|---|---|---|
| `acrylic.png` | acrylic | `bold acrylic painting, thick visible brushstrokes, saturated colour, gallery fine-art` |
| `watercolour.png` | watercolour | `soft watercolour painting, light washes, gentle colour bleeds, romantic and airy, paper texture` |
| `pencil.png` | pencil | `crisp graphite pencil sketch, fine cross-hatching, editorial line drawing, white paper` |
| `cartoon.png` | cartoon | `clean cartoon illustration, bold outlines, flat expressive shading, animated-film look` |
| `street-art.png` | street-art | `spray-paint street-art mural, neon stencil contrast, graffiti texture, urban wall` |
| `renaissance.png` | renaissance | `renaissance oil painting, classical chiaroscuro lighting, regal pose, museum varnish` |
| `cinematic.png` | cinematic | `cinematic film still, anamorphic lens flare, film grain, moody key light, story-frame` |
| `neon.png` | neon | `neon cyberpunk portrait, glowing violet and magenta rim light, gradient haze, dark club` |
| `vintage.png` | vintage | `vintage sepia photograph, soft vignette, faded film, archival album feel` |
| `sci-fi.png` | sci-fi | `sci-fi portrait, holographic accents, chrome and light, futuristic frame` |
| `editorial.png` | editorial | `high-fashion editorial magazine cover portrait, restrained palette, premium studio light` |
| `pop-art.png` | pop-art | `Warhol pop-art, halftone dots, bold flat colour blocks, four-tone screenprint` |

### Step 3 — wire-up (small code change once files exist)
- In `src/lib/styles-catalog.ts`, set each style's `sample` to
  `/images/styles/<id>.png` (replaces the current näidis/cover stand-ins).
  Mechanical 12-line edit.
- These feed `/stiilid`, the ThemeGallery on `/peod`, and the schema.org
  Product list — so the SEO style list finally shows the real product.

### Step 4 — the home WebGL hero pair (CursorRevealHero)
The cursor-reveal shader needs a **base** and a **reveal** that are the
same crop so the reveal registers under the cursor.
- `public/images/hero/portrait-base.png` ← copy of `source.png` (the clean
  un-stylised guest). Overwrite the current text-infographic file.
- `public/images/hero/portrait-reveal.png` ← the single most striking style
  for the reveal (recommend `neon.png` or `renaissance.png`), **same crop**.
  Overwrite the current mismatched file.
- No code change needed — `src/app/[locale]/page.tsx:377-378` already points
  at these two paths. Replacing the files fixes the flagship hero.

---

## B. TRANSFORMATION VIDEO (10s, for the studio/hero moment)
Shows the metamorphosis as motion — the thing competitors lead with.
- Source: the same `source.png` guest.
- 10 seconds, smooth cross-fade/morph through 5–6 of the styles above
  (e.g. base → watercolour → neon → renaissance → cinematic → pop-art).
- Two crops if possible: **16:9 1920×1080** (desktop) and **9:16
  1080×1920** (mobile). Brand-dark background, **text-free**.
- Tooling: ComfyUI AnimateDiff, or simplest path — render the 12 stills and
  cross-fade them in any video editor (1.5s per style, 0.3s dissolves).
- Save as: `public/videos/transform.webm` (+ `.mp4` fallback).
- Wire-up: drop into `StudioHeroCycle` (swap the still cross-fade for the
  video) — I'll do that code change when the file lands.

---

## C. BEFORE→AFTER SLIDER PAIRS (for the /peod signature moment)
Same-subject, **same pose**, so the draggable slider registers. Two pairs:

| File (`public/images/pairs/…`) | what |
|---|---|
| `party-before.png` | the `source.png` guest, OR a flash-lit party-style version of them |
| `party-after.png` | img2img of the same → `neon.png` style, same crop |
| `wedding-before.png` | same guest in warmer wardrobe, plain warm bg |
| `wedding-after.png` | img2img → `watercolour.png` style, same crop |

(If time is tight, ship one pair — `party-before/after` — the component
takes any two registered images.)

---

## D. SCENE / VENUE SHOTS (booth-in-context, photoreal)
These replace the remaining `ImagePlaceholder` slots on /boksid, /peod,
/messilahendused, /photobooth-tallinn, /fotopeegel, /firmapidu-fotoboks.
Shared style: photoreal event photography, 35mm, shallow depth of field,
faces softly out of focus; the booth = a sleek dark matte kiosk ~1.9m with
a portrait touchscreen and a circular LED ring light. Corporate = dark
venue + purple (#7948FF) uplighting; wedding = warm tungsten. Same negative
prompt as above.

| File (`public/images/…`) | aspect | prompt |
|---|---|---|
| `booths/neon-booth-product.png` | 3:4 | sleek matte-black photo-booth kiosk, tall frame, vertical touchscreen showing a glowing purple AI portrait UI, circular LED ring light, violet edge uplighting, three-quarter angle, isolated on dark navy studio backdrop, dramatic rim light, 8k product shot |
| `booths/icon2-booth-product.png` | 3:4 | handcrafted light-oak wooden photo booth, rounded cabinet, beige linen front panel, ring light, small screen, warm tungsten, three-quarter angle, dark charcoal backdrop, Scandinavian design, photoreal |
| `booths/neon-booth-context.jpg` | 16:9 | dark photo-booth kiosk with purple LED uplighting in a dark industrial event venue, blurred guests bokeh, deep navy and violet, cinematic, 35mm |
| `booths/icon2-booth-context.jpg` | 16:9 | light wooden photo booth with warm ring light in an elegant reception hall, golden ambient light, blurred wedding guests, romantic, 35mm |
| `booths/fotopeegel-gala.jpg` | 4:5 | elegant full-length illuminated mirror photo booth at a black-tie gala, a guest in evening dress posing toward it seen from behind, chandeliers, warm light with subtle purple accent, luxury event photography, shallow DOF |
| `events/firmapidu-crowd.jpg` | 5:4 | energetic corporate party, colleagues laughing around a dark photo-booth kiosk with glowing screen, strong purple uplighting, confetti, candid 35mm, faces soft |
| `events/pulm-icon2-warm.jpg` | 5:4 | warm barn wedding reception with string lights, light wooden photo booth in the corner, couple laughing near it seen from behind, golden hour, romantic 35mm |
| `events/messi-stand.jpg` | 4:5 | trade-show stand with a dark photo-booth kiosk in a branded backdrop wall, queue of business visitors with lanyards, bright exhibition hall, purple brand lighting, wide B2B event shot |
| `venues/tallinn-industrial.jpg` | 4:5 | dark photo-booth kiosk with purple uplighting in a renovated industrial venue, exposed brick and steel beams (Kultuurikatel-like), guests mingling bokeh, moody cinematic, purple/navy |
| `events/firmapidu-hero.jpg` | 16:9 | wide cinematic corporate winter party, purple uplighting columns, dark photo-booth kiosk with bright ring light as the social hub, dancing crowd blurred in foreground, 35mm |

When these land I'll swap the `ImagePlaceholder` call-sites to `next/image`
with keyword-bearing alt text, and run the PNGs through AVIF compression.

---

## NOT to generate
- **Aivar Kuusk headshot.** He's a real person giving a real testimonial —
  do not AI-fake his face. Keep the initials avatar until a real photo
  exists.

## After you drop files in
Ping me ("assets are in") and I'll: wire styles-catalog + StudioHeroCycle +
the slider + the ImagePlaceholder swaps, compress everything to AVIF/WebP,
set `priority` on the LCP images, and rebuild. That's Phase 1.
