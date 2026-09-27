import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

import { Feedback } from "@/components/chat/Feedback";
import {
  HighSupportCard,
  ImmediateSupportCard,
  SafetyPlanNudge,
} from "@/components/chat/SafetyBanners";
import { Button, buttonClasses } from "@/components/ui/action-button";
import { useCopy } from "@/i18n";
import { readLocal, removeLocal, STORAGE_KEYS, writeLocal } from "@/lib/local-storage";
import { atLeast, type SafetyLevel } from "@/lib/safety/levels";
import { newId } from "@/lib/safety-plan";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "Anonym schreiben – StillHere" },
      {
        name: "description",
        content:
          "Schreib anonym und ohne Account über das, was gerade zu viel ist. KI-gestützte Unterstützung, rund um die Uhr.",
      },
      { property: "og:title", content: "Anonym schreiben – StillHere" },
      { property: "og:description", content: "Ein ruhiges Gespräch, ohne Account und ohne Bewertung." },
      { name: "twitter:title", content: "Anonym schreiben – StillHere" },
      { name: "twitter:description", content: "Ein ruhiges Gespräch, ohne Account und ohne Bewertung." },
    ],
  }),
  component: ChatPage,
});

type ChatMessage = { id: string; role: "user" | "assistant"; content: string };

function ChatPage() {
  const copy = useCopy();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [failed, setFailed] = useState(false);
  const [level, setLevel] = useState<SafetyLevel>("LOW");
  const [showHigh, setShowHigh] = useState(false);
  const [showImmediate, setShowImmediate] = useState(false);
  const [immediateShown, setImmediateShown] = useState(false);
  const [persist, setPersist] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackDone, setFeedbackDone] = useState(false);
  const sessionId = useMemo(() => newId() + newId(), []);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Restore only when the person explicitly asked for it on this device.
  useEffect(() => {
    const optIn = readLocal<boolean>(STORAGE_KEYS.chatOptIn) ?? false;
    setPersist(optIn);
    if (optIn) {
      const stored = readLocal<ChatMessage[]>(STORAGE_KEYS.chat);
      if (stored && stored.length > 0) setMessages(stored);
    }
  }, []);

  useEffect(() => {
    if (persist) writeLocal(STORAGE_KEYS.chat, messages);
  }, [persist, messages]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [messages, streaming, showHigh, showImmediate]);

  const userTurns = messages.filter((message) => message.role === "user").length;

  useEffect(() => {
    if (!feedbackDone && userTurns >= 6 && !streaming && level === "LOW") setShowFeedback(true);
  }, [userTurns, streaming, level, feedbackDone]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;

      setFailed(false);
      setInput("");
      const history = [...messages, { id: newId(), role: "user" as const, content: trimmed }];
      setMessages(history);
      setStreaming(true);

      const assistantId = newId();
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history.map(({ role, content }) => ({ role, content })),
            locale: "de",
          }),
        });

        if (!response.ok || !response.body) throw new Error(`chat failed: ${response.status}`);

        const nextLevel = (response.headers.get("X-Safety-Level") as SafetyLevel | null) ?? "LOW";
        setLevel(nextLevel);
        if (nextLevel === "IMMEDIATE" && !immediateShown) {
          setShowImmediate(true);
          setImmediateShown(true);
        }
        if (atLeast(nextLevel, "HIGH")) setShowHigh(true);

        setMessages((current) => [...current, { id: assistantId, role: "assistant", content: "" }]);

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setMessages((current) =>
            current.map((message) => (message.id === assistantId ? { ...message, content: acc } : message)),
          );
        }
        if (acc.trim() === "") throw new Error("empty response");
      } catch (error) {
        console.error(error);
        setFailed(true);
        setMessages((current) => current.filter((message) => message.id !== assistantId));
      } finally {
        setStreaming(false);
        inputRef.current?.focus();
      }
    },
    [messages, streaming, immediateShown],
  );

  const togglePersist = () => {
    const next = !persist;
    setPersist(next);
    writeLocal(STORAGE_KEYS.chatOptIn, next);
    if (next) writeLocal(STORAGE_KEYS.chat, messages);
    else removeLocal(STORAGE_KEYS.chat);
  };

  const clearChat = () => {
    setMessages([]);
    setLevel("LOW");
    setShowHigh(false);
    setShowImmediate(false);
    setImmediateShown(false);
    setShowFeedback(false);
    removeLocal(STORAGE_KEYS.chat);
  };

  return (
    <div className="flex h-[100dvh] flex-col bg-background">
      <header className="shrink-0 border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl items-center gap-3 px-4 py-3">
          <Link to="/" className="min-w-0">
            <span className="block truncate text-base font-semibold text-foreground">{copy.chat.title}</span>
            <span className="block truncate text-sm text-muted-foreground">
              {copy.chat.subtitle} · {copy.chat.aiNote}
            </span>
          </Link>
          <Link to="/help" className={buttonClasses("urgentQuiet", "sm", "ml-auto shrink-0")}>
            {copy.chat.helpNow}
          </Link>
        </div>
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto w-full max-w-2xl space-y-4">
          <div className="card-surface p-5 text-lg leading-relaxed text-foreground">{copy.chat.opening}</div>

          {messages.map((message) => (
            <div
              key={message.id}
              className={
                message.role === "user"
                  ? "ml-auto w-fit max-w-[85%] rounded-2xl bg-primary-soft px-5 py-3 text-lg leading-relaxed text-foreground"
                  : "w-fit max-w-[95%] rounded-2xl bg-card px-5 py-3 text-lg leading-relaxed text-foreground shadow-sm"
              }
            >
              {message.role === "assistant" ? (
                <div className="prose-chat space-y-3">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>
              ) : (
                message.content
              )}
            </div>
          ))}

          {streaming ? <p className="text-base text-muted-foreground">{copy.chat.thinking}</p> : null}
          {failed ? (
            <div className="rounded-xl border border-destructive/25 bg-destructive-soft p-5 text-base text-foreground">
              {copy.chat.error}
            </div>
          ) : null}

          {messages.length === 0 ? (
            <ul className="flex flex-wrap gap-2 pt-2">
              {copy.chat.quickReplies.map((reply) => (
                <li key={reply}>
                  <Button variant="secondary" size="sm" onClick={() => send(reply)}>
                    {reply}
                  </Button>
                </li>
              ))}
            </ul>
          ) : null}

          {level === "ELEVATED" ? <SafetyPlanNudge /> : null}
          {showFeedback && !feedbackDone ? (
            <Feedback
              sessionId={sessionId}
              onDone={() => {
                setShowFeedback(false);
                setFeedbackDone(true);
              }}
            />
          ) : null}

          <div ref={endRef} />
        </div>
      </main>

      <footer className="shrink-0 border-t border-border bg-card/80 px-4 pb-[env(safe-area-inset-bottom)] pt-3 backdrop-blur">
        {showImmediate ? <ImmediateSupportCard onStay={() => setShowImmediate(false)} /> : null}
        {showHigh && !showImmediate ? <HighSupportCard onDismiss={() => setShowHigh(false)} /> : null}

        <form
          className="mx-auto flex w-full max-w-2xl items-end gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            void send(input);
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                void send(input);
              }
            }}
            rows={1}
            placeholder={copy.chat.inputPlaceholder}
            aria-label={copy.chat.inputPlaceholder}
            className="max-h-40 min-h-12 flex-1 resize-none rounded-xl border border-input bg-background px-4 py-3 text-lg text-foreground"
          />
          <Button type="submit" disabled={streaming || input.trim() === ""}>
            {copy.chat.send}
          </Button>
        </form>

        <div className="mx-auto mt-2 flex w-full max-w-2xl flex-wrap items-center gap-x-4 gap-y-1 pb-3">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input type="checkbox" checked={persist} onChange={togglePersist} className="size-4" />
            {persist ? copy.chat.savedLocally : copy.chat.saveLocally}
          </label>
          {messages.length > 0 ? (
            <button
              type="button"
              onClick={clearChat}
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              {copy.chat.clear}
            </button>
          ) : null}
          <span className="w-full text-sm text-muted-foreground">{copy.chat.saveHint}</span>
        </div>
      </footer>
    </div>
  );
}
