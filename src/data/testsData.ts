export const categories = ["All", "Hematology", "Biochemistry", "Endocrinology", "Microbiology", "Molecular", "Immunology", "Serology", "Histopathology", "Cytology", "Cardiac", "Allergy", "Packages"];

export const tests = [
  // Hematology Tests
  { name: "COMPLETE BLOOD COUNT (CBC)", category: "Hematology", price: 350, turnaround: "Same Day", description: "Measures red cells, white cells, hemoglobin, and platelets", includedTests: Array(15).fill("") },
  { name: "HbA1c; GLYCOSYLATED HEMOGLOBIN", category: "Biochemistry", price: 430, turnaround: "Same Day", description: "Average blood sugar over 2-3 months for diabetes monitoring", includedTests: Array(1).fill("") },
  { name: "THYROID PROFILE TOTAL", category: "Endocrinology", price: 540, turnaround: "Same Day", description: "Complete thyroid function assessment (T3, T4, TSH)", includedTests: Array(6).fill("") },
  { name: "URINE EXAMINATION, ROUTINE; URINE, R/E", category: "Biochemistry", price: 120, turnaround: "Same Day", description: "Physical, chemical, and microscopic urine analysis", includedTests: Array(15).fill("") },
  { name: "LIVER FUNCTION TEST (LFT)", category: "Biochemistry", price: 790, turnaround: "Same Day", description: "SGOT, SGPT, Bilirubin, ALP, and proteins", includedTests: Array(12).fill("") },
  { name: "KIDNEY FUNCTION TEST (KFT)", category: "Biochemistry", price: 840, turnaround: "Same Day", description: "Creatinine, BUN, uric acid, and electrolytes", includedTests: Array(10).fill("") },
  { name: "LIPID PROFILE BASIC", category: "Biochemistry", price: 990, turnaround: "Same Day", description: "Cholesterol, triglycerides, HDL, LDL levels", includedTests: Array(8).fill("") },
  { name: "VITAMIN D 25 - HYDROXY", category: "Biochemistry", price: 1530, turnaround: "24 Hours", description: "Measures vitamin D levels in blood", includedTests: Array(1).fill("") },
  { name: "VITAMIN B12; CYANOCOBALAMIN", category: "Biochemistry", price: 1180, turnaround: "24 Hours", description: "Checks for B12 deficiency", includedTests: Array(1).fill("") },
  { name: "ESR; ERYTHROCYTE SEDIMENTATION RATE", category: "Hematology", price: 140, turnaround: "Same Day", description: "Erythrocyte sedimentation rate for inflammation", includedTests: Array(1).fill("") },
  
  // Biochemistry Tests
  { name: "Hemoglobin A1c (HbA1c)", category: "Biochemistry", price: 650, turnaround: "24 Hours", description: "Average blood sugar over 2-3 months for diabetes monitoring" },
  { name: "Lipid Profile", category: "Biochemistry", price: 730, turnaround: "Same Day", description: "Cholesterol, triglycerides, HDL, LDL levels" },
  { name: "Liver Function Test (LFT)", category: "Biochemistry", price: 870, turnaround: "Same Day", description: "SGOT, SGPT, Bilirubin, ALP, and proteins" },
  { name: "Kidney Function Test (KFT/RFT)", category: "Biochemistry", price: 800, turnaround: "Same Day", description: "Creatinine, BUN, uric acid, and electrolytes" },
  { name: "Urine Routine & Microscopy", category: "Biochemistry", price: 220, turnaround: "Same Day", description: "Physical, chemical, and microscopic urine analysis" },
  { name: "Blood Sugar Fasting", category: "Biochemistry", price: 120, turnaround: "Same Day", description: "Fasting glucose level measurement" },
  { name: "Blood Sugar PP (Post Prandial)", category: "Biochemistry", price: 120, turnaround: "Same Day", description: "Post-meal glucose level" },
  { name: "Random Blood Sugar", category: "Biochemistry", price: 120, turnaround: "Same Day", description: "Blood glucose at any time" },
  { name: "GTT (Glucose Tolerance Test)", category: "Biochemistry", price: 580, turnaround: "Same Day", description: "Diagnosis of diabetes and prediabetes" },
  { name: "Vitamin D (25-OH)", category: "Biochemistry", price: 1740, turnaround: "24 Hours", description: "Measures vitamin D levels in blood" },
  { name: "Vitamin B12", category: "Biochemistry", price: 1310, turnaround: "24 Hours", description: "Checks for B12 deficiency" },
  { name: "Folic Acid", category: "Biochemistry", price: 1090, turnaround: "24 Hours", description: "Vitamin B9 level assessment" },
  { name: "Serum Calcium", category: "Biochemistry", price: 290, turnaround: "Same Day", description: "Blood calcium level measurement" },
  { name: "Serum Electrolytes", category: "Biochemistry", price: 580, turnaround: "Same Day", description: "Sodium, potassium, chloride levels" },
  { name: "Magnesium", category: "Biochemistry", price: 510, turnaround: "Same Day", description: "Magnesium level in blood" },
  { name: "Phosphorus", category: "Biochemistry", price: 290, turnaround: "Same Day", description: "Phosphorus level measurement" },
  { name: "Uric Acid", category: "Biochemistry", price: 290, turnaround: "Same Day", description: "Gout and kidney function marker" },
  { name: "Serum Protein Electrophoresis", category: "Biochemistry", price: 2180, turnaround: "48 Hours", description: "Protein pattern analysis" },
  { name: "Ammonia", category: "Biochemistry", price: 870, turnaround: "Same Day", description: "Liver function and metabolic assessment" },
  { name: "Lactate", category: "Biochemistry", price: 580, turnaround: "Same Day", description: "Tissue oxygenation marker" },
  
  // Endocrinology Tests
  { name: "Thyroid Panel (T3, T4, TSH)", category: "Endocrinology", price: 1020, turnaround: "24 Hours", description: "Complete thyroid function assessment" },
  { name: "TSH", category: "Endocrinology", price: 510, turnaround: "24 Hours", description: "Thyroid stimulating hormone" },
  { name: "Free T3", category: "Endocrinology", price: 510, turnaround: "24 Hours", description: "Active thyroid hormone" },
  { name: "Free T4", category: "Endocrinology", price: 510, turnaround: "24 Hours", description: "Thyroxine hormone level" },
  { name: "Testosterone (Total)", category: "Endocrinology", price: 1020, turnaround: "24 Hours", description: "Male hormone level assessment" },
  { name: "Free Testosterone", category: "Endocrinology", price: 1450, turnaround: "48 Hours", description: "Bioavailable testosterone level" },
  { name: "Estradiol (E2)", category: "Endocrinology", price: 1160, turnaround: "24 Hours", description: "Estrogen hormone level" },
  { name: "Progesterone", category: "Endocrinology", price: 1020, turnaround: "24 Hours", description: "Female reproductive hormone" },
  { name: "LH (Luteinizing Hormone)", category: "Endocrinology", price: 870, turnaround: "24 Hours", description: "Reproductive hormone" },
  { name: "FSH (Follicle Stimulating Hormone)", category: "Endocrinology", price: 870, turnaround: "24 Hours", description: "Fertility hormone" },
  { name: "Prolactin", category: "Endocrinology", price: 940, turnaround: "24 Hours", description: "Pituitary hormone assessment" },
  { name: "Cortisol (Morning)", category: "Endocrinology", price: 1020, turnaround: "24 Hours", description: "Stress hormone measurement" },
  { name: "DHEA-S", category: "Endocrinology", price: 1310, turnaround: "48 Hours", description: "Adrenal hormone level" },
  { name: "Insulin Fasting", category: "Endocrinology", price: 870, turnaround: "24 Hours", description: "Insulin resistance assessment" },
  { name: "C-Peptide", category: "Endocrinology", price: 1740, turnaround: "48 Hours", description: "Insulin production marker" },
  { name: "Growth Hormone", category: "Endocrinology", price: 1450, turnaround: "48 Hours", description: "GH level assessment" },
  { name: "IGF-1", category: "Endocrinology", price: 2180, turnaround: "72 Hours", description: "Growth factor measurement" },
  { name: "PTH (Parathyroid Hormone)", category: "Endocrinology", price: 1740, turnaround: "48 Hours", description: "Calcium regulation hormone" },
  { name: "AMH (Anti-Mullerian Hormone)", category: "Endocrinology", price: 3630, turnaround: "72 Hours", description: "Ovarian reserve marker" },
  { name: "Beta HCG", category: "Endocrinology", price: 730, turnaround: "Same Day", description: "Pregnancy hormone detection" },
  
  // Microbiology Tests
  { name: "Blood Culture", category: "Microbiology", price: 1160, turnaround: "3-5 Days", description: "Detection of bacteria in bloodstream" },
  { name: "Urine Culture & Sensitivity", category: "Microbiology", price: 940, turnaround: "2-3 Days", description: "Identifies urinary tract infection organisms" },
  { name: "Stool Culture", category: "Microbiology", price: 1020, turnaround: "3-5 Days", description: "Detects intestinal bacterial infections" },
  { name: "Throat Swab Culture", category: "Microbiology", price: 800, turnaround: "2-3 Days", description: "Identifies throat infection bacteria" },
  { name: "Sputum Culture & Sensitivity", category: "Microbiology", price: 1020, turnaround: "3-5 Days", description: "Respiratory infection diagnosis" },
  { name: "Wound Swab Culture", category: "Microbiology", price: 870, turnaround: "2-3 Days", description: "Wound infection identification" },
  { name: "AFB Culture (TB)", category: "Microbiology", price: 2180, turnaround: "6-8 Weeks", description: "Tuberculosis detection" },
  { name: "AFB Smear (ZN Stain)", category: "Microbiology", price: 440, turnaround: "Same Day", description: "Rapid TB screening" },
  { name: "Fungal Culture", category: "Microbiology", price: 1160, turnaround: "2-4 Weeks", description: "Fungal infection identification" },
  { name: "KOH Mount", category: "Microbiology", price: 220, turnaround: "Same Day", description: "Rapid fungal detection" },
  
  // Molecular Tests
  { name: "COVID-19 RT-PCR", category: "Molecular", price: 730, turnaround: "24 Hours", description: "Detection of SARS-CoV-2 virus" },
  { name: "Hepatitis B Viral Load (HBV DNA)", category: "Molecular", price: 6530, turnaround: "3-5 Days", description: "HBV quantification" },
  { name: "Hepatitis C Viral Load (HCV RNA)", category: "Molecular", price: 7250, turnaround: "3-5 Days", description: "HCV quantification" },
  { name: "HIV Viral Load", category: "Molecular", price: 7980, turnaround: "3-5 Days", description: "HIV RNA quantification" },
  { name: "TB PCR (GeneXpert)", category: "Molecular", price: 3630, turnaround: "24 Hours", description: "Rapid tuberculosis detection" },
  { name: "HPV DNA Test", category: "Molecular", price: 5080, turnaround: "5-7 Days", description: "Human papillomavirus detection" },
  { name: "Dengue NS1 Ag + IgG/IgM", category: "Molecular", price: 1740, turnaround: "Same Day", description: "Complete dengue panel" },
  { name: "Chikungunya IgM", category: "Molecular", price: 1160, turnaround: "24 Hours", description: "Chikungunya virus detection" },
  { name: "Malaria Antigen (Rapid)", category: "Molecular", price: 580, turnaround: "Same Day", description: "Rapid malaria detection" },
  { name: "Typhoid (Widal Test)", category: "Molecular", price: 440, turnaround: "Same Day", description: "Typhoid fever screening" },
  
  // Immunology Tests
  { name: "CRP (C-Reactive Protein)", category: "Immunology", price: 580, turnaround: "Same Day", description: "Marker of inflammation and infection" },
  { name: "hs-CRP", category: "Immunology", price: 870, turnaround: "Same Day", description: "High-sensitivity cardiac risk marker" },
  { name: "RA Factor", category: "Immunology", price: 650, turnaround: "Same Day", description: "Rheumatoid arthritis marker" },
  { name: "Anti-CCP", category: "Immunology", price: 2180, turnaround: "48 Hours", description: "Specific RA antibody test" },
  { name: "ANA (Antinuclear Antibody)", category: "Immunology", price: 1740, turnaround: "48 Hours", description: "Autoimmune disease screening" },
  { name: "Anti-dsDNA", category: "Immunology", price: 2180, turnaround: "72 Hours", description: "Lupus marker" },
  { name: "ASO Titre", category: "Immunology", price: 580, turnaround: "Same Day", description: "Streptococcal infection marker" },
  { name: "Procalcitonin", category: "Immunology", price: 2900, turnaround: "Same Day", description: "Bacterial infection severity marker" },
  { name: "IL-6 (Interleukin-6)", category: "Immunology", price: 3630, turnaround: "24 Hours", description: "Inflammation marker" },
  { name: "Complement C3 & C4", category: "Immunology", price: 2610, turnaround: "48 Hours", description: "Immune system proteins" },
  
  // Serology Tests
  { name: "HIV 1 & 2 Antibody", category: "Serology", price: 730, turnaround: "Same Day", description: "HIV screening test" },
  { name: "HBsAg (Hepatitis B Surface Antigen)", category: "Serology", price: 580, turnaround: "Same Day", description: "Hepatitis B screening" },
  { name: "Anti-HCV", category: "Serology", price: 870, turnaround: "Same Day", description: "Hepatitis C antibody test" },
  { name: "VDRL/RPR", category: "Serology", price: 360, turnaround: "Same Day", description: "Syphilis screening" },
  { name: "Hepatitis B Panel", category: "Serology", price: 3630, turnaround: "48 Hours", description: "Complete HBV markers" },
  { name: "Anti-HAV IgM", category: "Serology", price: 1160, turnaround: "24 Hours", description: "Hepatitis A acute infection" },
  { name: "Anti-HEV IgM", category: "Serology", price: 1310, turnaround: "24 Hours", description: "Hepatitis E acute infection" },
  { name: "CMV IgG/IgM", category: "Serology", price: 1740, turnaround: "48 Hours", description: "Cytomegalovirus infection" },
  { name: "EBV Panel", category: "Serology", price: 2900, turnaround: "72 Hours", description: "Epstein-Barr virus markers" },
  { name: "Rubella IgG/IgM", category: "Serology", price: 1450, turnaround: "48 Hours", description: "German measles immunity" },
  { name: "TORCH Panel", category: "Serology", price: 5080, turnaround: "72 Hours", description: "Prenatal infection screening" },
  
  // Cardiac Markers
  { name: "Troponin I", category: "Cardiac", price: 1160, turnaround: "Same Day", description: "Heart attack marker" },
  { name: "Troponin T (hs)", category: "Cardiac", price: 1740, turnaround: "Same Day", description: "High-sensitivity cardiac marker" },
  { name: "CK-MB", category: "Cardiac", price: 730, turnaround: "Same Day", description: "Heart muscle enzyme" },
  { name: "NT-proBNP", category: "Cardiac", price: 3630, turnaround: "Same Day", description: "Heart failure marker" },
  { name: "BNP", category: "Cardiac", price: 2900, turnaround: "Same Day", description: "Heart strain marker" },
  { name: "Homocysteine", category: "Cardiac", price: 1740, turnaround: "48 Hours", description: "Cardiovascular risk factor" },
  { name: "Lipoprotein(a)", category: "Cardiac", price: 2180, turnaround: "48 Hours", description: "Inherited cardiac risk marker" },
  { name: "Apolipoprotein A1 & B", category: "Cardiac", price: 2610, turnaround: "48 Hours", description: "Advanced lipid markers" },
  
  // Tumor Markers
  { name: "PSA (Prostate Specific Antigen)", category: "Immunology", price: 1020, turnaround: "24 Hours", description: "Prostate cancer screening marker" },
  { name: "Free PSA Ratio", category: "Immunology", price: 1740, turnaround: "48 Hours", description: "Prostate cancer risk assessment" },
  { name: "CA-125", category: "Immunology", price: 1740, turnaround: "48 Hours", description: "Ovarian cancer marker" },
  { name: "CA 19-9", category: "Immunology", price: 1740, turnaround: "48 Hours", description: "Pancreatic cancer marker" },
  { name: "CA 15-3", category: "Immunology", price: 1740, turnaround: "48 Hours", description: "Breast cancer marker" },
  { name: "CEA", category: "Immunology", price: 1450, turnaround: "48 Hours", description: "Colorectal cancer marker" },
  { name: "AFP (Alpha Fetoprotein)", category: "Immunology", price: 1310, turnaround: "24 Hours", description: "Liver cancer and prenatal marker" },
  { name: "Thyroglobulin", category: "Immunology", price: 2180, turnaround: "72 Hours", description: "Thyroid cancer monitoring" },
  
  // Allergy Tests
  { name: "Total IgE", category: "Allergy", price: 1020, turnaround: "24 Hours", description: "Overall allergy indicator" },
  { name: "Specific IgE Panel (Food)", category: "Allergy", price: 6530, turnaround: "5-7 Days", description: "Food allergy testing" },
  { name: "Specific IgE Panel (Inhalant)", category: "Allergy", price: 6530, turnaround: "5-7 Days", description: "Environmental allergy testing" },
  { name: "Absolute Eosinophil Count", category: "Allergy", price: 220, turnaround: "Same Day", description: "Allergic response marker" },
  
  // Histopathology & Cytology
  { name: "Tissue Biopsy", category: "Histopathology", price: 2180, turnaround: "5-7 Days", description: "Tissue sample examination" },
  { name: "FNAC", category: "Cytology", price: 1160, turnaround: "2-3 Days", description: "Fine needle aspiration cytology" },
  { name: "Pap Smear", category: "Cytology", price: 730, turnaround: "2-3 Days", description: "Cervical cancer screening" },
  { name: "Liquid-Based Cytology (LBC)", category: "Cytology", price: 2180, turnaround: "3-5 Days", description: "Advanced cervical screening" },
  { name: "Fluid Cytology", category: "Cytology", price: 1020, turnaround: "2-3 Days", description: "Body fluid cell analysis" },
  { name: "IHC Markers", category: "Histopathology", price: 3630, turnaround: "7-10 Days", description: "Immunohistochemistry for cancer typing" },
  
  // Anti-TPO moved to Immunology
  { name: "Anti-TPO Antibodies", category: "Immunology", price: 1160, turnaround: "48 Hours", description: "Autoimmune thyroid disease marker" },
  { name: "Anti-Thyroglobulin Antibodies", category: "Immunology", price: 1160, turnaround: "48 Hours", description: "Thyroid autoimmune marker" },

  // Dr. Lal Path Lab Packages
  { name: "Swasth Super-1", category: "Packages", price: 1450, turnaround: "24-48 Hours", description: "Dr. Lal Path Lab - Basic health screening package" },
  { name: "Swasth Super-2", category: "Packages", price: 1880, turnaround: "24-48 Hours", description: "Dr. Lal Path Lab - Enhanced health screening package" },
  { name: "Swasth Super-3", category: "Packages", price: 2900, turnaround: "24-48 Hours", description: "Dr. Lal Path Lab - Comprehensive health screening package" },
  { name: "Swasth Super-4", category: "Packages", price: 3330, turnaround: "24-48 Hours", description: "Dr. Lal Path Lab - Premium health screening package" },
  
  // Agilus Lab Packages
  { name: "Agilus Screen-1", category: "Packages", price: 1880, turnaround: "24-48 Hours", description: "Agilus Lab - Basic diagnostic screening package" },
  { name: "Agilus Screen-2", category: "Packages", price: 2750, turnaround: "24-48 Hours", description: "Agilus Lab - Standard diagnostic screening package" },
  { name: "Agilus Screen-3", category: "Packages", price: 3040, turnaround: "24-48 Hours", description: "Agilus Lab - Advanced diagnostic screening package" },
  { name: "Agilus Screen-4", category: "Packages", price: 4350, turnaround: "24-48 Hours", description: "Agilus Lab - Comprehensive diagnostic screening package" },
  
  // Swasth Bhartiya Packages
  { name: "Swasth Bhartiya 1.0", category: "Packages", price: 1010, turnaround: "24-48 Hours", description: "Basic Indian health checkup package" },
  { name: "Swasth Bhartiya 2.0", category: "Packages", price: 1160, turnaround: "24-48 Hours", description: "Standard Indian health checkup package" },
  { name: "Swasth Bhartiya 3.0", category: "Packages", price: 1300, turnaround: "24-48 Hours", description: "Enhanced Indian health checkup package" },
  { name: "Swasth Bhartiya 4.0", category: "Packages", price: 1450, turnaround: "24-48 Hours", description: "Advanced Indian health checkup package" },
  { name: "Swasth Bhartiya 5.0", category: "Packages", price: 2610, turnaround: "24-48 Hours", description: "Premium Indian health checkup package" },
];

