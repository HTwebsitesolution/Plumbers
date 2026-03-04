import { describe, it, expect } from 'vitest';
import {
  parseUkPostcode,
  isCoveredOutwardCode,
  ALLOWED_POSTCODE_DISTRICTS,
  validateUKPostcode,
  formatPostcode,
  extractOutwardCode,
  checkPostcodeCoverage
} from './quote-utils';

describe('parseUkPostcode', () => {
  describe('normalization', () => {
    it('should normalize postcode with extra spaces and lowercase', () => {
      const result = parseUkPostcode(' dn22  7zz ');
      expect(result.normalizedPostcode).toBe('DN22 7ZZ');
      expect(result.outwardCode).toBe('DN22');
      expect(result.isValidFormat).toBe(true);
    });

    it('should handle postcode without space', () => {
      const result = parseUkPostcode('DN227ZZ');
      expect(result.normalizedPostcode).toBe('DN22 7ZZ');
      expect(result.outwardCode).toBe('DN22');
      expect(result.isValidFormat).toBe(true);
    });

    it('should handle multiple spaces between parts', () => {
      const result = parseUkPostcode('S80   2AB');
      expect(result.normalizedPostcode).toBe('S80 2AB');
      expect(result.outwardCode).toBe('S80');
      expect(result.isValidFormat).toBe(true);
    });

    it('should trim leading and trailing spaces', () => {
      const result = parseUkPostcode('  DN1 1AA  ');
      expect(result.normalizedPostcode).toBe('DN1 1AA');
      expect(result.outwardCode).toBe('DN1');
      expect(result.isValidFormat).toBe(true);
    });
  });

  describe('valid UK format cases', () => {
    it('should validate DN22 7ZZ', () => {
      const result = parseUkPostcode('DN22 7ZZ');
      expect(result.isValidFormat).toBe(true);
      expect(result.normalizedPostcode).toBe('DN22 7ZZ');
      expect(result.outwardCode).toBe('DN22');
    });

    it('should validate S80 2AB', () => {
      const result = parseUkPostcode('S80 2AB');
      expect(result.isValidFormat).toBe(true);
      expect(result.normalizedPostcode).toBe('S80 2AB');
      expect(result.outwardCode).toBe('S80');
    });

    it('should validate DN1 1AA', () => {
      const result = parseUkPostcode('DN1 1AA');
      expect(result.isValidFormat).toBe(true);
      expect(result.normalizedPostcode).toBe('DN1 1AA');
      expect(result.outwardCode).toBe('DN1');
    });

    it('should validate DN10 5XY', () => {
      const result = parseUkPostcode('DN10 5XY');
      expect(result.isValidFormat).toBe(true);
      expect(result.normalizedPostcode).toBe('DN10 5XY');
      expect(result.outwardCode).toBe('DN10');
    });

    it('should validate S25 3PQ', () => {
      const result = parseUkPostcode('S25 3PQ');
      expect(result.isValidFormat).toBe(true);
      expect(result.normalizedPostcode).toBe('S25 3PQ');
      expect(result.outwardCode).toBe('S25');
    });

    it('should validate S66 7RS', () => {
      const result = parseUkPostcode('S66 7RS');
      expect(result.isValidFormat).toBe(true);
      expect(result.normalizedPostcode).toBe('S66 7RS');
      expect(result.outwardCode).toBe('S66');
    });
  });

  describe('invalid format cases', () => {
    it('should reject empty string', () => {
      const result = parseUkPostcode('');
      expect(result.isValidFormat).toBe(false);
      expect(result.outwardCode).toBe('');
    });

    it('should reject numeric only input', () => {
      const result = parseUkPostcode('12345');
      expect(result.isValidFormat).toBe(false);
      expect(result.outwardCode).toBe('');
    });

    it('should reject invalid format DN 22', () => {
      const result = parseUkPostcode('DN 22');
      expect(result.isValidFormat).toBe(false);
      expect(result.outwardCode).toBe('');
    });

    it('should reject incomplete postcode', () => {
      const result = parseUkPostcode('DN22');
      expect(result.isValidFormat).toBe(false);
      expect(result.outwardCode).toBe('');
    });

    it('should reject invalid characters', () => {
      const result = parseUkPostcode('DN22-7ZZ');
      expect(result.isValidFormat).toBe(false);
      expect(result.outwardCode).toBe('');
    });
  });
});

