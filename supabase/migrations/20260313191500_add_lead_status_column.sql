/*
  Add status column to leads for basic pipeline tracking.
  Values: 'new', 'contacted', 'quoted', 'closed'
*/

ALTER TABLE leads
ADD COLUMN IF NOT EXISTS status text
  NOT NULL DEFAULT 'new'
  CHECK (status IN ('new', 'contacted', 'quoted', 'closed'));

CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status);

