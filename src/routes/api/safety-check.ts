import { createFileRoute } from "@tanstack/react-router";

/**
 * Safety layer endpoint: { latestMessage, recentContext } -> { level, confidence, triggers }.
 * The level is internal and never labelled to the user.
 */
export const Route = createFileRoute("/api/safety-check")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: { latestMessage?: unknown; recentContext?: unknown };
        try {
          body = (await request.json()) as typeof body;
        } catch {
          return Response.json({ error: "Invalid JSON body" }, { status: 400 });
        }

        if (typeof body.latestMessage !== "string" || body.latestMessage.trim() === "") {
          return Response.json({ error: "latestMessage is required" }, { status: 400 });
        }

        const recentContext = Array.isArray(body.recentContext)
          ? body.recentContext.filter((entry): entry is string => typeof entry === "string")
          : [];

        const { analyzeSafety } = await import("@/lib/safety/analyze.server");
        const assessment = await analyzeSafety(body.latestMessage.slice(0, 4000), recentContext);

        return Response.json(assessment, { headers: { "Cache-Control": "no-store" } });
      },
    },
  },
});
