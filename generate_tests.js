const fs = require('fs');
const path = require('path');

const baseTests = [
  "CBC (Complete Blood Count)", "Fasting Blood Sugar (FBS)", "Lipid Profile", "Liver Function Test (LFT)",
  "Kidney Function Test (KFT)", "Thyroid Profile (T3, T4, TSH)", "Vitamin D (25-OH)", "Vitamin B12",
  "HbA1c (Glycosylated Hemoglobin)", "Urine Routine & Microscopy", "Iron Profile", "Serum Calcium",
  "Serum Creatinine", "Blood Urea Nitrogen (BUN)", "Uric Acid", "CRP (C-Reactive Protein)",
  "ESR (Erythrocyte Sedimentation Rate)", "Serum Electrolytes", "Prostate Specific Antigen (PSA)",
  "Testosterone", "Estradiol", "FSH", "LH", "Prolactin", "Cortisol Fasting", "Insulin Fasting",
  "Dengue NS1 Antigen", "Dengue IgG & IgM", "Typhoid Widal Test", "Malaria Antigen (Pf/Pv)",
  "Hepatitis B Surface Antigen (HBsAg)", "Hepatitis C Virus (HCV) Antibody", "HIV 1&2 Antibodies",
  "VDRL (Syphilis)", "Widal Test", "Mantoux Test", "Blood Grouping & Rh Typing", "Bleeding Time & Clotting Time",
  "Prothrombin Time (PT/INR)", "APTT", "Peripheral Blood Smear", "Reticulocyte Count", "Absolute Eosinophil Count",
  "Serum Amylase", "Serum Lipase", "Total Protein & A/G Ratio", "Alkaline Phosphatase (ALP)",
  "SGOT (AST)", "SGPT (ALT)", "Gamma GT", "Bilirubin (Total, Direct, Indirect)", "Total Cholesterol",
  "Triglycerides", "HDL Cholesterol", "LDL Cholesterol", "VLDL Cholesterol", "Cholesterol/HDL Ratio",
  "Sodium (Na+)", "Potassium (K+)", "Chloride (Cl-)", "Calcium (Total)", "Phosphorus (Inorganic)",
  "Magnesium", "Urine Culture & Sensitivity", "Blood Culture & Sensitivity", "Sputum Culture & Sensitivity",
  "Stool Culture & Sensitivity", "Stool Routine & Microscopy", "Sputum for AFB", "Semen Analysis",
  "Pap Smear", "FNAC", "Histopathology (Biopsy)", "Cytology", "Fluid Analysis", "Bone Marrow Aspiration",
  "HLA B27", "ANA (Anti-Nuclear Antibody)", "Anti-dsDNA", "Rheumatoid Factor (RA)", "Anti-CCP",
  "C3, C4 Complement", "IgE Total", "Allergy Profile", "Food Allergy Panel", "Inhalant Allergy Panel",
  "Drug Allergy Panel", "Skin Prick Test", "Patch Test", "Tuberculin Test", "PPD", "ECG", "EEG"
];

const prefixes = ["Complete", "Extended", "Basic", "Advanced", "Comprehensive", "Routine", "Special", "Master"];
const organs = ["Cardiac", "Renal", "Hepatic", "Thyroid", "Diabetic", "Metabolic", "Immune", "Hormonal", "Bone", "Pregnancy", "Fever"];
const suffixes = ["Profile", "Panel", "Checkup", "Screening", "Assessment", "Package"];

const tests = [];
let id = 1;

baseTests.forEach((name) => {
  tests.push({
    id: id.toString(),
    name,
    category: "Individual Test",
    price: Math.floor(Math.random() * 800) + 150,
    discountPrice: Math.floor(Math.random() * 800) + 100, // Make discount less than price
    type: "Test",
    turnaroundTime: "12-24 Hours",
    fastingRequired: Math.random() > 0.6
  });
  id++;
});

// Generate Packages
for (let i = 0; i < 110; i++) {
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const organ = organs[Math.floor(Math.random() * organs.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  
  const basePrice = Math.floor(Math.random() * 3000) + 800;
  
  tests.push({
    id: id.toString(),
    name: \`\${prefix} \${organ} \${suffix}\`,
    category: "Health Package",
    price: basePrice,
    discountPrice: Math.floor(basePrice * 0.8), // 20% discount
    type: "Package",
    turnaroundTime: "24-48 Hours",
    fastingRequired: Math.random() > 0.3
  });
  id++;
}

// Filter unique names
const uniqueTests = [];
const seen = new Set();
tests.forEach(t => {
  if (!seen.has(t.name)) {
    seen.add(t.name);
    // fix discount
    if (t.discountPrice >= t.price) {
        t.discountPrice = t.price - 50;
    }
    uniqueTests.push(t);
  }
});

const dir = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

fs.writeFileSync(
  path.join(dir, 'labTests.ts'),
  \`export interface LabTest {
  id: string;
  name: string;
  category: string;
  price: number;
  discountPrice: number;
  type: "Test" | "Package";
  turnaroundTime: string;
  fastingRequired: boolean;
}

export const labTests: LabTest[] = \${JSON.stringify(uniqueTests, null, 2)};
\`
);
console.log(\`Successfully generated \${uniqueTests.length} tests in src/data/labTests.ts\`);
