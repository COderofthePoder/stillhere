/**
 * All user-facing copy for the German locale. Adding fr/it/en later means
 * adding a sibling file with the same shape and registering it in ./index.ts.
 */
export const de = {
  meta: {
    locale: "de-CH",
    name: "StillHere",
    tagline: "Du musst gerade nicht alles alleine tragen.",
  },
  nav: {
    chat: "Chat",
    safetyPlan: "Safety Plan",
    helpSomeone: "Für jemanden da sein",
    help: "Hilfe jetzt",
    cta: "Anonym schreiben",
    mobilePlan: "Plan",
    mobileHelp: "Hilfe",
  },
  home: {
    heroTitle: "Du musst gerade nicht alles alleine tragen.",
    heroText:
      "Wenn gerade alles zu viel ist, kannst du hier anonym schreiben. Ohne Account, ohne Bewertung und ohne erklären zu müssen, warum es dir schlecht geht.",
    primaryCta: "Jetzt anonym schreiben",
    secondaryCta: "Ich brauche sofort Hilfe",
    disclaimer:
      "StillHere ersetzt keine medizinische oder psychotherapeutische Behandlung. Bei unmittelbarer Gefahr: 144.",
    cards: [
      {
        title: "Mit jemandem schreiben",
        text: "Ein ruhiges Gespräch, wenn gerade alles zu viel ist.",
        cta: "Chat öffnen",
        to: "/chat",
      },
      {
        title: "Safety Plan",
        text: "Halte fest, was dir in schwierigen Momenten helfen kann.",
        cta: "Safety Plan erstellen",
        to: "/safety-plan",
      },
      {
        title: "Ich mache mir Sorgen um jemanden",
        text: "Konkrete Hilfe, wenn eine andere Person Suizidgedanken geäussert hat.",
        cta: "Was kann ich tun?",
        to: "/help-someone",
      },
    ],
  },
  chat: {
    title: "StillHere",
    subtitle: "Anonym · keine Registrierung",
    aiNote: "KI-gestützte Unterstützung",
    helpNow: "Hilfe jetzt",
    opening: "Hey. Du musst hier nichts perfekt formulieren. Was ist gerade los?",
    quickReplies: [
      "Ich kann gerade nicht mehr",
      "Ich fühle mich alleine",
      "Ich habe Suizidgedanken",
      "Ich weiss nicht, wie ich anfangen soll",
    ],
    inputPlaceholder: "Schreib einfach los …",
    send: "Senden",
    thinking: "StillHere schreibt …",
    error:
      "Die Verbindung hat gerade nicht geklappt. Du kannst es nochmals versuchen. Wenn du jetzt Unterstützung brauchst: 143 ist rund um die Uhr erreichbar.",
    saveLocally: "Gespräch auf diesem Gerät speichern",
    savedLocally: "Gespräch wird auf diesem Gerät gespeichert",
    saveHint:
      "Standardmässig bleibt das Gespräch nur in dieser Sitzung. Wenn du es speicherst, liegt es nur in deinem Browser.",
    clear: "Gespräch löschen",
    openSafetyPlan: "Safety Plan öffnen",
    contactTrusted: "Vertrauensperson kontaktieren",
    highTitle: "Es klingt, als könnte es gerade wichtig sein, nicht alleine zu bleiben.",
    immediateTitle: "Bitte hol dir jetzt direkte Hilfe.",
    immediateText:
      "Wenn du unmittelbar gefährdet bist oder dir bereits etwas angetan hast, ruf 144 an oder geh zur nächsten Notfallstation.",
    stayInChat: "Ich bleibe im Chat",
    feedbackTitle: "War dieses Gespräch gerade hilfreich?",
    feedbackOptions: ["Ja", "Ein wenig", "Nein"],
    feedbackTextLabel: "Was hätte dir mehr geholfen?",
    feedbackSend: "Senden",
    feedbackThanks: "Danke, dass du dir die Zeit genommen hast.",
    feedbackSkip: "Nicht jetzt",
  },
  crisis: {
    emergencyTitle: "Medizinischer Notfall",
    emergencyCta: "144 anrufen",
    crisisTitle: "Die Dargebotene Hand",
    crisisText: "Anonyme Unterstützung rund um die Uhr.",
    crisisCta: "143 kontaktieren",
    youthTitle: "Kinder und Jugendliche",
    youthCta: "147 kontaktieren",
    call: "anrufen",
  },
  safetyPlan: {
    title: "Safety Plan",
    intro:
      "Ein Safety Plan ist eine kurze Notiz an dich selbst: was dir hilft und wen du erreichen kannst, wenn es schwierig wird. Du kannst ihn jederzeit ändern.",
    savedNote: "Dein Plan wird nur auf diesem Gerät gespeichert.",
    saveCta: "Auf diesem Gerät speichern",
    saved: "Gespeichert",
    printCta: "Als PDF speichern",
    clearCta: "Plan löschen",
    addTag: "Hinzufügen",
    addPerson: "Person hinzufügen",
    addContact: "Kontakt hinzufügen",
    name: "Name",
    relation: "Beziehung",
    phone: "Telefonnummer",
    remove: "Entfernen",
    sections: {
      warningSigns: {
        title: "Woran merke ich, dass es schwieriger wird?",
        hint: "Zum Beispiel:",
        examples: ["Ich ziehe mich zurück", "Ich schlafe kaum", "Gedanken werden intensiver"],
      },
      soothing: {
        title: "Was kann mich kurzfristig ablenken oder beruhigen?",
        hint: "Zum Beispiel:",
        examples: ["spazieren", "Musik", "duschen", "Gaming", "Training", "Haustier", "Serie schauen"],
      },
      people: {
        title: "Menschen, die ich kontaktieren kann",
        hint: "Menschen, bei denen du dich melden könntest – auch ohne grosse Erklärung.",
      },
      professional: {
        title: "Professionelle Unterstützung",
        hint: "Die wichtigsten Nummern sind schon da. Du kannst deine Ärztin, Therapeutin oder Klinik ergänzen.",
      },
      safePlaces: {
        title: "Wo fühle ich mich sicherer?",
        hint: "Orte, an denen es dir in schwierigen Momenten etwas leichter fällt.",
      },
      environment: {
        title: "Meine Umgebung sicherer machen",
        hint: "Gibt es etwas in deiner Umgebung, von dem du dich in schwierigen Momenten lieber entfernen möchtest?",
        handoverLabel: "Ich kann damit zu dieser Person / diesem Ort gehen",
      },
      reason: {
        title: "Ein Grund, die nächsten Stunden zu überstehen",
        hint: "Es muss nichts Grosses sein. Was könnte ein Grund sein, heute noch etwas länger durchzuhalten?",
      },
    },
  },
  helpSomeone: {
    title: "Du machst dir Sorgen um jemanden?",
    intro:
      "Es ist in Ordnung, direkt nach Suizidgedanken zu fragen. Nachfragen bringt niemanden auf die Idee – es zeigt, dass du da bist.",
    question: "Hat die Person gesagt, dass sie sich das Leben nehmen möchte oder nicht mehr leben will?",
    answers: { yes: "Ja", maybe: "Vielleicht", no: "Nein" },
    restart: "Nochmals von vorne",
    phrasesTitle: "Sätze, die helfen können",
    phrases: [
      "«Denkst du gerade daran, dir das Leben zu nehmen?»",
      "«Bist du gerade in unmittelbarer Gefahr?»",
      "«Ich möchte gerade nicht, dass du damit alleine bist.»",
    ],
    secrecy:
      "Versprich nicht, Suizidgedanken geheim zu halten, wenn du glaubst, dass die Person akut gefährdet ist.",
    branches: {
      yes: {
        title: "Nimm das ernst und bleib in Kontakt.",
        steps: [
          "Frag direkt und ruhig nach, ob die Person gerade in Gefahr ist.",
          "Bleib bei der Person, wenn die Gefahr unmittelbar wirkt – oder organisiere, dass jemand da ist.",
          "Ruf bei unmittelbarer Gefahr 144 an. Du musst das nicht alleine entscheiden.",
          "Hilf dabei, professionelle Unterstützung zu erreichen: Hausärztin, Notfallstation oder 143.",
        ],
      },
      maybe: {
        title: "Frag nach – klar und ohne Umschweife.",
        steps: [
          "Sag, was dir aufgefallen ist, ohne zu bewerten.",
          "Frag direkt: «Denkst du gerade daran, dir das Leben zu nehmen?»",
          "Hör zu, ohne sofort Lösungen zu bringen.",
          "Bleib erreichbar und frag in den nächsten Tagen wieder nach.",
        ],
      },
      no: {
        title: "Dein Eindruck zählt trotzdem.",
        steps: [
          "Sprich an, was dir Sorgen macht – konkret und ruhig.",
          "Frag, wie es der Person wirklich geht, und lass Raum für eine ehrliche Antwort.",
          "Biete konkrete Unterstützung an, statt nur «melde dich, wenn was ist».",
          "Wenn deine Sorge bleibt: 143 berät auch Angehörige.",
        ],
      },
    },
  },
  help: {
    title: "Hilfe jetzt",
    intro: "Alles hier ist anonym und rund um die Uhr erreichbar.",
    emergency: { title: "Akuter medizinischer Notfall", number: "144" },
    talk: { title: "Mit jemandem sprechen", number: "143" },
    youth: { title: "Unter 25", number: "147" },
    regional: {
      title: "Psychiatrische Hilfe in meiner Region",
      cantonLabel: "In welchem Kanton bist du?",
      cantonPlaceholder: "Kanton wählen (optional)",
      placeholder: "Regionale psychiatrische Notfallangebote werden hier ergänzt.",
      noLocation: "Wir fragen deinen Standort nicht ab.",
    },
  },
  about: {
    title: "Über StillHere",
    body: [
      "StillHere ist ein niederschwelliges, anonymes Angebot für Momente, in denen alles zu viel wird. Du kannst schreiben, ohne dich anzumelden und ohne dich zu erklären.",
      "StillHere ist keine Therapie und kein Notfalldienst. Das Gespräch wird von einer KI geführt, die dir zuhört, den Moment mit dir verlangsamt und dich mit Menschen verbindet, die weiterhelfen können.",
    ],
    disclaimer:
      "StillHere ist ein digitales Unterstützungsangebot und kein Ersatz für medizinische, psychologische oder psychiatrische Behandlung. Die KI kann Situationen falsch einschätzen. Wenn du dich unmittelbar gefährdet fühlst, kontaktiere 144 oder eine Notfallstation.",
  },
  privacy: {
    title: "Deine Privatsphäre",
    sections: [
      {
        title: "Kein Account",
        body: "Du brauchst keine Anmeldung, keine E-Mail-Adresse und keinen Namen. Wir wissen nicht, wer du bist.",
      },
      {
        title: "Gespräche werden nicht dauerhaft gespeichert",
        body: "Standardmässig bleibt dein Gespräch nur in dieser Sitzung. Wenn du es speicherst, liegt es ausschliesslich in deinem Browser – nicht auf unseren Servern. Du kannst es jederzeit löschen.",
      },
      {
        title: "Wie die KI funktioniert",
        body: "Damit die KI antworten kann, wird dein Text an einen KI-Dienst übermittelt und dort verarbeitet. Er wird nicht für Werbung genutzt und nicht mit deinem Namen verknüpft, weil wir ihn nicht kennen.",
      },
      {
        title: "Kein Tracking, keine Werbung",
        body: "Wir setzen keine Werbe- oder Tracking-Dienste ein. Deine Texte gehen nicht an Google, Meta oder andere Werbeplattformen und werden nicht verkauft.",
      },
      {
        title: "Dein Safety Plan",
        body: "Dein Safety Plan wird nur auf deinem Gerät gespeichert. Er verlässt deinen Browser nicht.",
      },
      {
        title: "Was wir nicht können",
        body: "StillHere ist kein Notfalldienst. Wir können keine Hilfe zu dir schicken und keine Behörden verständigen. Bei unmittelbarer Gefahr ruf 144 an.",
      },
      {
        title: "Keine Ende-zu-Ende-Verschlüsselung",
        body: "Die Verbindung zur Website ist verschlüsselt. Eine Ende-zu-Ende-Verschlüsselung der Gespräche gibt es nicht – wir behaupten das auch nicht.",
      },
    ],
  },
  common: {
    back: "Zurück",
    close: "Schliessen",
    optional: "optional",
  },
} as const;

export type Copy = typeof de;
