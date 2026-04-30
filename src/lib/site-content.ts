export type SiteLocale = "et" | "en";

export type LocalizedText = Record<SiteLocale, string>;

export type ProjectCategory =
  | "wedding"
  | "corporate"
  | "fair"
  | "festival";

export type ProjectMetric = {
  value: string;
  label: LocalizedText;
};

export type ProjectQuote = {
  quote: LocalizedText;
  name: string;
  role: LocalizedText;
  company?: string;
  status: LocalizedText;
};

export type PlaceholderProject = {
  slug: string;
  client: string;
  event: LocalizedText;
  year: string;
  category: ProjectCategory;
  city: string;
  countryCode: string;
  service: LocalizedText;
  summary: LocalizedText;
  brief: LocalizedText;
  challenge: LocalizedText;
  solution: LocalizedText;
  deliverables: LocalizedText[];
  outcomes: LocalizedText[];
  metrics: ProjectMetric[];
  awards?: LocalizedText[];
  quote?: ProjectQuote;
  galleryLabel: LocalizedText;
};

export type ProcessStep = {
  id: string;
  title: LocalizedText;
  body: LocalizedText;
};

export type TestimonialSeed = ProjectQuote & {
  id: string;
};

export type FaqSeed = {
  question: LocalizedText;
  answer: LocalizedText;
};

export type InternationalStop = {
  code: string;
  city: string;
  note: LocalizedText;
};

export type PlanningPrompt = {
  label: LocalizedText;
  body: LocalizedText;
};

export function text(locale: SiteLocale, value: LocalizedText) {
  return value[locale];
}

export const partnerNames = [
  "ERR",
  "Postimees",
  "Tallinna Strateegiakeskus",
  "MELT",
  "Telia",
  "Swedbank",
  "OIXIO",
  "EBS",
  "Technopol",
  "Latitude59",
];

export const processSteps: ProcessStep[] = [
  {
    id: "brief",
    title: {
      en: "Brief and event goal",
      et: "Brief ja ürituse eesmärk",
    },
    body: {
      en: "We define the audience, brand tone, throughput expectations, and what guests should want to share afterwards.",
      et: "Paneme paika sihtgrupi, brändi tonaalsuse, oodatava läbilaske ning selle, mida külalised peaksid hiljem jagada tahtma.",
    },
  },
  {
    id: "concept",
    title: {
      en: "Visual concept and prompt logic",
      et: "Visuaalne kontseptsioon ja prompt-loogika",
    },
    body: {
      en: "Frames, themes, branded overlays, custom questionnaires, and draft prompt directions all get shaped before production assets arrive.",
      et: "Raamid, teemad, brändikihid, küsimustikud ja promptide suund pannakse paika enne lõplike tootmisfailide saabumist.",
    },
  },
  {
    id: "activation",
    title: {
      en: "Live activation",
      et: "Live-aktivatsioon",
    },
    body: {
      en: "The booth can run on-site, online, or as a hybrid setup with instant generation, QR delivery, printouts, and lead capture.",
      et: "Lahendus võib töötada kohapeal, veebis või hübriidina koos kohese genereerimise, QR-jagamise, printide ja kontaktikorjega.",
    },
  },
  {
    id: "followup",
    title: {
      en: "Aftercare and campaign use",
      et: "Järeltegevused ja kampaaniakasutus",
    },
    body: {
      en: "Exports, follow-up emails, gallery curation, and case-study framing can all be prepared even before the final copy is approved.",
      et: "Ekspordid, järelkirjad, galerii kureerimine ja case-study raamistik saab valmis teha juba enne lõpliku copy kinnitamist.",
    },
  },
];

