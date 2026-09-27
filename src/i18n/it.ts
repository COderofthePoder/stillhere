import type { Copy } from "./de";

export const it: Copy = {
  meta: {
    locale: "it-CH",
    name: "StillHere",
    tagline: "Adesso non devi portare tutto da solo/a.",
  },
  nav: {
    chat: "Chat",
    safetyPlan: "Piano di sicurezza",
    helpSomeone: "Esserci per qualcuno",
    help: "Aiuto subito",
    cta: "Scrivi in anonimo",
    mobilePlan: "Piano",
    mobileHelp: "Aiuto",
    language: "Lingua",
    about: "Chi è StillHere",
  },
  home: {
    heroTitle: "Adesso non devi portare tutto da solo/a.",
    heroText:
      "Quando tutto è troppo, qui puoi scrivere in anonimo. Senza account, senza giudizi e senza dover spiegare perché stai male.",
    primaryCta: "Scrivi in anonimo adesso",
    secondaryCta: "Ho bisogno di aiuto subito",
    disclaimer:
      "StillHere non sostituisce un trattamento medico o psicoterapeutico. In caso di pericolo immediato: 144.",
    cards: [
      { title: "Scrivere con qualcuno", text: "Una conversazione tranquilla quando tutto è troppo.", cta: "Apri la chat", to: "/chat" },
      {
        title: "Piano di sicurezza",
        text: "Annota cosa può aiutarti nei momenti difficili.",
        cta: "Crea un piano di sicurezza",
        to: "/safety-plan",
      },
      {
        title: "Sono preoccupato/a per qualcuno",
        text: "Aiuto concreto quando un'altra persona ha parlato di pensieri suicidi.",
        cta: "Cosa posso fare?",
        to: "/help-someone",
      },
    ],
  },
  chat: {
    title: "StillHere",
    subtitle: "Anonimo · senza registrazione",
    aiNote: "Supporto basato su IA",
    helpNow: "Aiuto subito",
    opening: "Ciao. Qui non devi trovare le parole perfette. Cosa sta succedendo adesso?",
    quickReplies: [
      "Non ce la faccio più",
      "Mi sento solo/a",
      "Ho pensieri suicidi",
      "Non so da dove cominciare",
    ],
    inputPlaceholder: "Scrivi pure …",
    send: "Invia",
    thinking: "StillHere sta scrivendo …",
    error:
      "La connessione non ha funzionato. Puoi riprovare. Se hai bisogno di supporto adesso: il 143 è raggiungibile giorno e notte.",
    saveLocally: "Salva la conversazione su questo dispositivo",
    savedLocally: "La conversazione viene salvata su questo dispositivo",
    saveHint:
      "Di norma la conversazione dura solo questa sessione. Se la salvi, rimane soltanto nel tuo browser.",
    clear: "Elimina la conversazione",
    openSafetyPlan: "Apri il piano di sicurezza",
    contactTrusted: "Contatta una persona di fiducia",
    highTitle: "Sembra che adesso possa essere importante non restare da solo/a.",
    immediateTitle: "Per favore, cerca subito un aiuto diretto.",
    immediateText:
      "Se sei in pericolo immediato o ti sei già fatto/a del male, chiama il 144 o vai al pronto soccorso più vicino.",
    stayInChat: "Resto nella chat",
    emergencyBar: "Se sei in pericolo:",
    feedbackTitle: "Questa conversazione ti è stata utile?",
    feedbackOptions: ["Sì", "Un po'", "No"],
    feedbackTextLabel: "Cosa ti avrebbe aiutato di più?",
    feedbackSend: "Invia",
    feedbackThanks: "Grazie per il tempo che ti sei preso/a.",
    feedbackSkip: "Non adesso",
  },
  crisis: {
    emergencyTitle: "Emergenza medica",
    emergencyCta: "Chiama il 144",
    crisisTitle: "Telefono Amico",
    crisisText: "Supporto anonimo giorno e notte.",
    crisisCta: "Contatta il 143",
    youthTitle: "Bambini e giovani",
    youthCta: "Contatta il 147",
    call: "chiama",
    crisisChatCta: "Apri la chat 143",
    youthSmsCta: "147 via SMS",
    youthChatCta: "147 chat & WhatsApp",
    toxTitle: "Intossicazione o overdose",
    toxCta: "Chiama il 145",
    policeTitle: "Minacciato/a da qualcuno",
    policeCta: "Chiama il 117",
    writeCta: "Scrivi",
    website: "Sito web",
  },
  safetyPlan: {
    title: "Piano di sicurezza",
    intro:
      "Un piano di sicurezza è una breve nota per te stesso/a: cosa ti aiuta e chi puoi raggiungere quando diventa difficile. Puoi modificarlo in ogni momento.",
    savedNote: "Il tuo piano viene salvato solo su questo dispositivo.",
    saveCta: "Salva su questo dispositivo",
    saved: "Salvato",
    printCta: "Salva come PDF",
    clearCta: "Elimina il piano",
    addTag: "Aggiungi",
    addPerson: "Aggiungi persona",
    addContact: "Aggiungi contatto",
    name: "Nome",
    relation: "Relazione",
    phone: "Numero di telefono",
    remove: "Rimuovi",
    sections: {
      warningSigns: {
        title: "Da cosa mi accorgo che sta diventando più difficile?",
        hint: "Per esempio:",
        examples: ["Mi isolo", "Dormo pochissimo", "I pensieri diventano più intensi"],
      },
      soothing: {
        title: "Cosa può distrarmi o calmarmi a breve termine?",
        hint: "Per esempio:",
        examples: ["camminare", "musica", "una doccia", "videogiochi", "sport", "animale", "guardare una serie"],
      },
      people: {
        title: "Persone che posso contattare",
        hint: "Persone a cui potresti scrivere – anche senza grandi spiegazioni.",
      },
      professional: {
        title: "Supporto professionale",
        hint: "I numeri più importanti ci sono già. Puoi aggiungere il tuo medico, terapeuta o clinica.",
      },
      safePlaces: {
        title: "Dove mi sento più al sicuro?",
        hint: "Luoghi dove i momenti difficili sono un po' più sopportabili.",
      },
      environment: {
        title: "Rendere più sicuro ciò che mi circonda",
        hint: "C'è qualcosa intorno a te da cui preferiresti allontanarti nei momenti difficili?",
        handoverLabel: "Posso portarlo da questa persona / in questo luogo",
      },
      reason: {
        title: "Un motivo per superare le prossime ore",
        hint: "Non deve essere niente di grande. Cosa potrebbe essere un motivo per resistere ancora un po' oggi?",
      },
    },
  },
  helpSomeone: {
    title: "Sei preoccupato/a per qualcuno?",
    intro:
      "Va bene chiedere direttamente dei pensieri suicidi. Chiedere non mette l'idea in testa a nessuno – mostra che ci sei.",
    question: "La persona ha detto di volersi togliere la vita o di non voler più vivere?",
    answers: { yes: "Sì", maybe: "Forse", no: "No" },
    restart: "Ricomincia",
    phrasesTitle: "Frasi che possono aiutare",
    phrases: [
      "«Stai pensando di toglierti la vita in questo momento?»",
      "«Sei in pericolo immediato adesso?»",
      "«Non voglio che tu resti da solo/a con questo adesso.»",
    ],
    secrecy:
      "Non promettere di tenere segreti i pensieri suicidi se pensi che la persona sia in pericolo acuto.",
    branches: {
      yes: {
        title: "Prendilo sul serio e resta in contatto.",
        steps: [
          "Chiedi direttamente e con calma se la persona è in pericolo adesso.",
          "Resta con la persona se il pericolo sembra immediato – o fai in modo che qualcuno sia presente.",
          "In caso di pericolo immediato chiama il 144. Non devi deciderlo da solo/a.",
          "Aiutala a raggiungere un supporto professionale: medico, pronto soccorso o 143.",
        ],
      },
      maybe: {
        title: "Chiedi – in modo chiaro e diretto.",
        steps: [
          "Di' cosa hai notato, senza giudicare.",
          "Chiedi direttamente: «Stai pensando di toglierti la vita?»",
          "Ascolta senza cercare subito soluzioni.",
          "Resta raggiungibile e richiedi notizie nei giorni seguenti.",
        ],
      },
      no: {
        title: "La tua impressione conta comunque.",
        steps: [
          "Parla di ciò che ti preoccupa – in modo concreto e calmo.",
          "Chiedi come sta davvero la persona e lascia spazio a una risposta sincera.",
          "Offri un aiuto concreto invece di «fammi sapere se c'è qualcosa».",
          "Se la preoccupazione resta: il 143 consiglia anche i familiari.",
        ],
      },
    },
  },
  help: {
    title: "Aiuto subito",
    intro:
      "Questa pagina è anonima. Tutti i numeri sono raggiungibili giorno e notte. Puoi chiamare o scrivere al 143 e al 147 in anonimo. Le chiamate al 144 e al 117 non sono anonime – va bene così, perché l'aiuto possa arrivare in fretta.",
    tox: { title: "Intossicazione, overdose, medicamenti" },
    police: { title: "Minacciato/a da qualcuno" },
    injury:
      "Ferito/a, ma senza pericolo di vita? Il tuo medico, uno studio di pronto intervento o il servizio medico di guardia del tuo cantone possono aiutarti. In caso di forte emorragia o perdita di coscienza: 144.",
    written: "Preferisci scrivere invece di chiamare?",
    emergency: { title: "Emergenza medica acuta", number: "144" },
    talk: { title: "Parlare con qualcuno", number: "143" },
    youth: { title: "Sotto i 25 anni", number: "147" },
    regional: {
      title: "Aiuto psichiatrico nella mia regione",
      cantonLabel: "In quale cantone ti trovi?",
      cantonPlaceholder: "Scegli il cantone (facoltativo)",
      placeholder:
        "Per questo cantone non abbiamo ancora offerte regionali verificate. I numeri qui sopra valgono in tutta la Svizzera, e ogni pronto soccorso aiuta anche nelle crisi psichiche.",
      noLocation: "Non chiediamo la tua posizione.",
    },
  },
  about: {
    title: "Chi è StillHere",
    body: [
      "StillHere è un'offerta anonima e a bassa soglia per i momenti in cui tutto diventa troppo. Puoi scrivere senza registrarti e senza doverti spiegare.",
      "StillHere non è una terapia e non è un servizio d'emergenza. La conversazione è condotta da un'IA che ti ascolta, rallenta il momento con te e ti mette in contatto con persone che possono aiutarti.",
    ],
    disclaimer:
      "StillHere è un'offerta di supporto digitale e non sostituisce un trattamento medico, psicologico o psichiatrico. L'IA può valutare male le situazioni. Se ti senti in pericolo immediato, contatta il 144 o un pronto soccorso.",
  },
  privacy: {
    title: "La tua privacy",
    sections: [
      { title: "Nessun account", body: "Non servono registrazione, indirizzo e-mail o nome. Non sappiamo chi sei." },
      {
        title: "Le conversazioni non vengono conservate",
        body: "Di norma la conversazione dura solo questa sessione. Se la salvi, resta solo nel tuo browser – non sui nostri server. Puoi eliminarla in ogni momento.",
      },
      {
        title: "Come funziona l'IA",
        body: "Perché l'IA possa rispondere, il tuo testo viene inviato a un servizio di IA ed elaborato. Non viene usato per pubblicità e non è collegato al tuo nome, perché non lo conosciamo.",
      },
      {
        title: "Nessun tracciamento, nessuna pubblicità",
        body: "Non usiamo servizi pubblicitari o di tracciamento. I tuoi testi non vanno a Google, Meta o altre piattaforme pubblicitarie e non vengono venduti.",
      },
      { title: "Il tuo piano di sicurezza", body: "Il tuo piano viene salvato solo sul tuo dispositivo. Non lascia il tuo browser." },
      {
        title: "Cosa non possiamo fare",
        body: "StillHere non è un servizio d'emergenza. Non possiamo mandarti aiuto né avvisare le autorità. In caso di pericolo immediato chiama il 144.",
      },
      {
        title: "Nessuna crittografia end-to-end",
        body: "La connessione al sito è crittografata. Non esiste una crittografia end-to-end delle conversazioni – e non lo affermiamo.",
      },
    ],
  },
  resources: {
    "144": "In caso di pericolo immediato o se ti sei già fatto/a del male.",
    "143": "Supporto anonimo giorno e notte. Telefono e chat.",
    "147": "Per bambini e giovani fino a 25 anni. Anonimo, gratuito, sempre. Telefono, SMS, chat e WhatsApp.",
    "145": "In caso di intossicazione, overdose o assunzione di medicamenti, alcol o droghe. Giorno e notte.",
    "117": "Se tu o qualcun altro siete minacciati da un'altra persona.",
  },
  common: { back: "Indietro", close: "Chiudi", optional: "facoltativo" },
};
