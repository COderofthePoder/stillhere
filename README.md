# StillHere

An anonymous, low-threshold suicide-prevention web app for Switzerland, in German, French, Italian and English.

> **Status: early MVP.** StillHere is not clinically validated and does not replace medical or psychotherapeutic treatment. If you are in immediate danger in Switzerland, call **144**. You can reach Die Dargebotene Hand at **143** and Pro Juventute (up to age 25) at **147**, around the clock.

## What it does

- **Chat** (`/chat`): an anonymous, AI-supported conversation. No account. The assistant is always identified as AI and never gives method-related information.
- **Safety plan** (`/safety-plan`): a personal crisis plan in seven sections, stored only on the device.
- **Being there for someone** (`/help-someone`): a guide for people who are worried about another person.
- **Help now** (`/help`): national services (144, 143, 147, 145, 117) and regional contacts by canton, without GPS.

## Safety design

Every user message goes through a safety check that is separate from the conversation. It returns one of four levels (low, elevated, high, immediate). The level is never shown as a label; it only changes the interface:

- **Low:** normal supportive conversation.
- **Elevated:** more direct wording and an offer to open the safety plan.
- **High:** a persistent support card above the chat with 143, a trusted person and the safety plan.
- **Immediate:** a clear emergency card with 144, 143 and 147. The chat stays open; the user is never locked out.

The check lives in `src/lib/safety/` and is built as a swappable module, so a specialist classifier can replace it.

## Privacy

- No account and no advertising trackers.
- Chat content is not stored server-side. A transcript stays in the browser only if the user chooses to save it.
- The backend holds the list of support services and anonymous feedback (a rating and an optional comment).

## Tech stack

TanStack Start, React, TypeScript, Tailwind CSS, Supabase (Postgres with row-level security), and an AI gateway for the chat and the safety check.

## Development

```sh
git clone https://github.com/COderofthePoder/stillhere.git
cd stillhere
npm install
npm run dev
```

The `.env` file contains the public Supabase URL and publishable key. Server-side features additionally need these environment variables, which are not in the repository:

- `SUPABASE_SERVICE_ROLE_KEY`
- `LOVABLE_API_KEY` (AI gateway)

Database schema and seed data are in `supabase/migrations/`.

## Open work

- Vetted regional contacts for the remaining 23 cantons (currently only Zurich, Bern and Basel-Stadt).
- Native-speaker review of the French, Italian and English texts.
- Review of the prompts and the safety logic by suicide-prevention professionals.

Contributions and corrections are welcome, especially from people who work in crisis support. Please open an issue.

## License

[MIT](LICENSE)