export const internationalStops: InternationalStop[] = [
  {
    code: "EE",
    city: "Tallinn",
    note: {
      en: "Core production base",
      et: "Põhiline tootmisbaas",
    },
  },
  {
    code: "FI",
    city: "Helsinki",
    note: {
      en: "Event delivery and operator support",
      et: "Üritused ja partneritugi",
    },
  },
  {
    code: "DE",
    city: "Berlin",
    note: {
      en: "Consulting and concept export",
      et: "Konsultatsioon ja kontseptsiooni eksport",
    },
  },
  {
    code: "LV",
    city: "Riga",
    note: {
      en: "Baltic event support",
      et: "Balti üritustugi",
    },
  },
  {
    code: "PL",
    city: "Warsaw",
    note: {
      en: "Partner-facing concept work",
      et: "Partnerisuunaline kontseptsioonitöö",
    },
  },
  {
    code: "BE",
    city: "Brussels",
    note: {
      en: "International conference format",
      et: "Rahvusvahelise konverentsi formaat",
    },
  },
  {
    code: "US",
    city: "Las Vegas",
    note: {
      en: "Awards and industry visibility",
      et: "Auhinnad ja tööstuse nähtavus",
    },
  },
];

export const testimonialSeeds: TestimonialSeed[] = [
  {
    id: "eve-karner",
    name: "Eve Kärner",
    company: "Tallinna Strateegiakeskus",
    role: {
      en: "Demo area coordinator, MELT innovation forum",
      et: "MELT innovatsioonifoorumi demoala koordinaator",
    },
    quote: {
      en: "PortrAI became a real magnet on the MELT demo floor, pulling visitors in from morning to evening. The team was warm, thoughtful, and clearly prepared for the theme, audience, and setting.",
      et: "PortrAI fotoboks oli tõeline tähelepanu magnet MELT innovatsioonifoorumi demoalal, meelitades külastajaid ligi hommikust õhtuni. Koostöö PortrAI meeskonnaga oli soe, siiras ja läbimõeldult ette valmistatud.",
    },
    status: {
      en: "Source-backed quote, publish confirmation pending",
      et: "Allikapõhine tsitaat, avaldamise kinnitus ootel",
    },
  },
  {
    id: "kristiina-herkul",
    name: "Kristiina Herkül",
    company: "Technopol",
    role: {
      en: "Event project manager",
      et: "Ürituste projektijuht",
    },
    quote: {
      en: "The whole system and idea were a huge hit. People are still talking about it and sharing it on social media.",
      et: "Kogu see süsteem ja idee oli mega suur hitt. Inimesed siiani räägivad ja jagavad seda sotsiaalmeedias.",
    },
    status: {
      en: "Deck quote, permission still to be confirmed",
      et: "Esitlusest võetud tsitaat, luba veel kinnitamata",
    },
  },
  {
    id: "reelika-ollissaar",
    name: "Reelika Ollissaar",
    company: "EBS",
    role: {
      en: "Head of marketing and sales",
      et: "Turundus- ja müügijuht",
    },
    quote: {
      en: "Our booth stood out immediately and the activation genuinely resonated with people.",
      et: "Meie boks oli väga silmatorkav ning see lahendus läks inimestele väga korda.",
    },
    status: {
      en: "Deck quote, permission still to be confirmed",
      et: "Esitlusest võetud tsitaat, luba veel kinnitamata",
    },
  },
  {
    id: "liis-marii-poder",
    name: "Liis-Marii Põder",
    role: {
      en: "Junior specialist, creative solutions",
      et: "Juniorspetsialist, loovlahenduste allosakond",
    },
    quote: {
      en: "Our area may have been the most visited zone at Startup Day.",
      et: "Meie ala oli vist kogu Startup Day kõige külastatum ala.",
    },
    status: {
      en: "Short deck quote, needs full context",
      et: "Lühike tsitaat esitlusest, vajab täiendavat konteksti",
    },
  },
];

