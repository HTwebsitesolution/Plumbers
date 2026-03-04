export interface QuoteFormData {
  postcode: string;
  outwardCode?: string;
  coverageStatus?: 'in_area' | 'out_of_area';
  propertyType: 'House' | 'Flat' | 'Other';
  bedrooms: number;
  bathrooms: number;
  fuelType: 'Gas' | 'LPG' | 'Oil';
  currentBoilerType: 'Combi' | 'System' | 'Regular' | 'Not sure';
  boilerLocation: 'Kitchen' | 'Utility' | 'Loft' | 'Garage' | 'Airing cupboard' | 'Other';
  tierName: 'Budget boiler' | 'Mid price boiler' | 'Premium boiler';
  fromPrice: number;
  warrantyYears: number;
  brandPreference: 'Baxi' | 'Viessmann' | 'Other' | 'Not sure';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  addressLine1?: string;
  preferredContactMethod: 'Email' | 'Phone' | 'WhatsApp';
  preferredTimeWindow: 'Morning' | 'Afternoon' | 'Evening' | 'Anytime';
  customerNotes?: string;
}

export interface OutOfAreaEnquiry {
  postcode: string;
  outwardCode: string;
  coverageStatus: 'out_of_area';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerNotes?: string;
}

export interface BoilerTier {
  name: 'Budget boiler' | 'Mid price boiler' | 'Premium boiler';
  fromPrice: number;
  warrantyYears: number;
  inclusions: string[];
}

export interface Lead extends QuoteFormData {
  id: string;
  quoteRef: string;
  submittedAt: string;
}

export const PROPERTY_TYPES = ['House', 'Flat', 'Other'] as const;

export const FUEL_TYPES = ['Gas', 'LPG', 'Oil'] as const;

export const BOILER_TYPES = ['Combi', 'System', 'Regular', 'Not sure'] as const;

export const BOILER_LOCATIONS = [
  'Kitchen',
  'Utility',
  'Loft',
  'Garage',
  'Airing cupboard',
  'Other',
] as const;

export const BOILER_TIERS: BoilerTier[] = [
  {
    name: 'Budget boiler',
    fromPrice: 1750,
    warrantyYears: 2,
    inclusions: [
      'Magnetic filter',
      'Limescale reducer',
      'Chemical flush',
      'Inhibitor',
      'Programmable room thermostat',
    ],
  },
  {
    name: 'Mid price boiler',
    fromPrice: 1850,
    warrantyYears: 5,
    inclusions: [
      'Magnetic filter',
      'Limescale reducer',
      'Chemical flush',
      'Inhibitor',
      'Programmable room thermostat',
    ],
  },
  {
    name: 'Premium boiler',
    fromPrice: 2200,
    warrantyYears: 10,
    inclusions: [
      'Magnetic filter',
      'Limescale reducer',
      'Chemical flush',
      'Inhibitor',
      'Programmable room thermostat',
    ],
  },
];

export const BRAND_OPTIONS = ['Baxi', 'Viessmann', 'Other', 'Not sure'] as const;

export const CONTACT_METHODS = ['Email', 'Phone', 'WhatsApp'] as const;

export const TIME_WINDOWS = ['Morning', 'Afternoon', 'Evening', 'Anytime'] as const;

export const PRICE_CHANGE_FACTORS = [
  'Flue route changes / extensions or plume kit',
  'Condensate routing changes or pump required',
  'Boiler relocation (if requested)',
  'Gas pipework or electrical upgrades needed',
  'System issues requiring a powerflush',
  'Access constraints / non-standard installation complexity',
];

export const STANDARD_INSTALL_DEFINITION = {
  title: 'What is a standard installation?',
  points: [
    'Like-for-like replacement where possible',
    'Existing location (no relocation)',
    'Standard flue route',
    'No major upgrades to gas pipework/electrics',
    'System in reasonable condition (powerflush not required)',
  ],
  note: "If anything outside a standard install is needed, we'll explain it clearly before any work begins.",
};
