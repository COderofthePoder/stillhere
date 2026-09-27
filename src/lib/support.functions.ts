import { createServerFn } from "@tanstack/react-start";

import type { SupportResource } from "@/config/support-resources";

type Row = {
  slug: string;
  name: string;
  category: string;
  phone: string | null;
  url: string | null;
  description: string | null;
  canton: string | null;
  age_min: number | null;
  age_max: number | null;
  available_24_7: boolean;
  language: string;
};

function createPublicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const url = process.env["SUPABASE_URL"]!;
  return { key, url };
}

/**
 * Public, read-only list of support resources. Backed by the database so the
 * numbers and regional offers can be maintained without a code change; the
 * shared config stays as the offline fallback.
 */
export const listSupportResources = createServerFn({ method: "GET" }).handler(async () => {
  const { createClient } = await import("@supabase/supabase-js");
  const { url, key } = createPublicClient();

  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });

  const { data, error } = await supabase
    .from("support_resources")
    .select("slug, name, category, phone, url, description, canton, age_min, age_max, available_24_7, language")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("could not load support resources", error);
    return [] as SupportResource[];
  }

  return ((data ?? []) as Row[]).map<SupportResource>((row) => ({
    id: row.slug,
    name: row.name,
    category: row.category as SupportResource["category"],
    phone: row.phone,
    url: row.url,
    description: row.description ?? "",
    canton: row.canton,
    ageMin: row.age_min,
    ageMax: row.age_max,
    available247: row.available_24_7,
    language: row.language,
  }));
});
