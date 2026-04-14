import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import fullBodyImg from "@/assets/service-full-body-checkup.jpg";
import bloodTestImg from "@/assets/service-blood-test.jpg";
import urineTestImg from "@/assets/service-urine-test.jpg";

const diagnosticServices = [
  { name: "Full Body Checkup", image: fullBodyImg, label: "Full Body Checkup", sublabel: "by Diagnostics Hub" },
  { name: "Blood Test", image: bloodTestImg, label: "Blood Test", sublabel: "by Diagnostics Hub" },
  { name: "Urine Test", image: urineTestImg, label: "Urine Test", sublabel: "by Diagnostics Hub" },
];

const DiagnosticShowcase = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Elevate Your Health with Accurate Lab Tests and Expert Diagnostics.
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Empower your health with our specialized lab tests and diagnostics, designed to provide accurate results and better healthcare decisions.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {diagnosticServices.map((service) => (
            <div
              key={service.name}
              className="group rounded-xl overflow-hidden bg-card shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={224}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <p className="text-xl font-bold text-white drop-shadow-lg">{service.label}</p>
                  <p className="text-sm text-white/80">{service.sublabel}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="font-semibold text-foreground">{service.name}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link to="/tests" className="gap-2">
              View All Tests
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DiagnosticShowcase;
