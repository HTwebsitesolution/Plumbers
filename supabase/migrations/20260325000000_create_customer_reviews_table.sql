-- Customer reviews submitted from the public website (/reviews)
-- Stores ratings + review text, then public page shows approved reviews.

CREATE TABLE IF NOT EXISTS customer_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rating smallint NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text NOT NULL,
  customer_name text,
  request_type text,
  ref_code text,
  status text NOT NULL DEFAULT 'approved' CHECK (status IN ('approved', 'pending')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE customer_reviews ENABLE ROW LEVEL SECURITY;

-- Public: anyone can submit a review (service-grade anti-spam would be added later).
CREATE POLICY "Allow public insert customer reviews"
  ON customer_reviews
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- API routes: allow service role to insert.
CREATE POLICY "Allow service role to insert customer reviews"
  ON customer_reviews
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Public: only approved reviews are readable.
CREATE POLICY "Allow public read approved customer reviews"
  ON customer_reviews
  FOR SELECT
  TO anon
  USING (status = 'approved');

-- API/Admin: service role can read everything.
CREATE POLICY "Allow service role to read customer reviews"
  ON customer_reviews
  FOR SELECT
  TO service_role
  USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS customer_reviews_created_at_idx
  ON customer_reviews (created_at DESC);

