/*
  # Create repairs_requests table

  ## Overview
  This migration creates the `repairs_requests` table to store all boiler repair requests
  submitted through the /repairs/request flow.

  ## New Tables

  ### `repairs_requests`
  Stores all repair request information:

  **Request Information:**
  - `id` (uuid, primary key) - Unique identifier for each request
  - `repair_ref` (text, unique) - Human-readable reference (e.g., REP-20260305-A1B2)
  - `request_type` (text) - Type: "repairs" or "out_of_area_enquiry"
  - `service` (text) - Service type: "repairs"
  - `submitted_at` (timestamptz) - When the request was submitted

  **Location:**
  - `postcode` (text) - UK postcode
  - `outward_code` (text, optional) - Extracted outward code (e.g., DN22)
  - `coverage_status` (text, optional) - Coverage: "in_area" or "out_of_area"

  **Issue Details:**
  - `issue_category` (text, optional) - Category of the issue
  - `error_code` (text, optional) - Error code if applicable
  - `urgency` (text, optional) - Emergency today/ASAP/This week
  - `gas_smell` (boolean, optional) - Whether customer smells gas

  **Boiler Details:**
  - `fuel_type` (text, optional) - Gas/LPG/Oil
  - `boiler_type` (text, optional) - Combi/System/Regular/Not sure
  - `boiler_make` (text, optional) - Manufacturer
  - `boiler_model` (text, optional) - Model

  **Customer Details:**
  - `customer_name` (text) - Full name
  - `customer_email` (text) - Email address
  - `customer_phone` (text) - Phone number
  - `preferred_contact_method` (text, optional) - Email/Phone/WhatsApp
  - `preferred_time_window` (text, optional) - Morning/Afternoon/Evening/Anytime
  - `customer_notes` (text, optional) - Additional notes

  ## Security
  - Enable RLS on `repairs_requests` table
  - No public access policies (requests are private)
  - Access controlled via service role key

  ## Indexes
  - Primary key on `id`
  - Unique constraint on `repair_ref`
  - Index on `submitted_at` for sorting
  - Index on `customer_email` for lookups
  - Index on `request_type` for filtering
  - Index on `urgency` for prioritization
*/

CREATE TABLE IF NOT EXISTS repairs_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  repair_ref text UNIQUE NOT NULL,
  request_type text NOT NULL DEFAULT 'repairs',
  service text NOT NULL DEFAULT 'repairs',
  submitted_at timestamptz DEFAULT now() NOT NULL,

  postcode text NOT NULL,
  outward_code text,
  coverage_status text,

  issue_category text,
  error_code text,
  urgency text,
  gas_smell boolean DEFAULT false,

  fuel_type text,
  boiler_type text,
  boiler_make text,
  boiler_model text,

  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  preferred_contact_method text,
  preferred_time_window text,
  customer_notes text
);

ALTER TABLE repairs_requests ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS repairs_requests_submitted_at_idx ON repairs_requests (submitted_at DESC);
CREATE INDEX IF NOT EXISTS repairs_requests_customer_email_idx ON repairs_requests (customer_email);
CREATE INDEX IF NOT EXISTS repairs_requests_request_type_idx ON repairs_requests (request_type);
CREATE INDEX IF NOT EXISTS repairs_requests_urgency_idx ON repairs_requests (urgency);
