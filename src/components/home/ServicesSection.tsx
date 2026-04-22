import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Microscope,
  TestTube2,
  HeartPulse,
  Dna,
  Syringe,
  FileSearch,
  ArrowRight
} from "lucide-react";

const services = [
  {
    icon: TestTube2,
    title: "Clinical Laboratory",
    description: "Comprehensive blood tests, chemistry panels, hematology, and immunology testing.",
    link: "/services/clinical"
  },
  {
    icon: Microscope,
    title: "Anatomic Pathology",
    description: "Expert tissue analysis, surgical pathology, and biopsy examinations.",
    link: "/services/anatomic"
  },
  {
    icon: HeartPulse,
    title: "Cardiac Markers",
    description: "Complete cardiac panel including troponin, BNP, and lipid profiles.",
    link: "/services/cardiac"
  },
  {
    icon: Dna,
    title: "Molecular Diagnostics",
    description: "Advanced genetic testing, PCR-based diagnostics, and infectious disease detection.",
    link: "/services/molecular"
  },
  {
    icon: Syringe,
    title: "Cytopathology",
    description: "Expert cell analysis, Pap smears, and fine needle aspiration cytology.",
    link: "/services/cytopathology"
  },
  {
    icon: FileSearch,
    title: "Histopathology",
    description: "Detailed tissue examination, immunohistochemistry, and cancer diagnostics.",
    link: "/services/histopathology"
  }
];

const ServicesSection = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-secondary font-semibold mb-2">OUR SERVICES</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Comprehensive Diagnostic Services
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            From routine blood work to advanced molecular testing, we offer a full spectrum of laboratory services.
          </p>
        </div>

        <div className="grid xs:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="p-4 md:p-6">
                <div className="h-12 w-12 md:h-14 md:w-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-all">
                  <service.icon className="h-6 w-6 md:h-7 md:w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <CardTitle className="text-lg md:text-xl">{service.title}</CardTitle>
                <CardDescription className="text-sm">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 md:p-6 pt-0">
                <Link
                  to={service.link}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all text-sm"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