export const faqSeeds: FaqSeed[] = [
  {
    question: {
      en: "How does the AI photo booth work during a live event?",
      et: "Kuidas AI fotoboks live-üritusel töötab?",
    },
    answer: {
      en: "This draft answer block is here to define rhythm and layout. Final copy can explain the guest flow from capture to generation, print, and share in plain language.",
      et: "See vastuseplokk on praegu rütmi ja paigutuse jaoks. Lõplik copy saab siin lihtsalt lahti seletada külalise teekonna pildist genereerimise, printimise ja jagamiseni.",
    },
  },
  {
    question: {
      en: "Can the experience match our brand, campaign, or venue?",
      et: "Kas kogemus saab sobituda meie brändi, kampaania või sündmuskohaga?",
    },
    answer: {
      en: "Yes. The structure already assumes branded frames, overlays, questionnaires, themed prompts, and campaign-specific outputs.",
      et: "Jah. Struktuur eeldab juba bränditud raame, kihte, küsimustikke, teemastatud prompte ja kampaaniapõhiseid väljundeid.",
    },
  },
  {
    question: {
      en: "Can guests receive their images digitally as well as on paper?",
      et: "Kas külalised saavad pildid nii digitaalselt kui ka paberil?",
    },
    answer: {
      en: "This placeholder answer reserves space for QR delivery, email follow-up, gallery links, and optional on-site printouts.",
      et: "See placeholder-vastus jätab ruumi QR-jagamisele, järelmeilidele, galeriilinkidele ja soovi korral kohapealsele printimisele.",
    },
  },
  {
    question: {
      en: "How much space, time, and staffing does the setup need?",
      et: "Kui palju ruumi, aega ja meeskonda setup vajab?",
    },
    answer: {
      en: "Use this block later for setup times, footprint requirements, power, internet, staffing expectations, and guest-throughput ranges.",
      et: "Selles plokis saab hiljem kirjeldada setup'i ajakulu, vajalikku pinda, elektrit, internetti, meeskonna vajadust ja külaliste läbilaske vahemikke.",
    },
  },
  {
    question: {
      en: "Can you create a custom questionnaire or activation flow?",
      et: "Kas saate teha kohandatud küsimustiku või aktivatsiooni loogika?",
    },
    answer: {
      en: "Absolutely. The current structure already makes room for quiz-led concepts, character matching, study-advisor flows, and lead-generation mechanics.",
      et: "Jah. Praegune struktuur teeb ruumi küsimustikupõhistele kontseptsioonidele, karakteri sobitamisele, õppenõustaja loogikale ja lead-generation mehaanikatele.",
    },
  },
  {
    question: {
      en: "What happens after the event?",
      et: "Mis juhtub pärast üritust?",
    },
    answer: {
      en: "This answer area can later cover asset export, reporting, highlight galleries, retargeting use, and case-study packaging.",
      et: "See vastuseala saab hiljem katta failide üleandmise, raporti, highlight-galeriid, retargeting'u kasutuse ja case-study pakendamise.",
    },
  },
];

export const planningPrompts: PlanningPrompt[] = [
  {
    label: {
      en: "Event basics",
      et: "Ürituse põhiinfo",
    },
    body: {
      en: "Date, city, venue type, and expected guest count are enough to start shaping the right setup.",
      et: "Kuupäev, linn, venue tüüp ja eeldatav külaliste arv annavad juba piisavalt infot õige setup'i paika panemiseks.",
    },
  },
  {
    label: {
      en: "Activation goal",
      et: "Aktivatsiooni eesmärk",
    },
    body: {
      en: "Lead capture, social sharing, premium hospitality, or branded wow-factor all lead to slightly different flows.",
      et: "Lead capture, sotsiaalmeedia jagamine, premium-külaliskogemus või puhas wow-efekt viivad kõik veidi erineva lahenduseni.",
    },
  },
  {
    label: {
      en: "Visual direction",
      et: "Visuaalne suund",
    },
    body: {
      en: "Even rough cues like elegant, playful, futuristic, editorial, or campaign-specific are enough at this stage.",
      et: "Isegi umbkaudsed märksõnad nagu elegantne, mänguline, futuristlik, editorial või kampaaniapõhine on selles etapis piisavad.",
    },
  },
  {
    label: {
      en: "Output expectations",
      et: "Väljundi ootused",
    },
    body: {
      en: "Tell us whether you need prints, QR delivery, email follow-up, a web widget, or a full hybrid experience.",
      et: "Kirjelda, kas vajad printe, QR-jagamist, järelmeile, veebiwidget'it või täis hübriidkogemust.",
    },
  },
];

