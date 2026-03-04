export function generateQuoteRef(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let random = '';
  for (let i = 0; i < 4; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `BOIL-${year}${month}${day}-${random}`;
}

export function validateUKPostcode(postcode: string): boolean {
  const postcodeRegex =
    /^([A-Z]{1,2}\d{1,2}[A-Z]?)\s*(\d[A-Z]{2})$/i;
  return postcodeRegex.test(postcode.trim());
}

export function formatPostcode(postcode: string): string {
  const cleaned = postcode.replace(/\s+/g, '').toUpperCase();
  const match = cleaned.match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)(\d[A-Z]{2})$/);

  if (match) {
    return `${match[1]} ${match[2]}`;
  }

  return postcode;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

const ALLOWED_POSTCODE_DISTRICTS = [
  'S80', 'S81', 'S25', 'S66',
  'DN22', 'DN10', 'DN11', 'DN12',
  'DN1', 'DN2', 'DN3', 'DN4', 'DN5', 'DN6', 'DN7', 'DN8', 'DN9'
];

export function extractOutwardCode(postcode: string): string {
  const cleaned = postcode.replace(/\s+/g, '').toUpperCase();
  const match = cleaned.match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)/);
  return match ? match[1] : '';
}

export function checkPostcodeCoverage(postcode: string): {
  isInArea: boolean;
  outwardCode: string;
  coverageStatus: 'in_area' | 'out_of_area';
} {
  const outwardCode = extractOutwardCode(postcode);
  const isInArea = ALLOWED_POSTCODE_DISTRICTS.includes(outwardCode);

  return {
    isInArea,
    outwardCode,
    coverageStatus: isInArea ? 'in_area' : 'out_of_area'
  };
}
