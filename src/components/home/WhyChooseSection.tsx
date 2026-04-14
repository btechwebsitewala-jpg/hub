import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Phone } from "lucide-react";
import whyChooseImg from "@/assets/why-choose-labwala.jpg";

const benefits = [
  "Serving in 4+ Cities in Madhya Pradesh",
  "NABL & ISO Certified Labs",
  "Home Sample Collection",
  "24x7 Report Access Online",
  "Pick & Drop from Home",
  "Expert Radiologists & Pathologists",
  "200% Money Back Accuracy Guarantee",
];

const WhyChooseSection = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground text-center mb-12">
          Why Choose Diagnostics Hub?
        </h2>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left - Promotional Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img
              src={whyChooseImg}
              alt="Diagnostics Hub team - doctor and support staff"
              className="w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
              width={600}
              height={400}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/60" />
          </div>

          {/* Right - Benefits */}
          <div>
            <div className="space-y-5">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-secondary flex-shrink-0" />
                  <span className="text-foreground text-base md:text-lg">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button variant="outline" size="lg" asChild>
                <Link to="/contact">Get Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
