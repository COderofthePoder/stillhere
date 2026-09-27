import { useState } from "react";

import { Button } from "@/components/ui/action-button";
import { useCopy } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";

const RATING_VALUES = ["ja", "ein_wenig", "nein"] as const;

/** Optional, never required. Only the rating, an optional note and an
 * anonymous session id are sent – no conversation content. */
export function Feedback({ sessionId, onDone }: { sessionId: string; onDone: () => void }) {
  const copy = useCopy();
  const [rating, setRating] = useState<(typeof RATING_VALUES)[number] | null>(null);
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!rating) return;
    setBusy(true);
    const { error } = await supabase.from("feedback").insert({
      rating,
      comment: comment.trim() === "" ? null : comment.trim().slice(0, 2000),
      session_id: sessionId,
    });
    if (error) console.error("feedback could not be saved", error);
    setBusy(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="card-surface mx-auto w-full max-w-2xl p-5 text-base text-muted-foreground">
        {copy.chat.feedbackThanks}
      </div>
    );
  }

  return (
    <div className="card-surface mx-auto w-full max-w-2xl p-5">
      <p className="text-base text-foreground">{copy.chat.feedbackTitle}</p>
      <div className="mt-4 flex flex-wrap gap-3">
        {copy.chat.feedbackOptions.map((label, index) => {
          const value = RATING_VALUES[index]!;
          return (
            <Button
              key={label}
              size="sm"
              variant={rating === value ? "primary" : "secondary"}
              aria-pressed={rating === value}
              onClick={() => setRating(value)}
            >
              {label}
            </Button>
          );
        })}
        <button
          type="button"
          onClick={onDone}
          className="ml-auto min-h-11 rounded-md px-2 text-base text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          {copy.chat.feedbackSkip}
        </button>
      </div>

      {rating ? (
        <div className="fade-in-soft mt-4">
          <label className="text-base text-muted-foreground" htmlFor="feedback-comment">
            {copy.chat.feedbackTextLabel} <span className="text-sm">({copy.common.optional})</span>
          </label>
          <textarea
            id="feedback-comment"
            rows={2}
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            className="mt-2 w-full rounded-lg border border-input bg-background p-3 text-base text-foreground"
          />
          <Button size="sm" className="mt-3" onClick={submit} disabled={busy}>
            {copy.chat.feedbackSend}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
