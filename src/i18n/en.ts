import type { Copy } from "./de";

export const en: Copy = {
  meta: {
    locale: "en-CH",
    name: "StillHere",
    tagline: "You don't have to carry everything alone right now.",
  },
  nav: {
    chat: "Chat",
    safetyPlan: "Safety plan",
    helpSomeone: "Being there for someone",
    help: "Help now",
    cta: "Write anonymously",
    mobilePlan: "Plan",
    mobileHelp: "Help",
    language: "Language",
    about: "About StillHere",
  },
  home: {
    heroTitle: "You don't have to carry everything alone right now.",
    heroText:
      "When everything is too much, you can write here anonymously. No account, no judgement, and no need to explain why you're struggling.",
    primaryCta: "Write anonymously now",
    secondaryCta: "I need help right away",
    disclaimer:
      "StillHere does not replace medical or psychotherapeutic treatment. If you are in immediate danger: 144.",
    cards: [
      { title: "Write with someone", text: "A calm conversation when everything is too much.", cta: "Open chat", to: "/chat" },
      {
        title: "Safety plan",
        text: "Write down what can help you in difficult moments.",
        cta: "Create a safety plan",
        to: "/safety-plan",
      },
      {
        title: "I'm worried about someone",
        text: "Concrete help when another person has talked about suicidal thoughts.",
        cta: "What can I do?",
        to: "/help-someone",
      },
    ],
  },
  chat: {
    title: "StillHere",
    subtitle: "Anonymous · no sign-up",
    aiNote: "AI-supported",
    helpNow: "Help now",
    opening: "Hey. You don't have to put anything perfectly here. What's going on right now?",
    quickReplies: [
      "I can't go on right now",
      "I feel alone",
      "I'm having suicidal thoughts",
      "I don't know how to start",
    ],
    inputPlaceholder: "Just start writing …",
    send: "Send",
    thinking: "StillHere is writing …",
    error:
      "The connection didn't work just now. You can try again. If you need support right now: 143 is available around the clock.",
    saveLocally: "Save conversation on this device",
    savedLocally: "Conversation is being saved on this device",
    saveHint:
      "By default the conversation only lasts for this session. If you save it, it stays only in your browser.",
    clear: "Delete conversation",
    openSafetyPlan: "Open safety plan",
    contactTrusted: "Contact someone you trust",
    highTitle: "It sounds like it might be important not to be alone right now.",
    immediateTitle: "Please get direct help now.",
    immediateText:
      "If you are in immediate danger or have already hurt yourself, call 144 or go to the nearest emergency department.",
    stayInChat: "I'll stay in the chat",
    emergencyBar: "If you are in danger:",
    feedbackTitle: "Was this conversation helpful?",
    feedbackOptions: ["Yes", "A little", "No"],
    feedbackTextLabel: "What would have helped you more?",
    feedbackSend: "Send",
    feedbackThanks: "Thank you for taking the time.",
    feedbackSkip: "Not now",
  },
  crisis: {
    emergencyTitle: "Medical emergency",
    emergencyCta: "Call 144",
    crisisTitle: "Die Dargebotene Hand",
    crisisText: "Anonymous support around the clock.",
    crisisCta: "Contact 143",
    youthTitle: "Children and young people",
    youthCta: "Contact 147",
    call: "call",
    callPattern: "Call {n}",
    crisisChatCta: "Open 143 chat",
    youthSmsCta: "147 by SMS",
    youthChatCta: "147 chat & WhatsApp",
    toxTitle: "Poisoning or overdose",
    toxCta: "Call 145",
    policeTitle: "Threatened by someone",
    policeCta: "Call 117",
    writeCta: "Write",
    website: "Website",
  },
  safetyPlan: {
    title: "Safety plan",
    intro:
      "A safety plan is a short note to yourself: what helps you and who you can reach when things get hard. You can change it at any time.",
    savedNote: "Your plan is only saved on this device.",
    saveCta: "Save on this device",
    saved: "Saved",
    printCta: "Save as PDF",
    clearCta: "Delete plan",
    addTag: "Add",
    addPerson: "Add person",
    addContact: "Add contact",
    name: "Name",
    relation: "Relationship",
    phone: "Phone number",
    remove: "Remove",
    sections: {
      warningSigns: {
        title: "How do I notice things are getting harder?",
        hint: "For example:",
        examples: ["I withdraw", "I hardly sleep", "Thoughts get more intense"],
      },
      soothing: {
        title: "What can distract or calm me in the short term?",
        hint: "For example:",
        examples: ["a walk", "music", "a shower", "gaming", "exercise", "a pet", "watching a series"],
      },
      people: {
        title: "People I can contact",
        hint: "People you could reach out to – even without a long explanation.",
      },
      professional: {
        title: "Professional support",
        hint: "The most important numbers are already here. You can add your doctor, therapist or clinic.",
      },
      safePlaces: {
        title: "Where do I feel safer?",
        hint: "Places where difficult moments feel a little easier.",
      },
      environment: {
        title: "Making my surroundings safer",
        hint: "Is there anything around you that you'd rather move away from in difficult moments?",
        handoverLabel: "I can take it to this person / place",
      },
      reason: {
        title: "A reason to get through the next few hours",
        hint: "It doesn't have to be anything big. What could be a reason to hold on a little longer today?",
      },
    },
  },
  helpSomeone: {
    title: "Worried about someone?",
    intro:
      "It's okay to ask directly about suicidal thoughts. Asking doesn't put the idea in anyone's head – it shows that you're there.",
    question: "Has the person said they want to take their own life or don't want to live anymore?",
    answers: { yes: "Yes", maybe: "Maybe", no: "No" },
    restart: "Start again",
    phrasesTitle: "Sentences that can help",
    phrases: [
      "“Are you thinking about taking your life right now?”",
      "“Are you in immediate danger right now?”",
      "“I don't want you to be alone with this right now.”",
    ],
    secrecy:
      "Don't promise to keep suicidal thoughts secret if you believe the person is in acute danger.",
    branches: {
      yes: {
        title: "Take it seriously and stay in contact.",
        steps: [
          "Ask directly and calmly whether the person is in danger right now.",
          "Stay with the person if the danger seems immediate – or arrange for someone to be there.",
          "Call 144 if there is immediate danger. You don't have to decide this alone.",
          "Help them reach professional support: a GP, an emergency department or 143.",
        ],
      },
      maybe: {
        title: "Ask – clearly and directly.",
        steps: [
          "Say what you've noticed, without judging.",
          "Ask directly: “Are you thinking about taking your life right now?”",
          "Listen without rushing to solutions.",
          "Stay reachable and check in again over the next few days.",
        ],
      },
      no: {
        title: "Your impression still counts.",
        steps: [
          "Talk about what worries you – concretely and calmly.",
          "Ask how the person is really doing and leave room for an honest answer.",
          "Offer concrete support instead of just “let me know if anything comes up”.",
          "If you're still worried: 143 also advises friends and family.",
        ],
      },
    },
  },
  help: {
    title: "Help now",
    intro:
      "This page is anonymous. All numbers are available around the clock. You can call or write to 143 and 147 anonymously. Calls to 144 and 117 are not anonymous – that's okay, so help can reach you quickly.",
    tox: { title: "Poisoning, overdose, pills" },
    police: { title: "Threatened by someone" },
    injury:
      "Injured, but not life-threatening? Your GP, an urgent care practice or your canton's medical emergency line can help. For heavy bleeding or unconsciousness: 144.",
    written: "Rather write than call?",
    emergency: { title: "Acute medical emergency", number: "144" },
    talk: { title: "Talk to someone", number: "143" },
    youth: { title: "Under 25", number: "147" },
    regional: {
      title: "Psychiatric help in my region",
      cantonLabel: "Which canton are you in?",
      cantonPlaceholder: "Choose canton (optional)",
      placeholder:
        "We don't have verified regional services for this canton yet. The numbers above work across Switzerland, and every emergency department also helps with mental health crises.",
      noLocation: "We don't ask for your location.",
    },
  },
  about: {
    title: "About StillHere",
    body: [
      "StillHere is a low-threshold, anonymous service for moments when everything becomes too much. You can write without signing up and without explaining yourself.",
      "StillHere is not therapy and not an emergency service. The conversation is led by an AI that listens, slows the moment down with you and connects you with people who can help further.",
    ],
    disclaimer:
      "StillHere is a digital support service and no substitute for medical, psychological or psychiatric treatment. The AI can misjudge situations. If you feel in immediate danger, contact 144 or an emergency department.",
  },
  privacy: {
    title: "Your privacy",
    sections: [
      {
        title: "No account",
        body: "You don't need to sign up, give an email address or a name. We don't know who you are.",
      },
      {
        title: "Conversations are not stored permanently",
        body: "By default your conversation only lasts for this session. If you save it, it stays only in your browser – not on our servers. You can delete it at any time.",
      },
      {
        title: "How the AI works",
        body: "So the AI can reply, your text is sent to an AI service and processed there. It isn't used for advertising and isn't linked to your name, because we don't know it.",
      },
      {
        title: "No tracking, no advertising",
        body: "We don't use advertising or tracking services. Your texts don't go to Google, Meta or other advertising platforms and aren't sold.",
      },
      {
        title: "Your safety plan",
        body: "Your safety plan is only stored on your device. It doesn't leave your browser.",
      },
      {
        title: "What we can't do",
        body: "StillHere is not an emergency service. We can't send help to you or notify authorities. If you're in immediate danger, call 144.",
      },
      {
        title: "No end-to-end encryption",
        body: "The connection to the website is encrypted. There is no end-to-end encryption of conversations – and we don't claim there is.",
      },
    ],
  },
  resources: {
    "144": "If you're in immediate danger or have already hurt yourself.",
    "143": "Anonymous support around the clock. Phone and chat.",
    "147": "For children and young people up to 25. Anonymous, free, any time. Phone, SMS, chat and WhatsApp.",
    "145": "For poisoning, overdose or taking medication, alcohol or drugs. Around the clock.",
    "117": "If you or someone else is being threatened by another person.",
  },
  common: { back: "Back", close: "Close", optional: "optional" },
};
