# StillHere: fixes from the persona review

Ordered by risk, most important first.

## 1. Reply in the person's language
- The chat detects the language of each message (de/fr/it/en) and replies in it. When someone writes "I don't speak German", it switches straight away.
- The site gets full French, Italian and English copy. A language switcher goes in the header and the chat's top bar. The choice is saved on the device only.
- Crisis cards, quick replies and the help page follow the chosen language.

## 2. The crisis card matches the risk
- A plan plus intent plus a time or method ("pills saved, tonight") always shows the red 144 card, never the mild 143 one. This is the top C-SSRS level.
- The card and the reply come from the same assessment, so they can no longer disagree.
- At this level the 144 card cannot be closed completely. It shrinks to a slim 144 bar that stays visible, and the conversation goes on.

## 3. Chronic suicidality and working with the person
- New internal signals: past loss to suicide, anniversaries, an existing therapist or crisis plan, and chronic suicidal thoughts. Mentioning a loss to suicide raises the risk level. "I'm safe" alone no longer lowers it.
- Instructions for the chat, following CAMS and DBT:
  - Don't argue or correct.
  - Ask about intent, timing and access to means before escalating.
  - Refer to the person's own therapist and crisis plan first.
  - Go straight to 144 only when there is intent together with a time or means.
- If the person asks for no numbers, the chat respects that. Below the red level the support card becomes a quiet "Hilfe" link. At the red level 144 stays.

## 4. Engage with the actual problem
- The chat takes up the concrete problem: a video, visa or job loss, a breakup.
- For young people the chat can suggest reporting content to the platform, contacting school social work and 147. It can also say that sharing some videos may be a criminal offence. It won't just say "tell an adult".
- For money, work or residence worries it points to fitting next steps in general terms, without legal advice.

## 5. Use ambivalence
- When someone says "I just wanted to tell someone" or wants to say goodbye, the chat recognises the part of them that reached out. It gently explores reasons to live and does not only give directions.

## 6. Match the person's tone
- The chat mirrors "Sie" or "du" (and vous/tu, Lei/tu). It keeps a calm, respectful tone that also suits older men.

## 7. More ways to get help, including written ones
- New contacts: 145 Tox Info Suisse (poisoning and overdose) and 117 police.
- For medical help after self-harm that isn't life-threatening, the page will point to the family doctor or the cantonal medical hotline. Where no single verified national number exists, it links to the canton-level resources instead of inventing one.
- Written options: the chat at 143.ch, and 147 by SMS, WhatsApp and chat. They get separate "Schreiben" buttons next to the "Anrufen" buttons, in the chat cards and on the help page.

## 8. Help page corrections
- Remove "Alles hier ist anonym". The new text: the app is anonymous, but a call to 144 or 117 is not, and that's fine.
- Fill in the regional section for all 26 cantons with verified cantonal crisis and psychiatric emergency services, each with its source. Cantons without a verified entry show the national numbers, not a placeholder.

## Technical details
- i18n: add `fr.ts`, `it.ts` and `en.ts` next to `de.ts`. `useCopy()` reads the locale from a small device-stored preference, with the browser language as a fallback.
- `/api/chat`: accept `locale`. The server detects the message language and tells the model which language to answer in. Add `formality` and `noNumbers` preferences, taken from the conversation.
- Safety: extend the classifier JSON with `plan`, `intent`, `timeframe`, `means`, `lossToSuicide`, `chronic`, `hasTherapist`, `declinesNumbers`. A plan plus intent plus a time or means maps to IMMEDIATE, both in the classifier and in `heuristicSafety`. Add fr/it/en heuristic patterns. The heuristic can still only raise the level, never lower it.
- Pass the structured flags to the prompt so the reply and the card share one assessment. Rewrite `SYSTEM_PROMPT` and `LEVEL_GUIDANCE` with the CAMS/DBT, ambivalence, problem-focus and tone rules.
- `support-resources.ts` and the `support_resources` table get new entries (145, 117, written channels as `url`/`sms` fields). A migration adds a `channel` column and seeds the cantonal rows.
- `SafetyBanners`: the IMMEDIATE card collapses to a sticky bar instead of hiding. The HIGH card follows `declinesNumbers`.
- Verification: rerun personas 2 and 7, an English speaker, a teen and a "Sie" writer in Playwright, checking the card level, the reply language and the tone.
