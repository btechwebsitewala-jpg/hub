export interface LabTest {
  id: string;
  name: string;
  category: "Individual Test" | "Health Package";
  price: number;
  discountPrice: number;
  turnaroundTime: string;
  fastingRequired: boolean;
  homeCollection: boolean;
  includedTests?: string[];
  testCategory?: string;
}

const realTestsData = [
  { "name": "COMPLETE BLOOD COUNT (CBC)", "price": 340, "discountPrice": 340 },
  { "name": "HbA1c; GLYCOSYLATED HEMOGLOBIN", "price": 430, "discountPrice": 430 },
  { "name": "THYROID PROFILE TOTAL", "price": 540, "discountPrice": 540 },
  { "name": "URINE EXAMINATION, ROUTINE; URINE, R/E", "price": 120, "discountPrice": 120 },
  { "name": "GLUCOSE, FASTING (F) AND POST MEAL (PP), 2 HOURS", "price": 150, "discountPrice": 150 },
  { "name": "LIVER FUNCTION TEST (LFT)", "price": 790, "discountPrice": 790 },
  { "name": "KIDNEY FUNCTION TEST (KFT)", "price": 840, "discountPrice": 840 },
  { "name": "LIPID PROFILE BASIC", "price": 990, "discountPrice": 990 },
  { "name": "GLUCOSE, FASTING (F)", "price": 80, "discountPrice": 80 },
  { "name": "C-REACTIVE PROTEIN; CRP", "price": 430, "discountPrice": 430 },
  { "name": "LIVER & KIDNEY PANEL", "price": 1530, "discountPrice": 1530 },
  { "name": "CULTURE URINE", "price": 840, "discountPrice": 840 },
  { "name": "HCG, BETA, TOTAL, QUANTITATIVE, MATERNAL", "price": 690, "discountPrice": 690 },
  { "name": "VITAMIN D 25 - HYDROXY", "price": 1530, "discountPrice": 1530 },
  { "name": "VITAMIN B12; CYANOCOBALAMIN", "price": 1180, "discountPrice": 1180 },
  { "name": "ESR; ERYTHROCYTE SEDIMENTATION RATE", "price": 140, "discountPrice": 140 },
  { "name": "CREATININE, SERUM", "price": 150, "discountPrice": 150 },
  { "name": "TSH (THYROID STIMULATING HORMONE)", "price": 200, "discountPrice": 200 },
  { "name": "URIC ACID, SERUM", "price": 160, "discountPrice": 160 },
  { "name": "HEMOGLOBIN; Hb", "price": 110, "discountPrice": 110 },
  { "name": "TSH (THYROID STIMULATING HORMONE), ULTRASENSITIVE", "price": 370, "discountPrice": 370 },
  { "name": "DENGUE FEVER NS1 ANTIGEN, EIA", "price": 750, "discountPrice": 750 },
  { "name": "GLUCOSE, POST PRANDIAL (PP), 2 HOURS", "price": 90, "discountPrice": 90 },
  { "name": "MALARIA PARASITE / BLOOD PARASITE IDENTIFICATION", "price": 130, "discountPrice": 130 },
  { "name": "SWASTH PLUS VITAMIN PANEL", "price": 2710, "discountPrice": 1770 },
  { "name": "SWASTHFIT COMPLETE HEALTH CHECK- NEW", "price": 9870, "discountPrice": 5020 },
  { "name": "FEVER PANEL 1", "price": 1020, "discountPrice": 640 },
  { "name": "SWASTHFIT SUPER 2-NEW", "price": 4300, "discountPrice": 2360 },
  { "name": "SWASTHFIT COMPLETE PACKAGE - NEW", "price": 9870, "discountPrice": 5020 },
  { "name": "FSH & LH", "price": 1180, "discountPrice": 1080 },
  { "name": "CULTURE, URINE ADVANTAGE", "price": 1020, "discountPrice": 890 },
  { "name": "STD PANEL", "price": 3470, "discountPrice": 2960 },
  { "name": "FEVER PANEL - ADVANCE", "price": 3150, "discountPrice": 1720 },
  { "name": "TYPHIDOT/SALMONELLA TYPHI IGG & IGM", "price": 930, "discountPrice": 890 },
  { "name": "SWASTHFIT SUPER 4-NEW", "price": 7010, "discountPrice": 4040 },
  { "name": "TESTOSTERONE PANEL, TOTAL & FREE", "price": 2660, "discountPrice": 2560 },
  { "name": "SWASTHFIT SUPER 1-NEW", "price": 3530, "discountPrice": 1870 },
  { "name": "FEVER ADVANCE PACKAGE", "price": 4850, "discountPrice": 3500 },
  { "name": "CULTURE BLOOD COMPREHENSIVE PANEL", "price": 4140, "discountPrice": 3150 },
  { "name": "SWASTHFIT SUPER 3-NEW", "price": 6240, "discountPrice": 3350 }
];

export const labTests: LabTest[] = [];
let id = 1;

// Seeded random for consistent client/server rendering
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

realTestsData.forEach((item, index) => {
  const isPackage = item.name.includes("SWASTH") || item.name.includes("PANEL") || item.name.includes("PACKAGE") || item.name.includes("CHECK");

  labTests.push({
    id: id.toString(),
    name: item.name,
    category: isPackage ? "Health Package" : "Individual Test",
    price: item.price,
    discountPrice: item.discountPrice,
    turnaroundTime: pseudoRandom(index) > 0.5 ? "12 Hours" : "24 Hours",
    fastingRequired: item.name.includes("FASTING") || isPackage || pseudoRandom(index * 5) > 0.7,
    homeCollection: true,
    includedTests: isPackage ? ["COMPLETE BLOOD COUNT (CBC)", "LIPID PROFILE BASIC"] : undefined
  });
  id++;
});

