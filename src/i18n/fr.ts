import type { Copy } from "./de";

export const fr: Copy = {
  meta: {
    locale: "fr-CH",
    name: "StillHere",
    tagline: "Tu n'as pas à tout porter seul·e en ce moment.",
  },
  nav: {
    chat: "Chat",
    safetyPlan: "Plan de sécurité",
    helpSomeone: "Être là pour quelqu'un",
    help: "Aide immédiate",
    cta: "Écrire anonymement",
    mobilePlan: "Plan",
    mobileHelp: "Aide",
    language: "Langue",
    about: "À propos de StillHere",
  },
  home: {
    heroTitle: "Tu n'as pas à tout porter seul·e en ce moment.",
    heroText:
      "Quand tout devient trop, tu peux écrire ici de manière anonyme. Sans compte, sans jugement et sans devoir expliquer pourquoi ça ne va pas.",
    primaryCta: "Écrire anonymement maintenant",
    secondaryCta: "J'ai besoin d'aide tout de suite",
    disclaimer:
      "StillHere ne remplace pas un traitement médical ou psychothérapeutique. En cas de danger immédiat : 144.",
    cards: [
      { title: "Écrire à quelqu'un", text: "Une conversation calme quand tout devient trop.", cta: "Ouvrir le chat", to: "/chat" },
      {
        title: "Plan de sécurité",
        text: "Note ce qui peut t'aider dans les moments difficiles.",
        cta: "Créer un plan de sécurité",
        to: "/safety-plan",
      },
      {
        title: "Je m'inquiète pour quelqu'un",
        text: "Une aide concrète quand une autre personne a parlé de pensées suicidaires.",
        cta: "Que puis-je faire ?",
        to: "/help-someone",
      },
    ],
  },
  chat: {
    title: "StillHere",
    subtitle: "Anonyme · sans inscription",
    aiNote: "Soutien assisté par IA",
    helpNow: "Aide immédiate",
    opening: "Salut. Tu n'as pas besoin de trouver les mots parfaits ici. Qu'est-ce qui se passe en ce moment ?",
    quickReplies: [
      "Je n'en peux plus",
      "Je me sens seul·e",
      "J'ai des pensées suicidaires",
      "Je ne sais pas par où commencer",
    ],
    inputPlaceholder: "Écris simplement …",
    send: "Envoyer",
    thinking: "StillHere écrit …",
    error:
      "La connexion n'a pas fonctionné. Tu peux réessayer. Si tu as besoin de soutien maintenant : le 143 est joignable 24 h sur 24.",
    saveLocally: "Enregistrer la conversation sur cet appareil",
    savedLocally: "La conversation est enregistrée sur cet appareil",
    saveHint:
      "Par défaut, la conversation ne dure que cette session. Si tu l'enregistres, elle reste uniquement dans ton navigateur.",
    clear: "Supprimer la conversation",
    openSafetyPlan: "Ouvrir le plan de sécurité",
    contactTrusted: "Contacter une personne de confiance",
    highTitle: "On dirait qu'il pourrait être important de ne pas rester seul·e en ce moment.",
    immediateTitle: "S'il te plaît, cherche une aide directe maintenant.",
    immediateText:
      "Si tu es en danger immédiat ou si tu t'es déjà fait du mal, appelle le 144 ou va aux urgences les plus proches.",
    stayInChat: "Je reste dans le chat",
    emergencyBar: "Si tu es en danger :",
    openOwnPlan: "Ouvrir ton plan de crise",
    formal: {
      highTitle: "Il pourrait être important de ne pas rester seul·e en ce moment.",
      immediateTitle: "S'il vous plaît, cherchez une aide directe maintenant.",
      immediateText: "Si vous êtes en danger immédiat ou si vous vous êtes déjà fait du mal, appelez le 144 ou allez aux urgences les plus proches.",
      emergencyBar: "Si vous êtes en danger :",
      openSafetyPlan: "Ouvrir le plan de sécurité",
      contactTrusted: "Contacter une personne de confiance",
      openOwnPlan: "Ouvrir votre plan de crise",
    },
    feedbackTitle: "Cette conversation t'a-t-elle aidé·e ?",
    feedbackOptions: ["Oui", "Un peu", "Non"],
    feedbackTextLabel: "Qu'est-ce qui t'aurait aidé·e davantage ?",
    feedbackSend: "Envoyer",
    feedbackThanks: "Merci d'avoir pris le temps.",
    feedbackSkip: "Pas maintenant",
  },
  crisis: {
    emergencyTitle: "Urgence médicale",
    emergencyCta: "Appeler le 144",
    crisisTitle: "La Main Tendue",
    crisisText: "Soutien anonyme 24 h sur 24.",
    crisisCta: "Contacter le 143",
    youthTitle: "Enfants et jeunes",
    youthCta: "Contacter le 147",
    call: "appeler",
    callPattern: "Appeler le {n}",
    crisisChatCta: "Ouvrir le chat 143",
    youthSmsCta: "147 par SMS",
    youthChatCta: "147 chat & WhatsApp",
    toxTitle: "Intoxication ou surdose",
    toxCta: "Appeler le 145",
    policeTitle: "Menacé·e par quelqu'un",
    policeCta: "Appeler le 117",
    writeCta: "Écrire",
    website: "Site web",
  },
  safetyPlan: {
    title: "Plan de sécurité",
    intro:
      "Un plan de sécurité est une courte note pour toi-même : ce qui t'aide et qui tu peux joindre quand ça devient difficile. Tu peux le modifier à tout moment.",
    savedNote: "Ton plan est enregistré uniquement sur cet appareil.",
    saveCta: "Enregistrer sur cet appareil",
    saved: "Enregistré",
    printCta: "Enregistrer en PDF",
    clearCta: "Supprimer le plan",
    addTag: "Ajouter",
    addPerson: "Ajouter une personne",
    addContact: "Ajouter un contact",
    name: "Nom",
    relation: "Lien",
    phone: "Numéro de téléphone",
    remove: "Retirer",
    sections: {
      warningSigns: {
        title: "À quoi je remarque que ça devient plus difficile ?",
        hint: "Par exemple :",
        examples: ["Je me replie sur moi", "Je dors à peine", "Les pensées deviennent plus fortes"],
      },
      soothing: {
        title: "Qu'est-ce qui peut me distraire ou me calmer à court terme ?",
        hint: "Par exemple :",
        examples: ["marcher", "musique", "une douche", "jeux vidéo", "sport", "animal", "regarder une série"],
      },
      people: {
        title: "Personnes que je peux contacter",
        hint: "Des personnes que tu pourrais contacter – même sans grande explication.",
      },
      professional: {
        title: "Soutien professionnel",
        hint: "Les numéros les plus importants sont déjà là. Tu peux ajouter ton médecin, ta ou ton thérapeute ou ta clinique.",
      },
      safePlaces: {
        title: "Où est-ce que je me sens plus en sécurité ?",
        hint: "Des lieux où les moments difficiles sont un peu plus supportables.",
      },
      environment: {
        title: "Rendre mon environnement plus sûr",
        hint: "Y a-t-il quelque chose autour de toi dont tu préfères t'éloigner dans les moments difficiles ?",
        handoverLabel: "Je peux l'apporter à cette personne / ce lieu",
      },
      reason: {
        title: "Une raison de traverser les prochaines heures",
        hint: "Ça n'a pas besoin d'être grand. Qu'est-ce qui pourrait être une raison de tenir encore un peu aujourd'hui ?",
      },
    },
  },
  helpSomeone: {
    title: "Tu t'inquiètes pour quelqu'un ?",
    intro:
      "C'est normal de demander directement s'il y a des pensées suicidaires. Demander ne donne l'idée à personne – ça montre que tu es là.",
    question: "La personne a-t-elle dit qu'elle voulait mettre fin à ses jours ou ne plus vivre ?",
    answers: { yes: "Oui", maybe: "Peut-être", no: "Non" },
    restart: "Recommencer",
    phrasesTitle: "Des phrases qui peuvent aider",
    phrases: [
      "« Est-ce que tu penses en ce moment à mettre fin à tes jours ? »",
      "« Est-ce que tu es en danger immédiat ? »",
      "« Je ne veux pas que tu restes seul·e avec ça maintenant. »",
    ],
    secrecy:
      "Ne promets pas de garder le secret sur des pensées suicidaires si tu penses que la personne est en danger aigu.",
    branches: {
      yes: {
        title: "Prends-le au sérieux et reste en contact.",
        steps: [
          "Demande directement et calmement si la personne est en danger maintenant.",
          "Reste auprès d'elle si le danger semble immédiat – ou organise la présence de quelqu'un.",
          "En cas de danger immédiat, appelle le 144. Tu n'as pas à décider seul·e.",
          "Aide-la à joindre un soutien professionnel : médecin, urgences ou 143.",
        ],
      },
      maybe: {
        title: "Demande – clairement et sans détour.",
        steps: [
          "Dis ce que tu as remarqué, sans juger.",
          "Demande directement : « Est-ce que tu penses à mettre fin à tes jours ? »",
          "Écoute sans chercher tout de suite des solutions.",
          "Reste joignable et reprends des nouvelles les jours suivants.",
        ],
      },
      no: {
        title: "Ton impression compte quand même.",
        steps: [
          "Parle de ce qui t'inquiète – concrètement et calmement.",
          "Demande comment la personne va vraiment et laisse de la place pour une réponse honnête.",
          "Propose un soutien concret plutôt que « dis-moi si ça ne va pas ».",
          "Si ton inquiétude reste : le 143 conseille aussi les proches.",
        ],
      },
    },
  },
  help: {
    title: "Aide immédiate",
    intro:
      "Cette page est anonyme. Tous les numéros sont joignables 24 h sur 24. Tu peux appeler ou écrire au 143 et au 147 de manière anonyme. Les appels au 144 et au 117 ne sont pas anonymes – c'est normal, pour qu'on puisse t'aider rapidement.",
    tox: { title: "Intoxication, surdose, médicaments" },
    police: { title: "Menacé·e par quelqu'un" },
    injury:
      "Blessé·e, mais sans danger de mort ? Ton médecin, une permanence médicale ou la ligne de garde médicale de ton canton peuvent t'aider. En cas de forte hémorragie ou de perte de connaissance : 144.",
    written: "Tu préfères écrire plutôt qu'appeler ?",
    emergency: { title: "Urgence médicale aiguë", number: "144" },
    talk: { title: "Parler à quelqu'un", number: "143" },
    youth: { title: "Moins de 25 ans", number: "147" },
    regional: {
      title: "Aide psychiatrique dans ma région",
      cantonLabel: "Dans quel canton es-tu ?",
      cantonPlaceholder: "Choisir un canton (facultatif)",
      placeholder:
        "Nous n'avons pas encore d'offres régionales vérifiées pour ce canton. Les numéros ci-dessus sont valables dans toute la Suisse, et chaque service d'urgences aide aussi en cas de crise psychique.",
      noLocation: "Nous ne demandons pas ta localisation.",
    },
  },
  about: {
    title: "À propos de StillHere",
    body: [
      "StillHere est une offre anonyme et accessible pour les moments où tout devient trop. Tu peux écrire sans t'inscrire et sans te justifier.",
      "StillHere n'est ni une thérapie ni un service d'urgence. La conversation est menée par une IA qui t'écoute, ralentit le moment avec toi et te met en lien avec des personnes qui peuvent t'aider.",
    ],
    disclaimer:
      "StillHere est une offre de soutien numérique et ne remplace pas un traitement médical, psychologique ou psychiatrique. L'IA peut mal évaluer une situation. Si tu te sens en danger immédiat, contacte le 144 ou un service d'urgences.",
  },
  privacy: {
    title: "Ta vie privée",
    sections: [
      { title: "Pas de compte", body: "Pas d'inscription, pas d'adresse e-mail, pas de nom. Nous ne savons pas qui tu es." },
      {
        title: "Les conversations ne sont pas conservées",
        body: "Par défaut, ta conversation ne dure que cette session. Si tu l'enregistres, elle reste uniquement dans ton navigateur – pas sur nos serveurs. Tu peux la supprimer à tout moment.",
      },
      {
        title: "Comment fonctionne l'IA",
        body: "Pour que l'IA puisse répondre, ton texte est transmis à un service d'IA et traité. Il n'est pas utilisé pour la publicité et n'est pas lié à ton nom, puisque nous ne le connaissons pas.",
      },
      {
        title: "Pas de suivi, pas de publicité",
        body: "Nous n'utilisons aucun service de publicité ou de suivi. Tes textes ne vont ni à Google, ni à Meta, ni à d'autres plateformes publicitaires et ne sont pas vendus.",
      },
      { title: "Ton plan de sécurité", body: "Ton plan de sécurité est enregistré uniquement sur ton appareil. Il ne quitte pas ton navigateur." },
      {
        title: "Ce que nous ne pouvons pas faire",
        body: "StillHere n'est pas un service d'urgence. Nous ne pouvons pas t'envoyer de l'aide ni prévenir les autorités. En cas de danger immédiat, appelle le 144.",
      },
      {
        title: "Pas de chiffrement de bout en bout",
        body: "La connexion au site est chiffrée. Il n'y a pas de chiffrement de bout en bout des conversations – et nous ne le prétendons pas.",
      },
    ],
  },
  resources: {
    "144": "En cas de danger immédiat ou si tu t'es déjà fait du mal.",
    "143": "Soutien anonyme 24 h sur 24. Téléphone et chat.",
    "147": "Pour les enfants et les jeunes jusqu'à 25 ans. Anonyme, gratuit, à tout moment. Téléphone, SMS, chat et WhatsApp.",
    "145": "En cas d'intoxication, de surdose ou de prise de médicaments, d'alcool ou de drogues. 24 h sur 24.",
    "117": "Si toi ou quelqu'un d'autre êtes menacés par une autre personne.",
  },
  common: { back: "Retour", close: "Fermer", optional: "facultatif" },
};
