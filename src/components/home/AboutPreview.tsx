import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Users, Building2, Award } from "lucide-react";

const highlights = [
  "NABL Accredited Laboratory",
  "Experienced Team of 50+ Specialists",
  "24/7 Emergency Services",
  "Home Sample Collection Available",
  "Digital Reports & Online Access",
  "Quality Assured Processes"
];

const stats = [
  { icon: Users, value: "50,000+", label: "Patients Served" },
  { icon: Building2, value: "15+", label: "Years Experience" },
  { icon: Award, value: "500+", label: "Tests Available" }
];

const AboutPreview = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <p className="text-secondary font-semibold mb-2">ABOUT US</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Your Trusted Partner in Diagnostic Healthcare
            </h2>
            <p className="text-muted-foreground mb-6">
              PathLab Diagnostic Center has been at the forefront of pathology services for over 15 years. Our commitment to accuracy, quick turnaround times, and patient care has made us the preferred choice for healthcare providers and patients alike.
            </p>
            <p className="text-muted-foreground mb-8">
              With state-of-the-art equipment and a team of experienced pathologists, we provide comprehensive diagnostic solutions that help in early detection, accurate diagnosis, and effective treatment monitoring.
            </p>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0" />
                  <span className="text-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>

            <Button asChild size="lg">
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>

          {/* Right Content - Stats */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl shadow-lg p-8">
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="h-14 w-14 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <stat.icon className="h-7 w-7 text-primary" />
                    </div>
                    <p className="text-2xl lg:text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certification Badge */}
            <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl p-6 flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <Award className="h-8 w-8 text-secondary-foreground" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">NABL Accredited</h4>
                <p className="text-sm text-muted-foreground">
                  National Accreditation Board for Testing and Calibration Laboratories certified.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
