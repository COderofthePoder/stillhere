CREATE TABLE public.support_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  phone TEXT,
  url TEXT,
  description TEXT NOT NULL DEFAULT '',
  canton TEXT,
  age_min INTEGER,
  age_max INTEGER,
  available_24_7 BOOLEAN NOT NULL DEFAULT true,
  language TEXT NOT NULL DEFAULT 'de',
  sort_order INTEGER NOT NULL DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.support_resources TO anon;
GRANT SELECT ON public.support_resources TO authenticated;
GRANT ALL ON public.support_resources TO service_role;
ALTER TABLE public.support_resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Support resources are public" ON public.support_resources FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.cantons (
  code TEXT NOT NULL PRIMARY KEY,
  name TEXT NOT NULL
);

GRANT SELECT ON public.cantons TO anon;
GRANT SELECT ON public.cantons TO authenticated;
GRANT ALL ON public.cantons TO service_role;
ALTER TABLE public.cantons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Cantons are public" ON public.cantons FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  rating TEXT NOT NULL,
  comment TEXT,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.feedback TO anon;
GRANT INSERT ON public.feedback TO authenticated;
GRANT ALL ON public.feedback TO service_role;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can leave feedback" ON public.feedback FOR INSERT TO anon, authenticated WITH CHECK (rating IN ('ja', 'ein_wenig', 'nein') AND (comment IS NULL OR length(comment) <= 2000));

INSERT INTO public.support_resources (slug, name, category, phone, url, description, canton, age_min, age_max, available_24_7, language, sort_order) VALUES
  ('144', 'Sanitätsnotruf', 'emergency', '144', NULL, 'Bei unmittelbarer Gefahr oder wenn du dir bereits etwas angetan hast.', NULL, NULL, NULL, true, 'de', 10),
  ('143', 'Die Dargebotene Hand', 'crisis_line', '143', 'https://www.143.ch', 'Anonyme Unterstützung rund um die Uhr. Telefon und Chat.', NULL, NULL, NULL, true, 'de', 20),
  ('147', '147 – Pro Juventute', 'youth', '147', 'https://www.147.ch', 'Für Kinder und Jugendliche bis 25. Anonym, kostenlos, jederzeit.', NULL, 0, 25, true, 'de', 30);

INSERT INTO public.cantons (code, name) VALUES
  ('AG', 'Aargau'), ('AI', 'Appenzell Innerrhoden'), ('AR', 'Appenzell Ausserrhoden'),
  ('BE', 'Bern'), ('BL', 'Basel-Landschaft'), ('BS', 'Basel-Stadt'), ('FR', 'Freiburg'),
  ('GE', 'Genf'), ('GL', 'Glarus'), ('GR', 'Graubünden'), ('JU', 'Jura'), ('LU', 'Luzern'),
  ('NE', 'Neuchâtel'), ('NW', 'Nidwalden'), ('OW', 'Obwalden'), ('SG', 'St. Gallen'),
  ('SH', 'Schaffhausen'), ('SO', 'Solothurn'), ('SZ', 'Schwyz'), ('TG', 'Thurgau'),
  ('TI', 'Tessin'), ('UR', 'Uri'), ('VD', 'Waadt'), ('VS', 'Wallis'), ('ZG', 'Zug'), ('ZH', 'Zürich');