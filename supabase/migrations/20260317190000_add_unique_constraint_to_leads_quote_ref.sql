ALTER TABLE leads
ADD CONSTRAINT leads_quote_ref_unique UNIQUE (quote_ref);

