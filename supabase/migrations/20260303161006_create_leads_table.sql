/*
  # Create leads table for boiler installation quotes

  ## Overview
  This migration creates the core `leads` table to store all boiler installation quote submissions
  from the Boilable.co.uk quote wizard.

  ## New Tables
  
  ### `leads`
  Stores all lead information captured through the quote wizard:
  
  **Quote Information:**
  - `id` (uuid, primary key) - Unique identifier for each lead
  - `quote_ref` (text, unique) - Human-readable quote reference (e.g., BLR-20240301-001)
  - `submitted_at` (timestamptz) - When the quote was submitted
  
  **Property Details:**
  - `postcode` (text) - UK postcode
  - `property_type` (text) - House/Flat/Other
  - `bedrooms` (integer) - Number of bedrooms
  - `bathrooms` (integer) - Number of bathrooms
  
  **Current Boiler Information:**
  - `fuel_type` (text) - Gas/LPG/Oil
  - `current_boiler_type` (text) - Combi/System/Regular/Not sure
  - `boiler_location` (text) - Kitchen/Utility/Loft/Garage/Airing cupboard/Other
  
  **Selected Boiler Tier:**
  - `tier_name` (text) - Budget boiler/Mid price boiler/Premium boiler
  - `from_price` (integer) - Starting price in pounds (1750/1850/2200)
  - `warranty_years` (integer) - Warranty period (2/5/10 years)
  
  **Brand & Preferences:**
  - `brand_preference` (text) - Baxi/Viessmann/Other/Not sure
  
  **Customer Details:**
  - `customer_name` (text) - Full name
  - `customer_email` (text) - Email address
  - `customer_phone` (text) - Phone number
  - `address_line1` (text, optional) - First line of address
  - `preferred_contact_method` (text) - Email/Phone/WhatsApp
  - `preferred_time_window` (text) - Morning/Afternoon/Evening/Anytime
  - `customer_notes` (text, optional) - Any additional notes from customer
  
  ## Security
  - Enable RLS on `leads` table
  - No public access policies (leads are private)
  - Access will be controlled via service role key in admin dashboard
  
  ## Indexes
  - Primary key on `id`
  - Unique constraint on `quote_ref`
  - Index on `submitted_at` for sorting
  - Index on `customer_email` for lookups
*/

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_ref text UNIQUE NOT NULL,
  submitted_at timestamptz DEFAULT now() NOT NULL,
  
  -- Property details
  postcode text NOT NULL,
  property_type text NOT NULL,
  bedrooms integer NOT NULL,
  bathrooms integer NOT NULL,
  
  -- Current boiler
  fuel_type text NOT NULL,
  current_boiler_type text NOT NULL,
  boiler_location text NOT NULL,
  
  -- Selected tier
  tier_name text NOT NULL,
  from_price integer NOT NULL,
  warranty_years integer NOT NULL,
  
  -- Brand preference
  brand_preference text NOT NULL,
  
  -- Customer details
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  address_line1 text,
  preferred_contact_method text NOT NULL,
  preferred_time_window text NOT NULL,
  customer_notes text
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS leads_submitted_at_idx ON leads (submitted_at DESC);
CREATE INDEX IF NOT EXISTS leads_customer_email_idx ON leads (customer_email);

-- Note: No public policies - admin access only via service role key