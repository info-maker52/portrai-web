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
      en: "We map the audience, venue, guest volume, and what success should look like before anything is produced.",
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
      en: "We design the visual direction, prompt logic, branded details, and the guest flow that will hold up in a live setting.",
      et: "Raamid, teemad, brändikihid ja võimalik küsimustikuloogika pannakse paika enne, kui live-lahendus tootmisse läheb.",
    },
  },
  {
    id: "activation",
    title: {
      en: "Live activation",
      et: "Live-aktivatsioon",
    },
    body: {
      en: "We run the experience on-site, online, or both, with instant image generation, delivery, printing, and optional lead capture.",
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
      en: "After the event, we package the exports, galleries, follow-up assets, and any leads so the activation keeps working after the queue is gone.",
      et: "Pärast üritust saame kokku panna ekspordid, highlight-galeriid, järelmeilid ja tugevamad hetked edasiseks kampaaniakasutuseks.",
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
    id: "aivar-kuusk",
    name: "Aivar Kuusk",
    company: "Kuusk Events",
    role: {
      en: "Event organiser",
      et: "Ürituste korraldaja",
    },
    quote: {
      en: "In all my 20 years of organising events, this is the most impactful photo booth experience I have encountered.",
      et: "Kogu oma 20-aastase ürituste korraldamise kogemuse jooksul on see kõige mõjuvam fotoboksi-elamus, mida olen kohanud.",
    },
    status: {
      en: "Client feedback from Kuusk Events",
      et: "Klienditagasiside Kuusk Eventsilt",
    },
  },
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
      en: "Client feedback from MELT",
      et: "Klienditagasiside MELTilt",
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
      en: "Client feedback from Technopol",
      et: "Klienditagasiside Technopolilt",
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
      en: "Client feedback from EBS",
      et: "Klienditagasiside EBSilt",
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
      en: "Client feedback from Startup Day",
      et: "Klienditagasiside Startup Daylt",
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
      en: "Guests take a portrait, trigger or choose the visual direction, and receive a branded result within seconds. Depending on the setup, that can be printed on-site, shared by QR, or sent digitally afterwards.",
      et: "Külaline teeb portree, käivitab või valib visuaalse suuna ning saab bränditud tulemuse kätte sekunditega. Sõltuvalt lahendusest saab selle printida kohapeal, jagada QR-iga või saata hiljem digitaalselt.",
    },
  },
  {
    question: {
      en: "Can the experience match our brand, campaign, or venue?",
      et: "Kas kogemus saab sobituda meie brändi, kampaania või sündmuskohaga?",
    },
    answer: {
      en: "Yes. We can tailor the prompts, visual worlds, overlays, copy, questionnaire logic, and delivery flow to match a specific launch, campaign, or venue.",
      et: "Jah. Saame kohandada promptid, visuaalmaailmad, kihid, sõnumid, küsimustikuloogika ja väljundi voolu konkreetse lansseerimise, kampaania või toimumiskoha järgi.",
    },
  },
  {
    question: {
      en: "Can guests receive their images digitally as well as on paper?",
      et: "Kas külalised saavad pildid nii digitaalselt kui ka paberil?",
    },
    answer: {
      en: "Yes. Images can be shared by QR, email, or gallery link, and the same setup can include instant prints when the event calls for them.",
      et: "Jah. Pilte saab jagada QR-i, e-posti või galeriilingi kaudu ning sama setup saab vajadusel sisaldada ka koheseid printe.",
    },
  },
  {
    question: {
      en: "How much space, time, and staffing does the setup need?",
      et: "Kui palju ruumi, aega ja meeskonda setup vajab?",
    },
    answer: {
      en: "That depends on the format, but we map the footprint, setup time, power, internet, and staffing needs before production so the flow works on the day.",
      et: "See sõltub formaadist, kuid kaardistame enne tootmist ruumivajaduse, ülespaneku aja, elektri, interneti ja meeskonna vajaduse, et kõik toimiks ürituse päeval sujuvalt.",
    },
  },
  {
    question: {
      en: "Can you create a custom questionnaire or activation flow?",
      et: "Kas saate teha kohandatud küsimustiku või aktivatsiooni loogika?",
    },
    answer: {
      en: "Absolutely. We build custom flows for things like style choices, branched questions, lead capture, and campaign-specific recommendations.",
      et: "Jah. Loome kohandatud vooge stiilivalikute, hargnevate küsimuste, kontaktikorje ja kampaaniapõhiste soovituste jaoks.",
    },
  },
  {
    question: {
      en: "What happens after the event?",
      et: "Mis juhtub pärast üritust?",
    },
    answer: {
      en: "After the event, we can hand over exports, highlight galleries, follow-up assets, and reporting so the activation keeps working beyond the venue.",
      et: "Pärast üritust saame üle anda ekspordid, highlight-galeriid, järeltegevuste materjalid ja raporti, et aktivatsioon töötaks edasi ka väljaspool venue'd.",
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
      en: "Tell us whether the priority is reach, sharing, lead capture, premium hospitality, or something else entirely.",
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
      en: "Outputs and follow-up",
      et: "Väljundi ootused",
    },
    body: {
      en: "Tell us whether you need prints, QR delivery, follow-up email, a web layer, or a broader campaign package.",
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
      en: "Web-based campaign activation",
      et: "Interaktiivne veebiaktivatsioon",
    },
    summary: {
      en: "An interactive portrait campaign that placed viewers inside the world of the series and turned launch interest into sharing.",
      et: "Kampaaniaaktivatsioon, mis lasi vaatajatel astuda sarja maailma ja jagada tulemust omaenda karakteriportreena.",
    },
    brief: {
      en: "Launch season two with something more participatory than a trailer or a static key visual.",
      et: "Tutvustada uut telesarja, tekitada sotsiaalset kõlapinda ja kasvatada vaatajanumbreid, lastes inimestel end Von Focki maailmas näha.",
    },
    challenge: {
      en: "The campaign needed reach, speed, and a reason for people to share their result immediately.",
      et: "Tavalised kampaaniamaterjalid ei oleks loonud sama isiklikku sidet kui end loosse asetav ja kohe jagatav portreemehaanika.",
    },
    solution: {
      en: "PortrAI embedded a week-long portrait experience into the publisher's site. Visitors uploaded a selfie, chose a character route, and received a shareable image styled for the series world.",
      et: "PortrAI paigaldas nädalaks virtuaalse fotoboksi kliendi artiklisse ja veebilehele. Külaline laadis üles selfie, valis neljast karakterisuunast ühe ja genereeris jagamist vääriva väljundi.",
    },
    deliverables: [
      {
        en: "Character routes and prompt design for the series world",
        et: "Kohandatud karakteriloogika nelja visuaalse suunaga",
      },
      {
        en: "Embedded web experience on the publisher's own platform",
        et: "Kliendi enda platvormile paigaldatud veebiwidget",
      },
      {
        en: "Simple share flow built for fast social spread",
        et: "Ühe klõpsu jagamisflow kiire viirusliku leviku jaoks",
      },
    ],
    outcomes: [
      {
        en: "The activation itself became the campaign asset.",
        et: "Toode ise muutus kampaaniaks.",
      },
      {
        en: "Fans could place themselves inside the story instead of only watching from the outside.",
        et: "Kasutajad said loo osaks, mitte ei näinud ainult treilerit.",
      },
      {
        en: "The format created organic sharing around the launch instead of relying only on repeated ad exposure.",
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
      en: "Series-inspired portraits and launch visuals",
      et: "Karakterisuunad ja lansseerimisvisuaalid",
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
      en: "On-site booth + online participation",
      et: "Hübriidlahendus: boks + veebibooster",
    },
    summary: {
      en: "A Song Festival activation that combined live photo booths, instant prints, and a web version so the experience could travel beyond the venue.",
      et: "Suur kultuurisündmuse formaat, mis ühendab kohapealse printimise ja üle-eestilise digitaalse osaluskihi.",
    },
    brief: {
      en: "Create a portrait experience around regional folk costumes and make it accessible both on-site and online.",
      et: "Anda inimestele võimalus proovida oma piirkonna rahvarõivaid ja muuta Eesti suurim kultuurisündmus jagatavaks bränditud fotokogemuseks.",
    },
    challenge: {
      en: "The activation had to work for large queues at the festival while still reaching people following the event elsewhere.",
      et: "Aktivatsioon pidi teenindama nii kohapealseid järjekordi kui ka kõiki, kes ei soovinud või ei saanud järjekorras oodata.",
    },
    solution: {
      en: "PortrAI ran two physical booths with multiple printers and paired them with a week-long online version on Postimees, extending the experience far beyond the festival grounds.",
      et: "Kaks füüsilist boksi nelja printeriga ühendati nädal aega kestva virtuaalse boksiga kliendi veebis, mis viis kogemuse sündmuspaigast kaugemale.",
    },
    deliverables: [
      {
        en: "Two on-site booths with live print output",
        et: "Kaks kohapealset boksi koos printidega",
      },
      {
        en: "Online portrait experience embedded on Postimees",
        et: "Kliendi veebilehele paigaldatud virtuaalne boks",
      },
      {
        en: "Regional costume logic with instant digital sharing",
        et: "Piirkonnapõhine rõivaloogika ja kohene digitaalne jagamine",
      },
    ],
    outcomes: [
      {
        en: "The queue at the venue was only part of the total reach.",
        et: "Digitaalne kiht hoidis kampaania väärtuslikuna ka väljaspool füüsilist järjekorda.",
      },
      {
        en: "The online layer kept the activation active throughout the week.",
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
      en: "Festival portraits, prints, and online participation",
      et: "Hübriidne printimis- ja jagamisformaat",
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
      en: "A high-traffic demo-area activation designed to stop people, create a queue, and give the event floor a focal point.",
      et: "Suure läbilaskega sündmuse aktivatsioon, kus boks töötas korraga nii meelelahutuse kui ka ümbritseva ala tähelepanumagnetina.",
    },
    brief: {
      en: "Build a booth that could pull attention all day without feeling gimmicky or off-brand.",
      et: "Luua aktivatsioon, mis hoiaks tähelepanu terve päeva tiheda demoala keskel ning mõjuks samal ajal premium'i, sooja ja konverentsi teemaga sobivana.",
    },
    challenge: {
      en: "The setup had to stand out in a busy conference environment and still feel polished enough for a premium event.",
      et: "Boks pidi eristuma tihedas sündmusekeskkonnas, muutumata visuaalselt lärmakaks või foorumi brändist eraldiseisvaks.",
    },
    solution: {
      en: "PortrAI shaped the visual direction for the forum, tuned the guest flow for long operating hours, and used the booth as an anchor for the surrounding area.",
      et: "PortrAI struktureeris aktivatsioonile kaks visuaalset suunda ja kasutas boksi rahva kogujana, mille külalisteekond oli ehitatud pikkadeks tööpäevadeks.",
    },
    deliverables: [
      {
        en: "Event-specific AI booth direction for the demo area",
        et: "Konverentsi positsioneerimisega sobitatud AI-boksi kontseptsioon",
      },
      {
        en: "Guest flow planned for continuous use across the day",
        et: "Kaks loovsuunda ühe sündmuse kontekstis",
      },
      {
        en: "Branded portrait outputs worth sharing from the floor",
        et: "Läbimõeldud tootmine ja külalisteekonna planeerimine",
      },
    ],
    outcomes: [
      {
        en: "The booth kept attracting guests from morning to evening.",
        et: "Installatsioon tõi külalisi ligi hommikust õhtuni.",
      },
      {
        en: "It became a focal point instead of just another side activity.",
        et: "Boksist sai keskpunkt, mitte lihtsalt lisategevus.",
      },
      {
        en: "The activation gave MELT a memorable demo-area presence people talked about afterwards.",
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
    quote: testimonialSeeds[1],
    galleryLabel: {
      en: "Demo-floor portraits and live event energy",
      et: "Konverentsiala portreed ja tähelepanu tõmbav kohalolu",
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
      en: "Questionnaire-based brand activation",
      et: "Kohandatud küsimustikupõhine aktivatsioon",
    },
    summary: {
      en: "A Telia experience where a short sustainability quiz changed the visual world each guest stepped into.",
      et: "Brändipõhine AI-kogemus, kus lühike kestlikkuse küsimustik muudab lõplikku visuaalset maailma.",
    },
    brief: {
      en: "Translate sustainability and future-thinking into an activation that felt branded, intelligent, and easy to try.",
      et: "Luua aktivatsioon, mis toetab kestlikkuse ja tulevikumõtlemise sõnumit, mitte lihtsalt üldist lõbusat fotolahendust.",
    },
    challenge: {
      en: "The interaction had to feel meaningful without slowing the queue or turning the experience into a lecture.",
      et: "Kontseptsioon pidi tunduma sisukas ja teemaga seotud, aeglustamata samal ajal külalisteekonda liigselt.",
    },
    solution: {
      en: "Guests answered five short questions and were routed into different future scenarios, all art-directed inside Telia's visual world.",
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
        en: "It gave Telia a clearer story than a single static booth theme would.",
        et: "Tugevam brändinarratiiv kui üks staatiline boksiteema suudaks anda.",
      },
      {
        en: "It opened conversation around sustainability without becoming heavy-handed.",
        et: "Selge koht kestlikkuse teemal rääkimiseks ilma loengulikkuseta.",
      },
      {
        en: "It created a reusable premium format for showrooms and employer-branding activations.",
        et: "Paindlik premium-formaat tulevaste showroom'i ja tööandjabrändi aktivatsioonide jaoks.",
      },
    ],
    metrics: [],
    galleryLabel: {
      en: "Telia portraits shaped by the sustainability quiz",
      et: "Küsimustikupõhised visuaalid Telia lillas maailmas",
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
      en: "Branded dream-prompt activation",
      et: "Promptipõhine bränditud kontseptsioon",
    },
    summary: {
      en: "A Startup Day concept where guests typed their dream and received a branded AI portrait shaped by that prompt.",
      et: "Boksikontseptsioon, kus kirjutatud unistused muutuvad personaliseeritud AI-visuaalideks Swedbanki enda brändimaailmas.",
    },
    brief: {
      en: "Make the booth feel personal, aspirational, and unmistakably Swedbank rather than simply decorative.",
      et: "Siduda boks unistuste ja tulevikumõtlemisega, mitte lihtsalt üldise portreetulemusega.",
    },
    challenge: {
      en: "The concept needed open-ended guest input without drifting into unsafe or off-brand results.",
      et: "Kogemus vajas loomingulist vabadust, ilma et promptid triiviksid sobimatu või brändivälise tulemuse suunas.",
    },
    solution: {
      en: "Guests wrote what they dream about, the system generated a matching image in Swedbank's visual language, and moderation kept the output brand-safe.",
      et: "Külalised kirjutasid, millest nad unistavad, süsteem lõi Swedbanki värvides unikaalse pildi ning moderatsioonikiht filtreeris sobimatud promptid välja.",
    },
    deliverables: [
      {
        en: "Dream-input interaction flow",
        et: "Unistuse sisestamise interaktsioonimudel",
      },
      {
        en: "Brand-safe prompt moderation",
        et: "Bränditurvaline promptide filtreerimine",
      },
      {
        en: "Swedbank visual system for the final outputs",
        et: "Swedbanki värvidele toetuv visuaalväljundi süsteem",
      },
    ],
    outcomes: [
      {
        en: "It gave the booth a more personal hook than a simple style picker.",
        et: "Isiklikum emotsionaalne konks kui lihtsalt stiilivalik.",
      },
      {
        en: "It gave guests a clear reason to stop, reflect, and share.",
        et: "Selge põhjus, miks külaline kirjutab, mõtleb ja jagab.",
      },
      {
        en: "It created a strong concept for future finance and employer-branding activations.",
        et: "Kasulik premium-use-case'i mall tulevastele finants- või tööandjabrändi projektidele.",
      },
    ],
    metrics: [],
    galleryLabel: {
      en: "Dream-led portraits in Swedbank's visual world",
      et: "Promptipõhised portreed bränditud tulevikutöö stiilis",
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
      en: "Quiz and follow-up flow",
      et: "Interaktiivne küsimustik + järelmeil",
    },
    summary: {
      en: "A study-advisor activation that used AI to match visitors with the right programme and continue the conversation after the event.",
      et: "Lead-generation kontseptsioon, kus AI aitab külastaja sobiva õppekavani ja viib soovituse ka järelmeili sisse.",
    },
    brief: {
      en: "Present six study programmes in a way that felt personal, useful, and memorable on a busy event floor.",
      et: "Tutvustada kuut õppekava viisil, mis mõjuks tihedal üritusalal isikliku, kasuliku ja koheselt meeldejäävana.",
    },
    challenge: {
      en: "The booth needed to do more than entertain. It had to guide people toward a relevant next step.",
      et: "Boks pidi tegema enamat kui lihtsalt lõbustama. See pidi aktiivselt aitama inimest õige järgmise sammuni.",
    },
    solution: {
      en: "Visitors answered six questions, AI matched them to an EBS study path, and the recommendation carried through both the image output and the follow-up email.",
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
        en: "It created a stronger bridge from event curiosity to real enquiry.",
        et: "Parem sild üritusepõhisest huvist sisuka lead nurture'ini.",
      },
      {
        en: "It felt more useful and relevant than a simple style-based photo interaction.",
        et: "Rohkem sisulist hariduslikku relevantsust kui lihtsal stiilipõhisel boksikogemusel.",
      },
      {
        en: "It created a repeatable structure for education and quiz-led activations.",
        et: "Kasulik struktuurimall tulevastele küsimustikupõhistele brändiaktivatsioonidele.",
      },
    ],
    metrics: [],
    quote: testimonialSeeds[3],
    galleryLabel: {
      en: "Quiz flow and personalised study-match outputs",
      et: "Küsimustikuvool ja õppesobivuse väljundid",
    },
  },
];

export const featuredProjectSlugs = [
  "von-fock",
  "telia-rohekusimustik",
  "swedbank-unistused",
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
