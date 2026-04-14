

## Plan: Tests Page - Reorder Sections

### Current Order
1. Hero Section (with search)
2. Health Packages
3. All Tests (with category filters)
4. Partner Labs

### New Order (After Changes)
1. Hero Section (with search)
2. **All Tests** (with category filters) - moved UP
3. **Health Packages** - moved DOWN
4. Partner Labs

### Implementation

**File: `src/pages/TestsPage.tsx`**

Simply swap the positions of two sections:

1. Move the **Test List section** (lines 109-174) to come immediately after the Hero section (after line 66)

2. Move the **Health Packages section** (lines 68-107) to come after the Test List section

### Visual Result

```text
┌─────────────────────────────────┐
│  Hero Section (Search)          │
├─────────────────────────────────┤
│  All Tests (100+ tests)         │  ← Moved UP
│  - Category Filter              │
│  - Tests Grid                   │
├─────────────────────────────────┤
│  Health Packages                │  ← Moved DOWN
│  - 8 Package Cards              │
├─────────────────────────────────┤
│  Partner Labs                   │
└─────────────────────────────────┘
```

### Technical Details
- No logic changes required
- Only repositioning JSX blocks
- Search and category filters will still work for tests
- Packages section will now appear after scrolling through all tests