export const packages = [
  { 
    name: "Basic Health Checkup", 
    price: 2170, 
    tests: ["CBC", "Lipid Profile", "Blood Sugar Fasting", "Urine Routine", "LFT", "KFT"],
    description: "Essential tests for routine health monitoring"
  },
  { 
    name: "Comprehensive Health Package", 
    price: 5800, 
    tests: ["All Basic Tests", "Thyroid Panel", "Vitamin D", "B12", "Iron Studies", "HbA1c"],
    description: "Complete wellness assessment for adults"
  },
  { 
    name: "Cardiac Health Package", 
    price: 4350, 
    tests: ["Lipid Profile", "hs-CRP", "Homocysteine", "Troponin", "ECG"],
    description: "Heart health risk assessment"
  },
  { 
    name: "Diabetes Care Package", 
    price: 3620, 
    tests: ["Fasting Glucose", "HbA1c", "Post-Meal Glucose", "Lipid Profile", "KFT", "Urine Microalbumin"],
    description: "Comprehensive diabetes monitoring"
  },
  { 
    name: "Women's Health Package", 
    price: 7250, 
    tests: ["CBC", "Thyroid Panel", "Vitamin D & B12", "Iron Studies", "Pap Smear", "AMH"],
    description: "Complete women's wellness checkup"
  },
  { 
    name: "Senior Citizen Package", 
    price: 8700, 
    tests: ["CBC", "LFT", "KFT", "Lipid Profile", "Thyroid", "PSA/CA-125", "Vitamin Panel", "HbA1c"],
    description: "Comprehensive package for 60+ age group"
  },
  { 
    name: "Pre-Employment Package", 
    price: 2900, 
    tests: ["CBC", "Urine Routine", "Blood Sugar", "HIV", "HBsAg", "Chest X-Ray"],
    description: "Standard employment health screening"
  },
  { 
    name: "Fever Panel", 
    price: 2900, 
    tests: ["CBC", "Dengue NS1", "Malaria", "Typhoid", "Urine Culture", "CRP"],
    description: "Complete fever investigation"
  },
];

// Partner labs
export const partnerLabs = [
  { name: "Labwala Health Diagnostics", logo: "LH" },
  { name: "Dr. Lal Path Lab", logo: "LP" },
  { name: "Metropolis Lab", logo: "ML" },
  { name: "Thyrocare Lab", logo: "TC" },
  { name: "Pathkind Lab", logo: "PK" },
  { name: "Redcliffe Lab", logo: "RC" },
  { name: "Agilus Lab", logo: "AG" },
];

// Format price in Indian Rupees
export const formatINR = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

// Generate slug from test name
export const generateSlug = (name: string) => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
};