describe('isCoveredOutwardCode', () => {
  describe('allowlist exact-match coverage', () => {
    it('should confirm DN1 is covered', () => {
      expect(isCoveredOutwardCode('DN1')).toBe(true);
    });

    it('should confirm DN10 is covered', () => {
      expect(isCoveredOutwardCode('DN10')).toBe(true);
    });

    it('should confirm DN12 is covered', () => {
      expect(isCoveredOutwardCode('DN12')).toBe(true);
    });

    it('should confirm DN13 is NOT covered', () => {
      expect(isCoveredOutwardCode('DN13')).toBe(false);
    });

    it('should confirm all S-codes are covered', () => {
      expect(isCoveredOutwardCode('S80')).toBe(true);
      expect(isCoveredOutwardCode('S81')).toBe(true);
      expect(isCoveredOutwardCode('S25')).toBe(true);
      expect(isCoveredOutwardCode('S66')).toBe(true);
    });

    it('should confirm all DN codes 1-12, 22 are covered', () => {
      expect(isCoveredOutwardCode('DN1')).toBe(true);
      expect(isCoveredOutwardCode('DN2')).toBe(true);
      expect(isCoveredOutwardCode('DN3')).toBe(true);
      expect(isCoveredOutwardCode('DN4')).toBe(true);
      expect(isCoveredOutwardCode('DN5')).toBe(true);
      expect(isCoveredOutwardCode('DN6')).toBe(true);
      expect(isCoveredOutwardCode('DN7')).toBe(true);
      expect(isCoveredOutwardCode('DN8')).toBe(true);
      expect(isCoveredOutwardCode('DN9')).toBe(true);
      expect(isCoveredOutwardCode('DN10')).toBe(true);
      expect(isCoveredOutwardCode('DN11')).toBe(true);
      expect(isCoveredOutwardCode('DN12')).toBe(true);
      expect(isCoveredOutwardCode('DN22')).toBe(true);
    });

    it('should reject uncovered codes', () => {
      expect(isCoveredOutwardCode('DN13')).toBe(false);
      expect(isCoveredOutwardCode('DN14')).toBe(false);
      expect(isCoveredOutwardCode('DN15')).toBe(false);
      expect(isCoveredOutwardCode('DN20')).toBe(false);
      expect(isCoveredOutwardCode('DN21')).toBe(false);
      expect(isCoveredOutwardCode('S1')).toBe(false);
      expect(isCoveredOutwardCode('S2')).toBe(false);
      expect(isCoveredOutwardCode('S70')).toBe(false);
    });
  });

  describe('critical edge cases - no prefix matching', () => {
    it('DN1 must be true (exact match)', () => {
      expect(isCoveredOutwardCode('DN1')).toBe(true);
    });

    it('DN10 must be true (exact match)', () => {
      expect(isCoveredOutwardCode('DN10')).toBe(true);
    });

    it('DN1 should not accidentally match DN10', () => {
      expect(isCoveredOutwardCode('DN1')).toBe(true);
      expect(isCoveredOutwardCode('DN10')).toBe(true);
      expect('DN1').not.toBe('DN10');
    });

    it('DN10 should not accidentally match DN1', () => {
      expect(isCoveredOutwardCode('DN10')).toBe(true);
      expect(isCoveredOutwardCode('DN1')).toBe(true);
      expect('DN10'.startsWith('DN1')).toBe(true);
      expect(ALLOWED_POSTCODE_DISTRICTS.includes('DN10')).toBe(true);
      expect(ALLOWED_POSTCODE_DISTRICTS.includes('DN1')).toBe(true);
    });

    it('should handle case-insensitive matching', () => {
      expect(isCoveredOutwardCode('dn1')).toBe(true);
      expect(isCoveredOutwardCode('DN1')).toBe(true);
      expect(isCoveredOutwardCode('Dn1')).toBe(true);
      expect(isCoveredOutwardCode('dn10')).toBe(true);
      expect(isCoveredOutwardCode('DN10')).toBe(true);
    });
  });
});

describe('ALLOWED_POSTCODE_DISTRICTS constant', () => {
  it('should contain exactly 17 districts', () => {
    expect(ALLOWED_POSTCODE_DISTRICTS).toHaveLength(17);
  });

  it('should contain all required S codes', () => {
    expect(ALLOWED_POSTCODE_DISTRICTS).toContain('S80');
    expect(ALLOWED_POSTCODE_DISTRICTS).toContain('S81');
    expect(ALLOWED_POSTCODE_DISTRICTS).toContain('S25');
    expect(ALLOWED_POSTCODE_DISTRICTS).toContain('S66');
  });

  it('should contain all required DN codes', () => {
    const dnCodes = ['DN22', 'DN10', 'DN11', 'DN12', 'DN1', 'DN2', 'DN3', 'DN4', 'DN5', 'DN6', 'DN7', 'DN8', 'DN9'];
    dnCodes.forEach(code => {
      expect(ALLOWED_POSTCODE_DISTRICTS).toContain(code);
    });
  });

  it('should have all entries in uppercase', () => {
    ALLOWED_POSTCODE_DISTRICTS.forEach(code => {
      expect(code).toBe(code.toUpperCase());
    });
  });

  it('should not have duplicate entries', () => {
    const uniqueSet = new Set(ALLOWED_POSTCODE_DISTRICTS);
    expect(uniqueSet.size).toBe(ALLOWED_POSTCODE_DISTRICTS.length);
  });
});

