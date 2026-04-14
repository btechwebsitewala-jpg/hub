import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
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
  ArrowRight
} from "lucide-react";

const services = [
  {
    id: "clinical",
    icon: TestTube2,
    title: "Clinical Laboratory Testing",
    description: "Our comprehensive clinical laboratory provides a wide range of diagnostic tests including blood chemistry, hematology, urinalysis, and immunology. We use advanced automated analyzers to ensure accuracy and rapid turnaround times.",
    tests: ["Complete Blood Count", "Metabolic Panels", "Urinalysis", "Coagulation Studies", "Serology Tests"]
  },
  {
    id: "anatomic",
    icon: Microscope,
    title: "Anatomic Pathology",
    description: "Expert pathologists examine tissue samples to diagnose diseases. Our surgical pathology services cover biopsies, tumor analysis, and frozen sections for intraoperative consultations.",
    tests: ["Surgical Pathology", "Frozen Sections", "Special Stains", "Consultation Services"]
  },
  {
    id: "cardiac",
    icon: HeartPulse,
    title: "Cardiac Markers",
    description: "Complete cardiac panel for heart health assessment. Early detection of heart disease through specialized cardiac biomarkers and risk assessment panels.",
    tests: ["Troponin", "BNP/NT-proBNP", "Lipid Profile", "hs-CRP", "Homocysteine"]
  },
  {
    id: "molecular",
    icon: Dna,
    title: "Molecular Diagnostics",
    description: "State-of-the-art molecular testing using PCR and genetic sequencing technologies. Essential for infectious disease detection, cancer markers, and genetic screening.",
    tests: ["PCR Testing", "Genetic Markers", "Infectious Disease Panels", "Pharmacogenomics"]
  },
  {
    id: "cytopathology",
    icon: Syringe,
    title: "Cytopathology",
    description: "Specialized cell analysis for cancer screening and diagnosis. Our cytopathology lab provides Pap smears, fine needle aspiration cytology, and body fluid analysis.",
    tests: ["Pap Smears", "FNAC", "Body Fluid Cytology", "Thyroid FNA"]
  },
  {
    id: "histopathology",
    icon: FileSearch,
    title: "Histopathology",
    description: "Detailed tissue examination by board-certified pathologists. Immunohistochemistry services for precise cancer typing and treatment planning.",
    tests: ["Tissue Biopsies", "IHC Markers", "Special Stains", "Digital Pathology"]
  },
  {
    id: "hematology",
    icon: Droplet,
    title: "Hematology & Coagulation",
    description: "Complete blood disorder diagnostics including anemia workups, bleeding disorders, and bone marrow analysis.",
    tests: ["CBC with Differential", "Peripheral Smear", "Coagulation Panel", "Bone Marrow Analysis"]
  },
  {
    id: "prenatal",
    icon: Baby,
    title: "Prenatal & Fertility Testing",
    description: "Comprehensive testing for expecting mothers and fertility assessments. Non-invasive prenatal testing and hormone panels.",
    tests: ["NIPT", "First Trimester Screening", "AMH", "Hormone Panels"]
  },
  {
    id: "toxicology",
    icon: Pill,
    title: "Toxicology & Drug Testing",
    description: "Clinical and forensic toxicology services including therapeutic drug monitoring and substance abuse screening.",
    tests: ["Drug Screening Panels", "Therapeutic Drug Levels", "Heavy Metal Testing"]
  },
  {
    id: "microbiology",
    icon: Stethoscope,
    title: "Microbiology",
    description: "Culture and sensitivity testing for bacterial, fungal, and parasitic infections. Rapid identification for timely treatment decisions.",
    tests: ["Blood Cultures", "Urine Cultures", "Antibiotic Sensitivity", "AFB Testing"]
  }
];

const ServicesPage = () => {
  return (
    <Layout>
      <SEOHead
        title="Diagnostic Services - Lab Tests & Pathology"
        description="Comprehensive diagnostic services at Diagnostics Hub Rewa - clinical lab testing, molecular diagnostics, cardiac markers, histopathology & more. Book now!"
        canonical="/services"
        keywords="diagnostic services rewa, pathology services, clinical lab testing, molecular diagnostics, cardiac markers, blood test labs Rewa, diagnostic centers Rewa Madhya Pradesh, trusted diagnostic lab India"
      />
      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-12 md:py-16">
        <div className="container text-center px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Our Services</h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive diagnostic services powered by cutting-edge technology and expert pathologists. Click on any service to learn more.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Card key={service.id} id={service.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`h-14 w-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      index % 2 === 0 ? "bg-primary/10" : "bg-secondary/10"
                    }`}>
                      <service.icon className={`h-7 w-7 ${
                        index % 2 === 0 ? "text-primary" : "text-secondary"
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1">{service.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{service.description}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="font-semibold text-foreground mb-2 text-sm">Key Tests:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {service.tests.slice(0, 4).map((test) => (
                        <span 
                          key={test}
                          className="px-2 py-0.5 bg-muted rounded-full text-xs text-muted-foreground"
                        >
                          {test}
                        </span>
                      ))}
                      {service.tests.length > 4 && (
                        <span className="px-2 py-0.5 bg-primary/10 rounded-full text-xs text-primary font-medium">
                          +{service.tests.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button asChild variant="default" size="sm" className="flex-1">
                      <Link to="/tests">
                        Book Now
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="group">
                      <Link to={`/services/${service.id}`}>
                        Details
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
