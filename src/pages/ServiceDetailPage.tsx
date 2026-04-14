import { useParams, useNavigate, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Phone,
  MessageCircle,
  Microscope, 
  TestTube2, 
  HeartPulse, 
  Dna, 
  Syringe, 
  FileSearch,
  Droplet,
  Baby,
  Pill,
  Stethoscope,
  AlertCircle
} from "lucide-react";

const WHATSAPP_NUMBER = "917649885936";

const servicesData = [
  {
    id: "clinical",
    icon: TestTube2,
    title: "Clinical Laboratory Testing",
    shortDesc: "Comprehensive diagnostic tests including blood chemistry, hematology, urinalysis, and immunology.",
    fullDescription: `Our Clinical Laboratory Testing department is equipped with state-of-the-art automated analyzers that deliver precise and rapid results. We offer a comprehensive range of diagnostic tests essential for disease detection, monitoring, and prevention.

Our clinical laboratory operates under strict quality control measures and is staffed by experienced medical technologists who ensure accuracy in every test. We use advanced automation to minimize human error and maximize efficiency.`,
    tests: ["Complete Blood Count (CBC)", "Metabolic Panels (BMP, CMP)", "Urinalysis", "Coagulation Studies", "Serology Tests", "Electrolyte Panel", "Glucose Testing", "Hemoglobin A1C"],
    turnaround: "Same day - 24 hours",
    preparation: [
      "Fasting may be required for certain tests (8-12 hours)",
      "Inform about current medications",
      "Drink plenty of water before blood draw",
      "Avoid alcohol 24 hours before testing"
    ],
    price: "Starting from ₹200"
  },
  {
    id: "anatomic",
    icon: Microscope,
    title: "Anatomic Pathology",
    shortDesc: "Expert tissue examination for accurate disease diagnosis.",
    fullDescription: `Our Anatomic Pathology department specializes in examining tissue samples to diagnose diseases with precision. Our board-certified pathologists bring decades of combined experience in interpreting complex cases.

We provide comprehensive surgical pathology services including frozen sections for intraoperative consultation, helping surgeons make critical decisions during surgery. Our department is equipped with digital pathology capabilities for second opinions and teleconsultation.`,
    tests: ["Surgical Pathology", "Frozen Sections", "Special Stains", "Consultation Services", "Biopsy Analysis", "Tumor Grading", "Margin Assessment"],
    turnaround: "2-5 working days",
    preparation: [
      "Biopsy specimens must be properly preserved",
      "Previous pathology reports if available",
      "Clinical history and imaging results helpful",
      "Doctor's requisition form required"
    ],
    price: "Starting from ₹1,500"
  },
  {
    id: "cardiac",
    icon: HeartPulse,
    title: "Cardiac Markers",
    shortDesc: "Complete cardiac panel for heart health assessment.",
    fullDescription: `Our Cardiac Markers panel provides essential biomarkers for diagnosing and monitoring heart conditions. Early detection of heart disease is crucial, and our comprehensive testing helps identify risk factors before they become critical.

We offer rapid turnaround for emergency cardiac markers like Troponin, essential for diagnosing heart attacks. Our preventive cardiac panels help assess long-term cardiovascular risk.`,
    tests: ["Troponin I & T", "BNP/NT-proBNP", "Lipid Profile", "hs-CRP", "Homocysteine", "Lipoprotein(a)", "D-Dimer", "CPK-MB"],
    turnaround: "Same day (Troponin: 1 hour STAT)",
    preparation: [
      "12-hour fasting for lipid profile",
      "Avoid strenuous exercise before testing",
      "Inform about heart medications",
      "List any recent chest pain episodes"
    ],
    price: "Starting from ₹500"
  },
  {
    id: "molecular",
    icon: Dna,
    title: "Molecular Diagnostics",
    shortDesc: "Advanced PCR and genetic testing technologies.",
    fullDescription: `Our Molecular Diagnostics laboratory uses cutting-edge PCR, gene sequencing, and molecular testing technologies. This department is essential for accurate infectious disease detection, cancer marker identification, and genetic screening.

We maintain the highest standards of molecular testing with validated assays and participate in external quality assurance programs to ensure our results meet international standards.`,
    tests: ["RT-PCR Testing", "Genetic Markers", "Infectious Disease Panels", "Pharmacogenomics", "HPV Genotyping", "COVID-19 PCR", "TB PCR", "Hepatitis Viral Load"],
    turnaround: "24-72 hours",
    preparation: [
      "Specific sample collection requirements vary by test",
      "Some tests require fasting",
      "Inform about recent antibiotic use",
      "Genetic counseling recommended for hereditary tests"
    ],
    price: "Starting from ₹1,000"
  },
  {
    id: "cytopathology",
    icon: Syringe,
    title: "Cytopathology",
    shortDesc: "Specialized cell analysis for cancer screening.",
    fullDescription: `Our Cytopathology department provides expert analysis of cellular samples for cancer screening and diagnosis. We specialize in Pap smears, fine needle aspiration cytology (FNAC), and body fluid analysis.

Our cytopathologists are trained in the latest techniques for early cancer detection. We use liquid-based cytology for improved specimen quality and more accurate results.`,
    tests: ["Pap Smears", "FNAC", "Body Fluid Cytology", "Thyroid FNA", "Breast FNA", "Lymph Node FNA", "Pleural Fluid Analysis"],
    turnaround: "2-3 working days",
    preparation: [
      "For Pap smear: avoid intercourse 48 hours before",
      "Schedule between menstrual periods",
      "FNA sites should be clean and dry",
      "Bring previous cytology reports"
    ],
    price: "Starting from ₹800"
  },
  {
    id: "histopathology",
    icon: FileSearch,
    title: "Histopathology",
    shortDesc: "Detailed tissue examination with immunohistochemistry.",
    fullDescription: `Our Histopathology department offers comprehensive tissue analysis services including routine histology, special stains, and immunohistochemistry (IHC). We use the latest tissue processing techniques for optimal specimen quality.

Our IHC panel helps in precise cancer typing, which is essential for treatment planning. We offer digital pathology services for remote consultation and second opinions.`,
    tests: ["Tissue Biopsies", "IHC Markers", "Special Stains", "Digital Pathology", "Cancer Grading", "ER/PR/HER2", "Ki-67", "Tumor Markers"],
    turnaround: "3-7 working days",
    preparation: [
      "Specimens must be properly fixed in formalin",
      "Include clinical history with requisition",
      "Previous biopsy reports helpful for comparison",
      "Imaging reports aid interpretation"
    ],
    price: "Starting from ₹2,000"
  },
  {
    id: "hematology",
    icon: Droplet,
    title: "Hematology & Coagulation",
    shortDesc: "Complete blood disorder diagnostics.",
    fullDescription: `Our Hematology department provides comprehensive testing for blood disorders including anemia, bleeding disorders, and blood cancers. We use automated hematology analyzers with advanced flagging systems.

Our coagulation laboratory offers complete testing for bleeding and clotting disorders, essential for surgical planning and anticoagulation monitoring.`,
    tests: ["CBC with Differential", "Peripheral Blood Smear", "Coagulation Panel (PT, APTT)", "Bone Marrow Analysis", "Hemoglobin Electrophoresis", "Iron Studies", "Reticulocyte Count"],
    turnaround: "Same day - 24 hours",
    preparation: [
      "Fasting not usually required",
      "Inform about blood thinning medications",
      "Note any recent bleeding episodes",
      "Previous hematology reports helpful"
    ],
    price: "Starting from ₹300"
  },
  {
    id: "prenatal",
    icon: Baby,
    title: "Prenatal & Fertility Testing",
    shortDesc: "Comprehensive testing for expecting mothers.",
    fullDescription: `Our Prenatal and Fertility Testing services support family planning and maternal health. We offer non-invasive prenatal testing (NIPT), first trimester screening, and comprehensive fertility assessments.

Our hormone panels help diagnose and monitor fertility conditions. We work closely with obstetricians and fertility specialists to provide optimal patient care.`,
    tests: ["NIPT (Non-Invasive Prenatal Testing)", "First Trimester Screening", "AMH (Anti-Müllerian Hormone)", "Hormone Panels", "Beta HCG", "Double/Triple Marker", "Fertility Workup"],
    turnaround: "3-7 working days",
    preparation: [
      "Timing may be critical for hormone tests",
      "Fasting may be required for some tests",
      "Know your last menstrual period date",
      "Bring previous test results"
    ],
    price: "Starting from ₹1,500"
  },
  {
    id: "toxicology",
    icon: Pill,
    title: "Toxicology & Drug Testing",
    shortDesc: "Clinical and forensic toxicology services.",
    fullDescription: `Our Toxicology department provides clinical and workplace drug testing services. We offer therapeutic drug monitoring to ensure patients receive optimal medication doses.

Our substance abuse screening panels meet SAMHSA guidelines and are suitable for pre-employment, random, and post-accident testing.`,
    tests: ["Drug Screening Panels (5, 10, 12 panel)", "Therapeutic Drug Levels", "Heavy Metal Testing", "Alcohol Testing", "Nicotine/Cotinine", "Prescription Drug Monitoring"],
    turnaround: "Same day - 48 hours",
    preparation: [
      "Chain of custody required for workplace testing",
      "Valid ID required",
      "Note time of last medication dose",
      "Avoid poppy seeds before opiate testing"
    ],
    price: "Starting from ₹500"
  },
  {
    id: "microbiology",
    icon: Stethoscope,
    title: "Microbiology",
    shortDesc: "Culture and sensitivity testing for infections.",
    fullDescription: `Our Microbiology department provides comprehensive testing for bacterial, fungal, and parasitic infections. We use automated culture systems for rapid organism identification.

Antibiotic sensitivity testing helps physicians prescribe the most effective treatment. Our AFB laboratory follows strict biosafety protocols for tuberculosis testing.`,
    tests: ["Blood Cultures", "Urine Cultures", "Antibiotic Sensitivity", "AFB Testing", "Stool Culture", "Wound Culture", "Fungal Culture", "Sputum Culture"],
    turnaround: "24-72 hours (preliminary), 5-7 days (final)",
    preparation: [
      "Collect samples before starting antibiotics if possible",
      "Use sterile collection containers",
      "Transport samples quickly to lab",
      "Follow specific collection instructions"
    ],
    price: "Starting from ₹400"
  }
];

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const service = servicesData.find(s => s.id === serviceId);

  if (!service) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
          <p className="text-muted-foreground mb-6">The service you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/services")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Button>
        </div>
      </Layout>
    );
  }

  const Icon = service.icon;

  return (
    <Layout>
      <section className="py-6 md:py-8 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container px-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 md:mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="h-14 w-14 md:h-16 md:w-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground">{service.title}</h1>
                  <p className="text-muted-foreground mt-2">{service.shortDesc}</p>
                </div>
              </div>

              <Card>
                <CardContent className="p-4 md:p-6">
                  <h2 className="text-lg font-semibold mb-4">About This Service</h2>
                  <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                    {service.fullDescription}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 md:p-6">
                  <h2 className="text-lg font-semibold mb-4">Tests Available</h2>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {service.tests.map((test, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                        <span>{test}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 md:p-6">
                  <h2 className="text-lg font-semibold mb-4">Preparation Guidelines</h2>
                  <ul className="space-y-3 text-muted-foreground">
                    {service.preparation.map((prep, idx) => (
                      <li key={idx} className="flex gap-3 text-sm">
                        <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span>{prep}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-4 md:p-6">
                  <div className="text-center mb-6">
                    <p className="text-sm text-muted-foreground mb-1">Price Range</p>
                    <p className="text-2xl md:text-3xl font-bold text-primary">{service.price}</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <Clock className="h-4 w-4" />
                        Turnaround Time
                      </div>
                      <p className="font-semibold text-sm">{service.turnaround}</p>
                    </div>
                  </div>

                  <Button size="lg" className="w-full mb-3" asChild>
                    <Link to="/book-appointment">
                      Book Test
                    </Link>
                  </Button>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" asChild>
                      <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </a>
                    </Button>
                    <Button variant="outline" className="flex-1" asChild>
                      <a href={`tel:+${WHATSAPP_NUMBER}`}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </a>
                    </Button>
                  </div>

                  <div className="border-t mt-6 pt-6">
                    <h4 className="font-semibold text-sm mb-3">Why Choose Us?</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        NABL Accredited Lab
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        Expert Pathologists
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        Home Sample Collection
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success" />
                        Digital Reports
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetailPage;
