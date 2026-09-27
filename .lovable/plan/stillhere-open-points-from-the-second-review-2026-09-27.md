# StillHere: open points from the second review

## 1. "Sie" only when the person addresses the chat as "Sie"
- Right now any "sie/ihr" in a message counts as formal. That includes "sie haben ein Video von mir gepostet", where "sie" means other people.
- New rule: use "Sie" only for a clear direct address. That means "Ihnen" or "Ihr/Ihre" aimed at the chat, "Können/Könnten Sie", or "Sie" with a capital letter in the middle of a sentence. The classifier gets the same rule.
- When in doubt, use "du", the site's default. Once the chat has chosen "Sie" or "du", it keeps it for the conversation, so it doesn't switch back and forth.

## 2. Crisis cards match the person
- **Tone:** each card has a "du" version and a "Sie" version, in all four languages. The card uses the same form as the reply.
- **Age:** a new internal signal, "young" (up to 25), comes from school, parents, the age someone states, or youth language. 147, including 147 by SMS, only shows when it's likely the person is young. For a young person, 147 comes first and 143 second. For adults and older people, 147 isn't shown and 143 comes first.
- **145 only for poisoning:** a new internal signal says whether the method is pills, a substance or poison. 145 only shows on the red card, the slim bar and in the reply when that's the case. With a rope or a gun there's no 145.
- **The red card can calm down:** the red level no longer stays for the whole conversation. When the next assessment says the danger has eased (the wound barely bleeds, help is there, the means are put away), the slim 144 bar goes away after two calm assessments in a row. If the level rises again, the red card comes back. When the danger has eased, the reply still mentions once that 144 is always there.

## 3. Use the person's own crisis plan and therapist
- If the person mentions a therapist or their own crisis plan, and there's no acute danger with a time or means, the chat first asks about those. For example: "Was steht in deinem Plan für solche Tage?" or "Weiss deine Therapeutin, dass heute sein Geburtstag ist?". It offers to go through the plan together.
- 144 stays first as soon as there is intent together with a time or means.
- For chronic suicidal thoughts at the HIGH level, the support card shows "Deinen Krisenplan öffnen" first and the phone numbers after it.

## 4. Short goodbyes
- When someone is about to leave ("ich geh off", "bye", "muss los"), the reply is one short sentence. At higher levels it's one sentence plus a number, for example: "Danke, dass du geschrieben hast – 147 ist auch nachts da."

## Technical details
- `levels.ts`: replace the `formal` regex with direct-address patterns (Sie + modal verb, capitalised mid-sentence "Sie", "Ihnen", "Ihr"), and default to false. Add signals `young`, `ingestion`, `leaving`, and `deescalated` (the heuristic plus the classifier). Keep IMMEDIATE only when intent + (plan/means) + (time/means) is present in the latest message and its recent context, and nothing says it has eased.
- `prompts.ts`: add the signals to the classifier schema and add the direct-address rule to its prompt. Make the IMMEDIATE guidance mention 145 only if `ingestion`. Add directives for crisis plan first, goodbyes and formality.
- `api/chat.ts`: `suggestedActionsFor(level, signals)`. Add response headers `X-Formal`, `X-Young`, `X-Ingestion` and `X-Deescalated`, and expose them.
- `chat.tsx`: lock formality after the first decision. Track calm assessments in a row and hide the EmergencyBar after 2. Show the red card again when the level rises. Pass the flags to the cards.
- `SafetyBanners.tsx`: take `formal`, `young`, `ingestion` and `hasPlan` props. The order and which buttons show come from these flags. The copy uses `copy.chat.*` and `copy.chat.formal.*` variants.
- i18n: add formal card strings to `de/fr/it/en` (with the `Copy` type updated in `de.ts`).
- Verification in Playwright: the 14-year-old's video message (du, 147 first, no 145), a 78-year-old writing "Sie" (Sie card, no 147), rope versus pills (145 only with pills), a bleeding wound that eases (the bar goes away), the therapist and anniversary persona (asks about the plan), and "ich geh off" (one sentence).
