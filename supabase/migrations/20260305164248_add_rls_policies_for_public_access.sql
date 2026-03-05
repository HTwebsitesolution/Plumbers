/*
  # Add RLS Policies for Public Access

  1. Security Policies
    - Allow public insert on `leads` table for quote submissions
    - Allow public insert on `servicing_requests` table for servicing bookings
    - Allow public insert on `repairs_requests` table for repair requests
    - Allow service role to read all data for admin access
  
  2. Notes
    - These tables store customer submissions and need to be writable by anonymous users
    - Only the service role (used by API routes) can read the data
    - This ensures customers can submit forms while keeping data secure
*/

-- Policies for leads table
CREATE POLICY "Allow public insert for quote submissions"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow service role to read all leads"
  ON leads
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Allow service role to update leads"
  ON leads
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policies for servicing_requests table
CREATE POLICY "Allow public insert for servicing bookings"
  ON servicing_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow service role to read all servicing requests"
  ON servicing_requests
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Allow service role to update servicing requests"
  ON servicing_requests
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Policies for repairs_requests table
CREATE POLICY "Allow public insert for repair requests"
  ON repairs_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow service role to read all repair requests"
  ON repairs_requests
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Allow service role to update repair requests"
  ON repairs_requests
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);