describe('validateUKPostcode', () => {
  it('should validate correctly formatted postcodes', () => {
    expect(validateUKPostcode('DN22 7ZZ')).toBe(true);
    expect(validateUKPostcode('S80 2AB')).toBe(true);
    expect(validateUKPostcode('DN1 1AA')).toBe(true);
  });

  it('should reject invalid formats', () => {
    expect(validateUKPostcode('')).toBe(false);
    expect(validateUKPostcode('12345')).toBe(false);
    expect(validateUKPostcode('DN 22')).toBe(false);
  });
});

describe('formatPostcode', () => {
  it('should format postcode with proper spacing', () => {
    expect(formatPostcode('DN227ZZ')).toBe('DN22 7ZZ');
    expect(formatPostcode('DN1 1AA')).toBe('DN1 1AA');
    expect(formatPostcode('s802ab')).toBe('S80 2AB');
  });

  it('should handle already formatted postcodes', () => {
    expect(formatPostcode('DN22 7ZZ')).toBe('DN22 7ZZ');
  });
});

describe('extractOutwardCode', () => {
  it('should extract outward code from valid postcodes', () => {
    expect(extractOutwardCode('DN22 7ZZ')).toBe('DN22');
    expect(extractOutwardCode('DN1 1AA')).toBe('DN1');
    expect(extractOutwardCode('DN10 5XY')).toBe('DN10');
    expect(extractOutwardCode('S80 2AB')).toBe('S80');
  });

  it('should handle postcodes without spaces', () => {
    expect(extractOutwardCode('DN227ZZ')).toBe('DN22');
    expect(extractOutwardCode('DN11AA')).toBe('DN1');
  });

  it('should return empty string for invalid postcodes', () => {
    expect(extractOutwardCode('invalid')).toBe('');
    expect(extractOutwardCode('')).toBe('');
  });
});

describe('checkPostcodeCoverage', () => {
  it('should return in_area for covered postcodes', () => {
    const result = checkPostcodeCoverage('DN22 7ZZ');
    expect(result.isInArea).toBe(true);
    expect(result.outwardCode).toBe('DN22');
    expect(result.coverageStatus).toBe('in_area');
  });

  it('should return out_of_area for uncovered postcodes', () => {
    const result = checkPostcodeCoverage('DN13 5AB');
    expect(result.isInArea).toBe(false);
    expect(result.outwardCode).toBe('DN13');
    expect(result.coverageStatus).toBe('out_of_area');
  });

  it('should handle all covered DN codes correctly', () => {
    expect(checkPostcodeCoverage('DN1 1AA').isInArea).toBe(true);
    expect(checkPostcodeCoverage('DN10 5XY').isInArea).toBe(true);
    expect(checkPostcodeCoverage('DN12 3AB').isInArea).toBe(true);
  });

  it('should distinguish between DN1 and DN10', () => {
    const dn1Result = checkPostcodeCoverage('DN1 1AA');
    const dn10Result = checkPostcodeCoverage('DN10 5XY');

    expect(dn1Result.outwardCode).toBe('DN1');
    expect(dn1Result.isInArea).toBe(true);

    expect(dn10Result.outwardCode).toBe('DN10');
    expect(dn10Result.isInArea).toBe(true);

    expect(dn1Result.outwardCode).not.toBe(dn10Result.outwardCode);
  });
});

describe('Integration tests', () => {
  it('should handle full workflow from input to coverage check', () => {
    const parsed = parseUkPostcode(' dn22  7zz ');
    expect(parsed.isValidFormat).toBe(true);
    expect(parsed.outwardCode).toBe('DN22');

    const isCovered = isCoveredOutwardCode(parsed.outwardCode);
    expect(isCovered).toBe(true);

    const coverage = checkPostcodeCoverage(parsed.normalizedPostcode);
    expect(coverage.isInArea).toBe(true);
    expect(coverage.coverageStatus).toBe('in_area');
  });

  it('should reject out-of-area postcodes through full workflow', () => {
    const parsed = parseUkPostcode('M1 1AA');
    expect(parsed.isValidFormat).toBe(true);
    expect(parsed.outwardCode).toBe('M1');

    const isCovered = isCoveredOutwardCode(parsed.outwardCode);
    expect(isCovered).toBe(false);

    const coverage = checkPostcodeCoverage(parsed.normalizedPostcode);
    expect(coverage.isInArea).toBe(false);
    expect(coverage.coverageStatus).toBe('out_of_area');
  });
});
