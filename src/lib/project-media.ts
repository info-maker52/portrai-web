import type { LocalizedText } from "@/lib/site-content";

export type ProjectCoverMedia = {
  alt: LocalizedText;
  mode?: "cover" | "contain";
  objectPosition?: string;
  src: string;
};

export type ProjectGalleryMediaItem = {
  alt: LocalizedText;
  objectPosition?: string;
  src: string;
};

export type ProjectGalleryMedia = {
  description: LocalizedText;
  items: ProjectGalleryMediaItem[];
};

const PROJECT_COVER_MEDIA: Record<string, ProjectCoverMedia> = {
  "laulupidu-postimees": {
    alt: {
      en: "Portrait from the Song Festival hybrid activation",
      et: "Portree Laulupeo hubriidaktivatsioonilt",
    },
    objectPosition: "50% 32%",
    src: "/images/work/laulupidu-postimees-cover.jpg",
  },
  melt: {
    alt: {
      en: "MELT innovation forum AI portrait artwork",
      et: "MELT innovatsioonifoorumi AI-portree visuaal",
    },
    objectPosition: "50% 42%",
    src: "/images/work/melt-cover.png",
  },
  "oixio-ebs-ai-oppenoustaja": {
    alt: {
      en: "OIXIO x EBS activation portrait",
      et: "OIXIO x EBS aktivatsiooni portree",
    },
    objectPosition: "48% 28%",
    src: "/images/work/oixio-ebs-cover.jpg",
  },
  "swedbank-unistused": {
    alt: {
      en: "Swedbank group portrait in a white and orange future-work scene",
      et: "Swedbanki grupiportree valge-oranžis tulevikustseenis",
    },
    objectPosition: "50% 22%",
    src: "/images/work/swedbank-unistused-cover.jpg",
  },
  "telia-rohekusimustik": {
    alt: {
      en: "Telia sustainability activation visual system",
      et: "Telia kestlikkuse aktivatsiooni visuaalsusteem",
    },
    mode: "contain",
    src: "/images/work/telia-rohekusimustik-cover.jpg",
  },
  "von-fock": {
    alt: {
      en: "Von Fock launch portrait in a bold pink palette",
      et: "Von Focki lansseerimise portree erksa roosa tonaalsusega",
    },
    objectPosition: "50% 36%",
    src: "/images/work/von-fock-cover.jpg",
  },
};

const FALLBACK_COVER_MEDIA: ProjectCoverMedia = {
  alt: {
    en: "PortrAI campaign artwork",
    et: "PortrAI kampaaniavisuaal",
  },
  src: "/images/hero/portrait-reveal.png",
};

const PROJECT_GALLERY_MEDIA: Record<string, ProjectGalleryMedia> = {
  "swedbank-unistused": {
    description: {
      en: "These sourced Swedbank outcomes make the prompt-led concept tangible: branded group portraits, close-up interactions, and premium future-work scenes from the original archive.",
      et: "Need Swedbanki arhiivist toodud visuaalid teevad promptipohise kontseptsiooni kaegakatsutavaks: branditud grupiportreed, lahiinteraktsioonid ja premium-taseme tulevikustseenid.",
    },
    items: [
      {
        alt: {
          en: "Swedbank team gathered around a dream-visualisation table",
          et: "Swedbanki tiim unistuste visualiseerimise laua umber",
        },
        src: "/images/work/swedbank-unistused/gallery-01.jpg",
      },
      {
        alt: {
          en: "Swedbank group portrait in branded white and orange suits",
          et: "Swedbanki grupiportree branditud valge-oranžides kostuumides",
        },
        objectPosition: "50% 22%",
        src: "/images/work/swedbank-unistused/gallery-02.jpg",
      },
      {
        alt: {
          en: "Swedbank guest shaping a data-rich future interface",
          et: "Swedbanki kulaline andmerohke tulevikuliidesega suhtlemas",
        },
        src: "/images/work/swedbank-unistused/gallery-03.jpg",
      },
      {
        alt: {
          en: "Swedbank portrait framed by branded robots in a flagship-like lobby",
          et: "Swedbanki portree branditud robotite vahel esindusliku lobby taustal",
        },
        src: "/images/work/swedbank-unistused/gallery-04.jpg",
      },
    ],
  },
  "telia-rohekusimustik": {
    description: {
      en: "These sourced Telia visuals show the range behind the questionnaire-led concept: live-action portraits, branded team shots, and more speculative future branches from the original archive.",
      et: "Need Telia arhiivist toodud visuaalid naitavad kusimustikupohise kontseptsiooni ulatust: live-action portreed, branditud grupikaadrid ja spekulatiivsemad tulevikuharud.",
    },
    items: [
      {
        alt: {
          en: "Telia team portrait opening into a branded glitch portal",
          et: "Telia tiimiportree branditud glitch-portaali serval",
        },
        src: "/images/work/telia-rohekusimustik/gallery-01.jpg",
      },
      {
        alt: {
          en: "Telia trio in a crystal-armour storm scene",
          et: "Telia trio kristallrüüga tormistseenis",
        },
        src: "/images/work/telia-rohekusimustik/gallery-02.jpg",
      },
      {
        alt: {
          en: "Telia guest standing with a service robot in a control room",
          et: "Telia kulaline teenindusrobotiga juhtimiskeskuses",
        },
        src: "/images/work/telia-rohekusimustik/gallery-03.jpg",
      },
      {
        alt: {
          en: "Telia group portrait on a neon bridge in a future world",
          et: "Telia grupiportree neoonsillal tulevikumaailmas",
        },
        src: "/images/work/telia-rohekusimustik/gallery-04.jpg",
      },
    ],
  },
};

export function getProjectCoverMedia(slug: string): ProjectCoverMedia {
  return PROJECT_COVER_MEDIA[slug] ?? FALLBACK_COVER_MEDIA;
}

export function getProjectGalleryMedia(slug: string): ProjectGalleryMedia | null {
  return PROJECT_GALLERY_MEDIA[slug] ?? null;
}
