# Postcode Validation Test Suite

This test suite provides comprehensive coverage for postcode parsing, validation, and coverage checking functionality.

## Test Coverage

### 1. **parseUkPostcode(input)** - Postcode Parsing and Normalization
Tests the parsing of UK postcodes with various input formats.

**What it tests:**
- Normalization of whitespace (leading, trailing, multiple spaces)
- Case conversion to uppercase
- Extraction of outward codes
- Format validation

**Example test cases:**
- `" dn22  7zz "` → `{ normalizedPostcode: "DN22 7ZZ", outwardCode: "DN22", isValidFormat: true }`
- `"DN227ZZ"` → `{ normalizedPostcode: "DN22 7ZZ", outwardCode: "DN22", isValidFormat: true }`
- `"invalid"` → `{ normalizedPostcode: "INVALID", outwardCode: "", isValidFormat: false }`

### 2. **isCoveredOutwardCode(outwardCode)** - Coverage Allowlist Matching
Tests exact-match coverage checking against the allowlist.

**Allowlist districts:**
- S80, S81, S25, S66
- DN22, DN10, DN11, DN12, DN1, DN2, DN3, DN4, DN5, DN6, DN7, DN8, DN9

**Critical edge cases tested:**
- `DN1` and `DN10` are both valid and distinct (no prefix matching)
- `DN13` is NOT covered (not in allowlist)
- Case-insensitive matching works correctly

### 3. **ALLOWED_POSTCODE_DISTRICTS** - Allowlist Constant
Tests the integrity of the shared allowlist constant.

**Verifies:**
- Exactly 17 districts
- All required S codes (S80, S81, S25, S66)
- All required DN codes (DN1-DN12, DN22)
- All entries are uppercase
- No duplicate entries

### 4. Helper Functions
Additional tests for supporting functions:
- `validateUKPostcode()` - Format validation
- `formatPostcode()` - Proper spacing
- `extractOutwardCode()` - Outward code extraction
- `checkPostcodeCoverage()` - Full coverage check

### 5. Integration Tests
End-to-end workflow tests covering the full validation pipeline.

## Running Tests

```bash
# Run tests in watch mode (for development)
npm test

# Run tests once (for CI/CD)
npm run test:run

# Run tests with UI
npm run test:ui
```

## Test Statistics

- **Total tests:** 45
- **Test suites:** 1
- **Coverage areas:**
  - Normalization: 4 tests
  - Valid format cases: 6 tests
  - Invalid format cases: 5 tests
  - Allowlist matching: 11 tests
  - Edge cases: 5 tests
  - Helper functions: 8 tests
  - Integration: 2 tests
  - Constant validation: 4 tests

## Implementation Notes

### Exact Match Logic
The coverage check uses exact matching with `Array.includes()`, ensuring:
- `DN1` matches only `DN1` in the allowlist
- `DN10` matches only `DN10` in the allowlist
- No substring or prefix matching occurs

### Normalization Strategy
The parser normalizes postcodes by:
1. Trimming leading/trailing whitespace
2. Collapsing multiple spaces to single space
3. Converting to uppercase
4. Formatting with single space between outward and inward codes

### Shared Constants
The `ALLOWED_POSTCODE_DISTRICTS` constant is exported and used by:
- UI components for real-time validation
- API endpoints for server-side validation
- Test suite for verification

This ensures a single source of truth for coverage areas.
