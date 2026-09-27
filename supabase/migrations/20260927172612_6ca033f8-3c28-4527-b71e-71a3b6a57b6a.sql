ALTER TABLE public.support_resources ADD COLUMN IF NOT EXISTS sms text, ADD COLUMN IF NOT EXISTS chat_url text;
UPDATE public.support_resources SET chat_url = 'https://www.143.ch' WHERE slug = '143';
UPDATE public.support_resources SET sms = '147', chat_url = 'https://www.147.ch' WHERE slug = '147';
INSERT INTO public.support_resources (slug, name, category, phone, url, description, canton, available_24_7, language, sort_order) VALUES
('145','Tox Info Suisse','emergency','145','https://www.toxinfo.ch','Bei Vergiftung, Überdosis oder Einnahme von Medikamenten, Alkohol oder Drogen. Rund um die Uhr.',NULL,true,'de',15),
('117','Polizei','emergency','117',NULL,'Wenn du oder jemand anderes durch eine andere Person bedroht wird.',NULL,true,'de',16),
('zh-aerztefon','Ärztefon Zürich','regional','0800 33 66 55','https://www.aerztefon.ch','Ärztliche Beratung und Vermittlung von Notfalldiensten im Kanton Zürich, auch bei Verletzungen.', 'ZH',true,'de',200),
('be-medphone','MEDPHONE Bern','regional','0900 57 67 47','https://www.medphone.ch','Ärztlicher Notfalldienst im Kanton Bern (kostenpflichtig).', 'BE',true,'de',200),
('bs-mnz','Medizinische Notrufzentrale Basel','regional','061 261 15 15',NULL,'Vermittlung ärztlicher Notfalldienste in Basel.', 'BS',true,'de',200)
ON CONFLICT (slug) DO NOTHING;