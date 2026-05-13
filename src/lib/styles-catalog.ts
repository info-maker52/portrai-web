import type { LocalizedText } from "./site-content";

export type StyleCategory = "painted" | "illustrated" | "cinematic" | "experimental";

export type AiStyle = {
  id: string;
  name: LocalizedText;
  category: StyleCategory;
  vibe: LocalizedText;
  bestFor: LocalizedText;
  /** Sample image — falls back to a hero placeholder if missing. */
  sample: string;
};

/**
 * AI style catalog. Used on /stiilid and as schema.org Product list.
 *
 * Sample images currently reuse hero/portrait assets — Reijo to drop in
 * representative outputs per style under /public/images/styles/.
 */
export const AI_STYLES: AiStyle[] = [
  {
    id: "acrylic",
    name: { en: "Acrylic", et: "Akrüül" },
    category: "painted",
    vibe: {
      en: "Bold brushwork, saturated colour, gallery-wall energy.",
      et: "Tugevad pintslitõmbed, küllastunud värvid, galerii-vibe.",
    },
    bestFor: {
      en: "Brand activations and events that want a fine-art feel.",
      et: "Brändi-aktivatsioonid ja üritused, mis soovivad kunstigaleriilikku tunnet.",
    },
    sample: "/images/site/portrait-base.png",
  },
  {
    id: "watercolour",
    name: { en: "Watercolour", et: "Akvarell" },
    category: "painted",
    vibe: {
      en: "Soft washes, light bleeds, romantic and airy.",
      et: "Pehmed üleminekud, õrnad värvilekked, romantiline ja õhuline.",
    },
    bestFor: {
      en: "Weddings, lifestyle brands, garden parties.",
      et: "Pulmad, lifestyle-brändid, aiapeod.",
    },
    sample: "/images/site/portrait-detail.png",
  },
  {
    id: "pencil",
    name: { en: "Pencil sketch", et: "Pliiatsijoonis" },
    category: "illustrated",
    vibe: {
      en: "Crisp graphite lines, editorial restraint.",
      et: "Selgepiirilised pliiatsijooned, ajakirjaliku peenusega.",
    },
    bestFor: {
      en: "Conferences, intimate B2B dinners, editorial campaigns.",
      et: "Konverentsid, intiimsed B2B õhtud, ajakirjanduslikud kampaaniad.",
    },
    sample: "/images/site/portrait-base.png",
  },
  {
    id: "cartoon",
    name: { en: "Cartoon", et: "Koomiks" },
    category: "illustrated",
    vibe: {
      en: "Punchy outlines, expressive features, Saturday-morning energy.",
      et: "Mängulised piirjooned, ilmekad jooned, laupäevahommiku-energia.",
    },
    bestFor: {
      en: "Family-friendly events, school galas, gaming launches.",
      et: "Pere-üritused, koolide galad, gaming-üritused.",
    },
    sample: "/images/site/event-action.jpg",
  },
  {
    id: "street-art",
    name: { en: "Street art", et: "Tänavakunst" },
    category: "experimental",
    vibe: {
      en: "Spray-paint texture, neon contrast, graffitied edges.",
      et: "Pihustatud tekstuur, neoonkontrastid, grafitiäärega.",
    },
    bestFor: {
      en: "Streetwear drops, music events, urban brand stories.",
      et: "Streetwear lansseerimised, muusikaüritused, linnabrändide lood.",
    },
    sample: "/images/site/interactive-booth.png",
  },
  {
    id: "renaissance",
    name: { en: "Renaissance", et: "Renessanss" },
    category: "painted",
    vibe: {
      en: "Oil-painting drama, classical lighting, regal poses.",
      et: "Õlimaali draama, klassikaline valgus, kuninglikud poosid.",
    },
    bestFor: {
      en: "Black-tie galas, anniversary events, museum partners.",
      et: "Black-tie galad, juubeliüritused, muuseumi-partnerid.",
    },
    sample: "/images/work/von-fock-cover.jpg",
  },
  {
    id: "cinematic",
    name: { en: "Cinematic", et: "Kinematograafiline" },
    category: "cinematic",
    vibe: {
      en: "Film-grain, anamorphic flare, story-frame composition.",
      et: "Filmiterava, anamorfne sähvatus, lugu-kaadri kompositsioon.",
    },
    bestFor: {
      en: "Film premieres, product launches, immersive brand events.",
      et: "Filmide esilinastused, toote-launchid, immersiivsed brändiüritused.",
    },
    sample: "/images/work/melt-cover.png",
  },
  {
    id: "neon",
    name: { en: "Neon", et: "Neoon" },
    category: "experimental",
    vibe: {
      en: "Glow, gradient haze, after-dark club energy.",
      et: "Hõõgus, gradient-udu, ööklubi-energia.",
    },
    bestFor: {
      en: "Late-night parties, music festivals, gaming activations.",
      et: "Hilisõhtused peod, muusikafestivalid, gaming-aktivatsioonid.",
    },
    sample: "/images/site/event-action.jpg",
  },
  {
    id: "vintage",
    name: { en: "Vintage", et: "Vintage" },
    category: "cinematic",
    vibe: {
      en: "Sepia warmth, soft vignette, archival photo album feel.",
      et: "Seepia soojus, pehme vinjett, vana fotoalbumi tunne.",
    },
    bestFor: {
      en: "Weddings, anniversary nights, heritage brands.",
      et: "Pulmad, juubelid, traditsioonilised brändid.",
    },
    sample: "/images/site/portrait-detail.png",
  },
  {
    id: "sci-fi",
    name: { en: "Sci-fi", et: "Sci-fi" },
    category: "experimental",
    vibe: {
      en: "Holographic accents, future-frame composition.",
      et: "Holograafilised aktsendid, tuleviku-kaadrid.",
    },
    bestFor: {
      en: "Tech launches, conferences, Web3 / AI events.",
      et: "Tehnoloogialaunchid, konverentsid, Web3 / AI üritused.",
    },
    sample: "/images/site/interactive-booth.png",
  },
  {
    id: "editorial",
    name: { en: "Editorial", et: "Ajakirjalik" },
    category: "cinematic",
    vibe: {
      en: "Magazine-cover composition, restrained colour, premium feel.",
      et: "Ajakirja-kaane kompositsioon, kontrollitud värvid, premium-tunne.",
    },
    bestFor: {
      en: "Fashion brands, B2B media, premium product launches.",
      et: "Moebrändid, B2B meedia, premium toote-launchid.",
    },
    sample: "/images/work/melt-cover.png",
  },
  {
    id: "pop-art",
    name: { en: "Pop art", et: "Popkunst" },
    category: "experimental",
    vibe: {
      en: "Halftone dots, bold blocks of colour, Warhol-grid energy.",
      et: "Halftoon-mustrid, jõulised värviplokid, Warhol-vibe.",
    },
    bestFor: {
      en: "Family events, museum partnerships, retail launches.",
      et: "Pere-üritused, muuseumikoostööd, jaekaubanduslaunchid.",
    },
    sample: "/images/work/von-fock-cover.jpg",
  },
];

export const STYLE_CATEGORY_LABELS: Record<StyleCategory, LocalizedText> = {
  painted: { en: "Painted", et: "Maalitud" },
  illustrated: { en: "Illustrated", et: "Illustreeritud" },
  cinematic: { en: "Cinematic", et: "Kinematograafiline" },
  experimental: { en: "Experimental", et: "Eksperimentaalne" },
};
