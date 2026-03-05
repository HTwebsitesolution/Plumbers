/*
  # Create servicing_requests table

  ## Overview
  This migration creates the `servicing_requests` table to store all boiler servicing bookings
  submitted through the /servicing/book flow.

  ## New Tables

  ### `servicing_requests`
  Stores all servicing request information:

  **Request Information:**
  - `id` (uuid, primary key) - Unique identifier for each request
  - `service_ref` (text, unique) - Human-readable reference (e.g., SERV-20260305-A1B2)
  - `request_type` (text) - Type: "servicing" or "out_of_area_enquiry"
  - `service` (text) - Service type: "servicing"
  - `submitted_at` (timestamptz) - When the request was submitted

  **Location:**
  - `postcode` (text) - UK postcode
  - `outward_code` (text, optional) - Extracted outward code (e.g., DN22)
  - `coverage_status` (text, optional) - Coverage: "in_area" or "out_of_area"

  **Boiler Details:**
  - `fuel_type` (text, optional) - Gas/LPG/Oil
  - `boiler_type` (text, optional) - Combi/System/Regular/Not sure
  - `boiler_make` (text, optional) - Manufacturer
  - `boiler_model` (text, optional) - Model
  - `last_serviced` (text, optional) - When last serviced

  **Customer Details:**
  - `customer_name` (text) - Full name
  - `customer_email` (text) - Email address
  - `customer_phone` (text) - Phone number
  - `preferred_contact_method` (text, optional) - Email/Phone/WhatsApp
  - `preferred_time_window` (text, optional) - Morning/Afternoon/Evening/Anytime
  - `customer_notes` (text, optional) - Additional notes

  ## Security
  - Enable RLS on `servicing_requests` table
  - No public access policies (requests are private)
  - Access controlled via service role key

  ## Indexes
  - Primary key on `id`
  - Unique constraint on `service_ref`
  - Index on `submitted_at` for sorting
  - Index on `customer_email` for lookups
  - Index on `request_type` for filtering
*/

CREATE TABLE IF NOT EXISTS servicing_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_ref text UNIQUE NOT NULL,
  request_type text NOT NULL DEFAULT 'servicing',
  service text NOT NULL DEFAULT 'servicing',
  submitted_at timestamptz DEFAULT now() NOT NULL,

  postcode text NOT NULL,
  outward_code text,
  coverage_status text,

  fuel_type text,
  boiler_type text,
  boiler_make text,
  boiler_model text,
  last_serviced text,

  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  preferred_contact_method text,
  preferred_time_window text,
  customer_notes text
);

ALTER TABLE servicing_requests ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS servicing_requests_submitted_at_idx ON servicing_requests (submitted_at DESC);
CREATE INDEX IF NOT EXISTS servicing_requests_customer_email_idx ON servicing_requests (customer_email);
CREATE INDEX IF NOT EXISTS servicing_requests_request_type_idx ON servicing_requests (request_type);
