# StillHere — Swiss suicide-prevention MVP

A calm, anonymous, German-language web app: quiet off-white surfaces, muted deep blue-green accents, red reserved strictly for emergency actions, generous whitespace, 16px+ body text, 17-18px chat text, WCAG AA contrast and visible focus states. No account, mobile-first.

## Pages

- **/** — near-empty hero: "Du musst gerade nicht alles alleine tragen.", subcopy, large "Jetzt anonym schreiben", quieter "Ich brauche sofort Hilfe". Below: three cards (Mit jemandem schreiben, Safety Plan, Ich mache mir Sorgen um jemanden). One discreet line about limits and 144.
- **/chat** — the centre of the product. Top bar: StillHere, "Anonym · keine Registrierung", "KI-gestützte Unterstützung", and a "Hilfe jetzt" action. Opening message plus four quick replies; free text always available. Streaming replies, stable layout, input stays visible when the phone keyboard opens. Optional "Gespräch auf diesem Gerät speichern"; otherwise session-only. After a while, optional feedback (Ja / Ein wenig / Nein + free text).
- **/safety-plan** — seven sections per the brief, tag chips plus free text, contact list with Person hinzufügen, prefilled Swiss services, careful neutral wording in the environment section, saved on the device.
- **/help-someone** — branching guide from "Hat die Person gesagt…" (Ja / Vielleicht / Nein), sample phrases, explicit note about not promising secrecy.
- **/help** — four large one-thumb options (144, 143, 147, regional) plus optional canton dropdown, no GPS.
- **/about**, **/privacy** — plain-German disclaimer and privacy explanation.

Navigation: desktop top nav plus "Anonym schreiben"; mobile bottom bar (Chat, Plan, Hilfe) with help always reachable.

## Safety behaviour

Every user message goes through a safety check that is separate from the conversation, returning LOW / ELEVATED / HIGH / IMMEDIATE. The level is never shown as a label; it only changes the UI:

- LOW — normal supportive conversation, gentle offers (grounding, breathing, reaching out, safety plan).
- ELEVATED — more direct wording plus an optional "Safety Plan öffnen".
- HIGH — a calm persistent support card above the chat with 143, Vertrauensperson, Safety Plan; conversation continues.
- IMMEDIATE — a clear emergency card ("Bitte hol dir jetzt direkte Hilfe.") with 144, 143, 147 and "Ich bleibe im Chat". Never locks the user out, never repeats itself.

The assistant follows the brief's rules: calm, short, one question at a time, never claims to understand perfectly or promises everything will be fine, never gives method-related information, always identified as AI. No suicide-related imagery, timers, urgency animation or gamification anywhere.

## Backend

A secure backend holds the Swiss contact list (with canton, age range, availability, language, seeded with 144/143/147) and anonymous feedback. Chat content is never stored server-side; transcripts stay in the browser only if the user chooses to save them. No advertising trackers.

## Technical notes

- TanStack Start routes for each page; shared layout in `__root.tsx`, per-route head metadata.
- Design tokens (off-white background, muted blue-green primary, muted red destructive, 16px radius) in `src/styles.css`; Inter loaded via a link tag in the root head. All colours via semantic tokens.
- `src/config/support-resources.ts` plus the database table as the single source for numbers and URLs; components never hardcode them.
- German copy in `src/i18n/de.ts` keyed for later fr/it/en; a small `useT()` reader so no strings live inline.
- Server functions `sendChatMessage` (streaming) and `analyzeSafety` in `src/lib/chat.functions.ts`, wrapping the Lovable AI Gateway with the system prompt from the brief; the key stays server-side. `analyzeSafety` is a swappable module so a specialist classifier can replace it later.
- Lovable Cloud enabled with tables `support_resources`, `cantons`, `feedback` (RLS: public read for resources/cantons, insert-only anonymous feedback), seeded with the three national services and all 26 cantons.
- Safety plan and optional chat history in localStorage behind one storage module.
