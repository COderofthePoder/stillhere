<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## StillHere conventions

- All user-facing copy goes through `src/i18n` (`useCopy()`); no literal strings in components, so fr/it/en can be added as sibling locale files.
- Crisis phone numbers and support offers come only from `src/config/support-resources.ts` (offline default) or the `support_resources` table via `src/lib/support.functions.ts`; never hardcode a number in a component.
- The safety level (`LOW`/`ELEVATED`/`HIGH`/`IMMEDIATE`) lives in `src/lib/safety/`; it steers UI and tone but is never shown or labelled to the user. `heuristicSafety` is a floor that can only raise the classifier's level.
- Chat is never stored server-side. Anything persisted goes through `src/lib/local-storage.ts` (device only).
- Shared buttons live in `src/components/ui/action-button.tsx` (the shadcn `button.tsx` stays untouched to avoid a filename-casing clash).
- Locale lives in `LocaleProvider` (src/i18n/index.ts, device-stored); `de.ts` defines the `Copy` shape, fr/it/en must match it. Why: one type keeps all four languages complete.
- The safety classifier returns structured `SafetySignals`; `levelFromSignals` (intent + plan/means + time/means → IMMEDIATE) is a floor like `heuristicSafety`. Why: the card and the reply come from one assessment.
- `/api/chat` returns `X-Reply-Language` and `X-Declines-Numbers`; the chat UI follows them. Why: reply in the person's language and respect a no-numbers wish.
