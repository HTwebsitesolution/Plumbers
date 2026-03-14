/*
  # Add RLS policies: allow service_role to INSERT
  The API routes use the service role key to insert leads, servicing_requests, and repairs_requests.
  Without these policies, inserts are denied and you get "Failed to save lead" (500).
*/

-- Leads: allow service_role to insert (used by POST /api/lead)
CREATE POLICY "Allow service role to insert leads"
  ON leads
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Servicing: allow service_role to insert (used by POST /api/servicing)
CREATE POLICY "Allow service role to insert servicing requests"
  ON servicing_requests
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Repairs: allow service_role to insert (used by POST /api/repairs)
CREATE POLICY "Allow service role to insert repair requests"
  ON repairs_requests
  FOR INSERT
  TO service_role
  WITH CHECK (true);
