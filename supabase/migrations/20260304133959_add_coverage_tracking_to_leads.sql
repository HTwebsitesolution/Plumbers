/*
  # Add postcode coverage tracking to leads table

  ## Overview
  This migration adds fields to track postcode coverage status for service area validation.

  ## Changes to `leads` table
  
  **New Fields:**
  - `outward_code` (text) - The outward code (district) extracted from the postcode (e.g., "DN1", "S80")
  - `coverage_status` (text) - Whether the postcode is "in_area" or "out_of_area"
  
  ## Notes
  - These fields support the service coverage allowlist functionality
  - Out-of-area leads may have different data requirements (simpler enquiry form)
  - Existing leads will have NULL values; they can be backfilled if needed
*/

-- Add coverage tracking fields to leads table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'outward_code'
  ) THEN
    ALTER TABLE leads ADD COLUMN outward_code text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'leads' AND column_name = 'coverage_status'
  ) THEN
    ALTER TABLE leads ADD COLUMN coverage_status text CHECK (coverage_status IN ('in_area', 'out_of_area'));
  END IF;
END $$;

-- Create index for coverage lookups
CREATE INDEX IF NOT EXISTS leads_coverage_status_idx ON leads (coverage_status);
CREATE INDEX IF NOT EXISTS leads_outward_code_idx ON leads (outward_code);