export const projects: PlaceholderProject[] = [
  {
    slug: "von-fock",
    client: "ERR",
    event: {
      en: "Von Fock season 2 launch",
      et: "Von Focki 2. hooaja lansseerimine",
    },
    year: "2025",
    category: "corporate",
    city: "Tallinn",
    countryCode: "EE",
    service: {
      en: "Interactive web activation",
      et: "Interaktiivne veebiaktivatsioon",
    },
    summary: {
      en: "A source-backed flagship case study about turning passive viewers into active participants through character-based AI portraits.",
      et: "Allikapõhine lipulaev-case, kus passiivsed vaatajad muudeti karakteripõhiste AI-portreede abil aktiivseteks osalejateks.",
    },
    brief: {
      en: "Promote the new TV series, create social buzz, and drive viewership by letting people see themselves inside the Von Fock world.",
      et: "Tutvustada uut telesarja, tekitada sotsiaalset kõlapinda ja kasvatada vaatajanumbreid, lastes inimestel end Von Focki maailmas näha.",
    },
    challenge: {
      en: "Traditional campaign assets would not create the same personal connection as a self-insert, instantly shareable portrait mechanic.",
      et: "Tavalised kampaaniamaterjalid ei oleks loonud sama isiklikku sidet kui end loosse asetav ja kohe jagatav portreemehaanika.",
    },
    solution: {
      en: "PortrAI embedded a one-week virtual booth into the client's article and website. Guests uploaded a selfie, chose one of four character directions, and generated a branded output worth sharing.",
      et: "PortrAI paigaldas nädalaks virtuaalse fotoboksi kliendi artiklisse ja veebilehele. Külaline laadis üles selfie, valis neljast karakterisuunast ühe ja genereeris jagamist vääriva väljundi.",
    },
    deliverables: [
      {
        en: "Custom character logic with four visual routes",
        et: "Kohandatud karakteriloogika nelja visuaalse suunaga",
      },
      {
        en: "Embedded web widget on the client's own platform",
        et: "Kliendi enda platvormile paigaldatud veebiwidget",
      },
      {
        en: "One-click share flow for fast viral spread",
        et: "Ühe klõpsu jagamisflow kiire viirusliku leviku jaoks",
      },
    ],
    outcomes: [
      {
        en: "The product itself became the campaign.",
        et: "Toode ise muutus kampaaniaks.",
      },
      {
        en: "Users became part of the story instead of only seeing the trailer.",
        et: "Kasutajad said loo osaks, mitte ei näinud ainult treilerit.",
      },
      {
        en: "The interaction format created organic social reach instead of forced ad repetition.",
        et: "Interaktsioonivorm lõi orgaanilist sotsiaalset levikut, mitte lihtsalt korduvat reklaaminäitamist.",
      },
    ],
    metrics: [
      {
        value: "681K",
        label: { en: "Images generated", et: "Genereeritud pilti" },
      },
      {
        value: "215K",
        label: { en: "Page views", et: "Lehevaatamist" },
      },
      {
        value: "86%",
        label: { en: "New visitors", et: "Uusi külastajaid" },
      },
    ],
    awards: [
      {
        en: "Best Internet 2025, Digital Marketing Conference",
        et: "Best Internet 2025, digiturunduse konverents",
      },
    ],
    quote: {
      name: "Placeholder quote slot",
      role: {
        en: "Campaign stakeholder",
        et: "Kampaania osapool",
      },
      quote: {
        en: "Reserved for a final campaign-owner quote once permissions are confirmed.",
        et: "Reserveeritud lõplikule kampaaniaomaniku tsitaadile pärast lubade kinnitamist.",
      },
      status: {
        en: "Quote still to be sourced",
        et: "Tsitaat veel kogumisel",
      },
    },
    galleryLabel: {
      en: "Seeded image slots waiting for final assets",
      et: "Pildislotid ootavad lõplikke faile",
    },
  },
  {
    slug: "laulupidu-postimees",
    client: "Postimees",
    event: {
      en: "Estonian Song Festival hybrid activation",
      et: "Laulupeo hübriidaktivatsioon",
    },
    year: "2025",
    category: "festival",
    city: "Tallinn",
    countryCode: "EE",
    service: {
      en: "Hybrid booth + web booster",
      et: "Hübriidlahendus: boks + veebibooster",
    },
    summary: {
      en: "A large cultural-event format that blends on-site printing with a nationwide digital participation layer.",
      et: "Suur kultuurisündmuse formaat, mis ühendab kohapealse printimise ja üle-eestilise digitaalse osaluskihi.",
    },
    brief: {
      en: "Help people try on the folk-dance outfits of their own region and turn the largest cultural event in Estonia into a shareable branded-photo moment.",
      et: "Anda inimestele võimalus proovida oma piirkonna rahvarõivaid ja muuta Eesti suurim kultuurisündmus jagatavaks bränditud fotokogemuseks.",
    },
    challenge: {
      en: "The activation needed to serve both on-site queues and everyone who could not or did not want to wait in line.",
      et: "Aktivatsioon pidi teenindama nii kohapealseid järjekordi kui ka kõiki, kes ei soovinud või ei saanud järjekorras oodata.",
    },
    solution: {
      en: "Two physical booths with four printers were paired with a week-long virtual booth on the client's website, expanding the event beyond the venue itself.",
      et: "Kaks füüsilist boksi nelja printeriga ühendati nädal aega kestva virtuaalse boksiga kliendi veebis, mis viis kogemuse sündmuspaigast kaugemale.",
    },
    deliverables: [
      {
        en: "Two on-site booths with print outputs",
        et: "Kaks kohapealset boksi koos printidega",
      },
      {
        en: "Virtual booth embedded on the client website",
        et: "Kliendi veebilehele paigaldatud virtuaalne boks",
      },
      {
        en: "Region-based outfit logic and instant digital sharing",
        et: "Piirkonnapõhine rõivaloogika ja kohene digitaalne jagamine",
      },
    ],
    outcomes: [
      {
        en: "The digital layer kept the campaign useful even beyond the physical queue.",
        et: "Digitaalne kiht hoidis kampaania väärtuslikuna ka väljaspool füüsilist järjekorda.",
      },
      {
        en: "The format created a stronger lead-generation engine than a booth alone could manage.",
        et: "Formaat lõi tugevama lead-generation mootori kui ainult kohapealne boks suudaks.",
      },
      {
        en: "The concept fit naturally with identity, nostalgia, and regional pride.",
        et: "Kontseptsioon sobitus loomulikult identiteedi, nostalgia ja piirkondliku uhkusega.",
      },
    ],
    metrics: [
      {
        value: "103K",
        label: { en: "Images generated", et: "Genereeritud pilti" },
      },
      {
        value: "23K",
        label: { en: "New sign-ups", et: "Uusi liitumisi" },
      },
      {
        value: "2168",
        label: { en: "Printed photos", et: "Välja prinditud pilti" },
      },
    ],
    awards: [
      {
        en: "Kuldmuna 2026, 3rd place in branded content / experiential marketing",
        et: "Kuldmuna 2026, 3. koht bränditud sisu / elamusliku turunduse kategoorias",
      },
    ],
    quote: {
      name: "Placeholder quote slot",
      role: {
        en: "Client-side producer",
        et: "Kliendipoolne produtsent",
      },
      quote: {
        en: "Reserved for a final Song Festival quote once the source owner is confirmed.",
        et: "Reserveeritud lõplikule laulupeo tsitaadile pärast allika kinnitamist.",
      },
      status: {
        en: "Quote still to be sourced",
        et: "Tsitaat veel kogumisel",
      },
    },
    galleryLabel: {
      en: "Hybrid booth gallery structure ready for event assets",
      et: "Hübriidboksigalerii struktuur ootab sündmuse faile",
    },
  },
  {
    slug: "melt",
    client: "MELT",
    event: {
      en: "Innovation forum demo area",
      et: "Innovatsioonifoorumi demoala",
    },
    year: "2025",
    category: "fair",
    city: "Tallinn",
    countryCode: "EE",
    service: {
      en: "On-site AI booth experience",
      et: "Kohapealne AI-fotoboksi kogemus",
    },
    summary: {
      en: "A high-footfall event activation where the booth worked as both entertainment and a conversation magnet for the surrounding stand.",
      et: "Suure läbilaskega sündmuse aktivatsioon, kus boks töötas korraga nii meelelahutuse kui ka ümbritseva ala tähelepanumagnetina.",
    },
    brief: {
      en: "Design an activation strong enough to hold attention all day on a busy demo floor and still feel premium, warm, and relevant to the conference context.",
      et: "Luua aktivatsioon, mis hoiaks tähelepanu terve päeva tiheda demoala keskel ning mõjuks samal ajal premium'i, sooja ja konverentsi teemaga sobivana.",
    },
    challenge: {
      en: "The booth had to stand out in a crowded event environment without becoming visually noisy or disconnected from the forum brand.",
      et: "Boks pidi eristuma tihedas sündmusekeskkonnas, muutumata visuaalselt lärmakaks või foorumi brändist eraldiseisvaks.",
    },
    solution: {
      en: "PortrAI structured two visual directions for the activation and used the booth as a crowd-building anchor, with a guest flow built for long operating hours.",
      et: "PortrAI struktureeris aktivatsioonile kaks visuaalset suunda ja kasutas boksi rahva kogujana, mille külalisteekond oli ehitatud pikkadeks tööpäevadeks.",
    },
    deliverables: [
      {
        en: "AI booth concept adapted to conference positioning",
        et: "Konverentsi positsioneerimisega sobitatud AI-boksi kontseptsioon",
      },
      {
        en: "Two creative booth modes for one event context",
        et: "Kaks loovsuunda ühe sündmuse kontekstis",
      },
      {
        en: "Prepared production and guest-flow planning",
        et: "Läbimõeldud tootmine ja külalisteekonna planeerimine",
      },
    ],
    outcomes: [
      {
        en: "The installation attracted guests continuously from morning to evening.",
        et: "Installatsioon tõi külalisi ligi hommikust õhtuni.",
      },
      {
        en: "The booth became a focal point instead of just an add-on activity.",
        et: "Boksist sai keskpunkt, mitte lihtsalt lisategevus.",
      },
      {
        en: "The collaboration quality itself is strong enough to support a homepage testimonial.",
        et: "Koostöö kvaliteet oli piisavalt tugev, et sellest sündis avalehele sobiv klienditsitaat.",
      },
    ],
    metrics: [
      {
        value: "10h",
        label: { en: "Live attraction window", et: "Tähelepanu hoidmise aken" },
      },
      {
        value: "2",
        label: { en: "Creative booth directions", et: "Loovsuunda" },
      },
      {
        value: "1",
        label: { en: "Homepage testimonial source", et: "Avalehe tsitaadi allikas" },
      },
    ],
    quote: testimonialSeeds[0],
    galleryLabel: {
      en: "Demo-floor gallery scaffold waiting for MELT assets",
      et: "Demoala galerii ootab MELTi faile",
    },
  },
  {
    slug: "telia-rohekusimustik",
    client: "Telia",
    event: {
      en: "Sustainability showroom opening",
      et: "Kestlikkusele keskenduva esinduse avamine",
    },
    year: "2026",
    category: "corporate",
    city: "Tallinn",
    countryCode: "EE",
    service: {
      en: "Custom questionnaire-led activation",
      et: "Kohandatud küsimustikupõhine aktivatsioon",
    },
    summary: {
      en: "A concept seed for a brand-specific AI experience where a short questionnaire changes the resulting visual world.",
      et: "Kontseptsiooniseeme brändipõhisele AI-kogemusele, kus lühike küsimustik muudab lõplikku visuaalset maailma.",
    },
    brief: {
      en: "Create an activation aligned with sustainability and future-thinking rather than a generic fun-photo mechanic.",
      et: "Luua aktivatsioon, mis toetab kestlikkuse ja tulevikumõtlemise sõnumit, mitte lihtsalt üldist lõbusat fotolahendust.",
    },
    challenge: {
      en: "The concept needed to feel intelligent and thematic without slowing the guest journey too much.",
      et: "Kontseptsioon pidi tunduma sisukas ja teemaga seotud, aeglustamata samal ajal külalisteekonda liigselt.",
    },
    solution: {
      en: "PortrAI framed the experience as a five-question sustainability score that routes guests into dystopian, utopian, or in-between future scenes.",
      et: "PortrAI raamistas kogemuse viieküsimuselise keskkonnateadlikkuse skoorina, mis suunab külalised düstoopilistesse, utoopilistesse või vahepealsetesse tulevikustseenidesse.",
    },
    deliverables: [
      {
        en: "Five-question branching interaction",
        et: "Viieküsimuseline hargnev interaktsioon",
      },
      {
        en: "Score-based image logic",
        et: "Skooripõhine pildiloogika",
      },
      {
        en: "Brand-fit future-world art direction",
        et: "Brändile sobiv tulevikumaailmade art direction",
      },
    ],
    outcomes: [
      {
        en: "A stronger brand narrative than a single static booth theme would provide.",
        et: "Tugevam brändinarratiiv kui üks staatiline boksiteema suudaks anda.",
      },
      {
        en: "A clear place to discuss sustainability without falling into lecture mode.",
        et: "Selge koht kestlikkuse teemal rääkimiseks ilma loengulikkuseta.",
      },
      {
        en: "A good candidate for a premium custom-solution case study once visuals arrive.",
        et: "Hea kandidaat premium-erilahenduse case-study'ks, kui visuaalid kohale jõuavad.",
      },
    ],
    metrics: [],
    galleryLabel: {
      en: "Custom-solution slots reserved for final Telia visuals",
      et: "Erilahenduse slotid on reserveeritud Telia lõppvisuaalidele",
    },
  },
  {
    slug: "swedbank-unistused",
    client: "Swedbank",
    event: {
      en: "Startup Day dreams activation",
      et: "Startup Day unistuste aktivatsioon",
    },
    year: "2026",
    category: "fair",
    city: "Tartu",
    countryCode: "EE",
    service: {
      en: "Prompt-based branded concept",
      et: "Promptipõhine bränditud kontseptsioon",
    },
    summary: {
      en: "A concept seed for a booth where written dreams become personalized AI visuals in Swedbank's own brand universe.",
      et: "Kontseptsiooniseeme boksile, kus kirjutatud unistused muutuvad personaliseeritud AI-visuaalideks Swedbanki enda brändimaailmas.",
    },
    brief: {
      en: "Tie the booth to aspiration and future-thinking instead of a generic portrait outcome.",
      et: "Siduda boks unistuste ja tulevikumõtlemisega, mitte lihtsalt üldise portreetulemusega.",
    },
    challenge: {
      en: "The experience needed creative freedom without drifting into unsafe or off-brand prompt outputs.",
      et: "Kogemus vajas loomingulist vabadust, ilma et promptid triiviksid sobimatu või brändivälise tulemuse suunas.",
    },
    solution: {
      en: "Guests typed what they dream about, the system generated a unique image in Swedbank colours, and a moderation layer filtered out inappropriate prompt inputs.",
      et: "Külalised kirjutasid, millest nad unistavad, süsteem lõi Swedbanki värvides unikaalse pildi ning moderatsioonikiht filtreeris sobimatud promptid välja.",
    },
    deliverables: [
      {
        en: "Dream-input interaction model",
        et: "Unistuse sisestamise interaktsioonimudel",
      },
      {
        en: "Brand-safe prompt filtering",
        et: "Bränditurvaline promptide filtreerimine",
      },
      {
        en: "Swedbank-colour visual output system",
        et: "Swedbanki värvidele toetuv visuaalväljundi süsteem",
      },
    ],
    outcomes: [
      {
        en: "A more personal emotional hook than a style-picker alone.",
        et: "Isiklikum emotsionaalne konks kui lihtsalt stiilivalik.",
      },
      {
        en: "A clear reason for guests to write, reflect, and share.",
        et: "Selge põhjus, miks külaline kirjutab, mõtleb ja jagab.",
      },
      {
        en: "A useful premium-use-case template for future finance or employer-branding projects.",
        et: "Kasulik premium-use-case'i mall tulevastele finants- või tööandjabrändi projektidele.",
      },
    ],
    metrics: [],
    galleryLabel: {
      en: "Prompt-led gallery structure waiting for Swedbank assets",
      et: "Promptipõhine galerii ootab Swedbanki faile",
    },
  },
  {
    slug: "oixio-ebs-ai-oppenoustaja",
    client: "OIXIO x EBS",
    event: {
      en: "AI study advisor activation",
      et: "AI-õppenõustaja aktivatsioon",
    },
    year: "2026",
    category: "fair",
    city: "Tallinn",
    countryCode: "EE",
    service: {
      en: "Interactive questionnaire + follow-up email",
      et: "Interaktiivne küsimustik + järelmeil",
    },
    summary: {
      en: "A lead-generation concept where AI helps match visitors to the right study programme and carries the recommendation into follow-up email.",
      et: "Lead-generation kontseptsioon, kus AI aitab külastaja sobiva õppekavani ja viib soovituse ka järelmeili sisse.",
    },
    brief: {
      en: "Introduce six study programmes in a way that feels personal, useful, and instantly memorable on a busy event floor.",
      et: "Tutvustada kuut õppekava viisil, mis mõjuks tihedal üritusalal isikliku, kasuliku ja koheselt meeldejäävana.",
    },
    challenge: {
      en: "The booth needed to do more than entertain. It had to actively move people toward the correct next step.",
      et: "Boks pidi tegema enamat kui lihtsalt lõbustama. See pidi aktiivselt aitama inimest õige järgmise sammuni.",
    },
    solution: {
      en: "Guests answered six questions, AI matched them to an EBS study path, and the visual output plus follow-up email both reflected that recommendation.",
      et: "Külalised vastasid kuuele küsimusele, AI sobitas nad EBSi õppesuunaga ning nii visuaalne väljund kui ka järelmeil peegeldasid seda soovitust.",
    },
    deliverables: [
      {
        en: "Six-question qualification flow",
        et: "Kuue küsimusega kvalifitseerimisflow",
      },
      {
        en: "Programme-based image logic",
        et: "Õppekavapõhine pildiloogika",
      },
      {
        en: "Personalized follow-up email structure",
        et: "Personaliseeritud järelmeili struktuur",
      },
    ],
    outcomes: [
      {
        en: "A better bridge from event curiosity to meaningful lead nurture.",
        et: "Parem sild üritusepõhisest huvist sisuka lead nurture'ini.",
      },
      {
        en: "More educational relevance than a simple style-based booth interaction.",
        et: "Rohkem sisulist hariduslikku relevantsust kui lihtsal stiilipõhisel boksikogemusel.",
      },
      {
        en: "A useful structure template for future quiz-driven brand activations.",
        et: "Kasulik struktuurimall tulevastele küsimustikupõhistele brändiaktivatsioonidele.",
      },
    ],
    metrics: [],
    quote: testimonialSeeds[2],
    galleryLabel: {
      en: "Qualification-flow gallery waiting for final event assets",
      et: "Kvalifitseerimisflow galerii ootab lõplikke ürituse faile",
    },
  },
];

export const featuredProjectSlugs = [
  "von-fock",
  "laulupidu-postimees",
  "melt",
];

export const projectsBySlug = Object.fromEntries(
  projects.map((project) => [project.slug, project]),
) as Record<string, PlaceholderProject>;

export function getProject(slug: string) {
  return projectsBySlug[slug];
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return null;
  return projects[(index + 1) % projects.length];
}
