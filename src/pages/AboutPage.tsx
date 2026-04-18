import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Award, 
  Users, 
  Building2, 
  CheckCircle2, 
  Target, 
  Eye,
  GraduationCap,
  Microscope,
  MessageCircle,
  Phone,
  Instagram,
  Send
} from "lucide-react";
import logo from "@/assets/diagnostics-hub-logo.png";
import { LabLogos, LabNameAliases, DefaultLogo } from "@/components/ui/LabLogos";

const WHATSAPP_NUMBER = "917649885936";
const INSTAGRAM_URL = "https://www.instagram.com/diagnostics_hub?igsh=MzNzanJpN2tlODhs";
const TELEGRAM_BOT = "https://t.me/HubPathologyLab_bot";

const values = [
  { icon: Target, title: "Accuracy", description: "99.9% accuracy rate with rigorous quality control processes" },
  { icon: Users, title: "Patient Care", description: "Compassionate service with patient comfort as priority" },
  { icon: Award, title: "Excellence", description: "Continuous pursuit of diagnostic excellence and innovation" },
  { icon: Eye, title: "Transparency", description: "Clear communication and transparent pricing policies" },
];

const team = [
  { name: "Dr. Rajesh Kumar", role: "Chief Pathologist", specialty: "Clinical Pathology", experience: "20+ years" },
  { name: "Dr. Priya Sharma", role: "Senior Pathologist", specialty: "Anatomic Pathology", experience: "15+ years" },
  { name: "Dr. Amit Gupta", role: "Molecular Pathologist", specialty: "Molecular Diagnostics", experience: "12+ years" },
  { name: "Dr. Neha Singh", role: "Hematopathologist", specialty: "Hematology", experience: "18+ years" },
];

const certifications = [
  "NABL Accredited Laboratory",
  "CAP (College of American Pathologists) Certified",
  "ISO 15189:2012 Certified",
  "NABH Accredited",
];

const partnerLabs = [
  "Dr. Lal Path Lab",
  "Metropolis Lab",
  "Thyrocare Lab",
  "Pathkind Lab",
  "Redcliffe Lab",
  "Agilus Lab",
  "Bharat Lab",
  "Mateshwari Pathology",
  "Labwala Health Diagnostics",
];

const AboutPage = () => {
  return (
    <Layout>
      <SEOHead
        title="About Us - NABL Accredited Diagnostic Lab"
        description="Learn about Diagnostics Hub Rewa - 10+ years of diagnostic excellence, 50+ expert staff, NABL accredited. Trusted pathology partner in Madhya Pradesh."
        canonical="/about"
        keywords="about diagnostics hub rewa, NABL accredited lab, pathology lab team rewa, trusted diagnostic lab India, best pathology lab Rewa MP, diagnostic centers Rewa Madhya Pradesh"
      />
      
      {/* CSS for infinite marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-container {
          display: flex;
          width: fit-content;
          animation: marquee 30s linear infinite;
        }
        .marquee-container:hover {
          animation-play-state: paused;
        }
      `}</style>

      <section className="bg-gradient-to-br from-primary/5 to-secondary/5 py-12 md:py-20">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <img 
              src={logo} 
              alt="Diagnostics Hub Logo" 
              className="h-24 w-24 md:h-32 md:w-32 mx-auto mb-6 rounded-full shadow-lg object-cover"
            />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Diagnostics Hub
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-6">
              Your trusted partner in diagnostic healthcare. We combine cutting-edge technology 
              with experienced pathologists to deliver accurate and timely results for better health outcomes.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-success text-success-foreground rounded-lg hover:bg-success/90 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>+91 7649885936</span>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
              >
                <Instagram className="h-4 w-4" />
                <span>Instagram</span>
              </a>
              <a
                href={TELEGRAM_BOT}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/80 text-primary-foreground rounded-lg hover:bg-primary/70 transition-colors"
              >
                <Send className="h-4 w-4" />
                <span>Telegram</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                Diagnostics Hub started with a simple mission: to provide accurate, affordable, 
                and accessible diagnostic services to our community. What began as a small laboratory has 
                grown into a full-service diagnostic center serving thousands of patients.
              </p>
              <p className="text-muted-foreground mb-4">
                Our journey has been marked by continuous innovation and an unwavering commitment to quality. 
                We invested in state-of-the-art equipment, recruited top pathologists, and implemented rigorous 
                quality control measures to ensure every result we deliver meets the highest standards.
              </p>
              <p className="text-muted-foreground mb-6">
                Today, Diagnostics Hub is recognized as one of the leading diagnostic centers in the region, 
                trusted by healthcare providers and patients alike for our accuracy, reliability, and exceptional service.
              </p>
              <Button asChild>
                <Link to="/tests">Book Test</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <Card className="text-center p-4 md:p-6">
                <Building2 className="h-8 w-8 md:h-10 md:w-10 text-primary mx-auto mb-3" />
                <p className="text-2xl md:text-3xl font-bold text-foreground">10+</p>
                <p className="text-muted-foreground text-xs md:text-sm">Years of Excellence</p>
              </Card>
              <Card className="text-center p-4 md:p-6">
                <Users className="h-8 w-8 md:h-10 md:w-10 text-secondary mx-auto mb-3" />
                <p className="text-2xl md:text-3xl font-bold text-foreground">50,000+</p>
                <p className="text-muted-foreground text-xs md:text-sm">Patients Served</p>
              </Card>
              <Card className="text-center p-4 md:p-6">
                <Microscope className="h-8 w-8 md:h-10 md:w-10 text-primary mx-auto mb-3" />
                <p className="text-2xl md:text-3xl font-bold text-foreground">500+</p>
                <p className="text-muted-foreground text-xs md:text-sm">Tests Available</p>
              </Card>
              <Card className="text-center p-4 md:p-6">
                <GraduationCap className="h-8 w-8 md:h-10 md:w-10 text-secondary mx-auto mb-3" />
                <p className="text-2xl md:text-3xl font-bold text-foreground">50+</p>
                <p className="text-muted-foreground text-xs md:text-sm">Expert Staff</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Labs Slider */}
      <section className="py-12 md:py-16 bg-muted/50 overflow-hidden">
        <div className="container px-4 mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">Our Partner Labs</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            We collaborate with India's leading diagnostic laboratories to provide you with the best services
          </p>
        </div>
        
        <div className="relative">
          <div className="marquee-container gap-4 md:gap-8 px-4">
            {/* List twice for seamless infinite loop */}
            {[...partnerLabs, ...partnerLabs].map((lab, index) => {
              // Match lab name with its logo component, handling aliases
              const officialName = LabNameAliases[lab] || lab;
              // @ts-ignore - dynamic key access
              const LogoComponent = LabLogos[officialName] || DefaultLogo;

              return (
                <Card key={`${lab}-${index}`} className="flex-shrink-0 w-[200px] md:w-[280px] p-4 text-center hover:shadow-xl transition-all border-none bg-white shadow-sm flex flex-col items-center justify-center min-h-[140px]">
                  <div className="w-full flex items-center justify-center mb-3">
                    <LogoComponent className="w-full h-auto max-h-16 object-contain" />
                  </div>
                  <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mt-auto">{lab}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8 md:mb-12">Our Core Values</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map((value) => (
              <Card key={value.title} className="text-center p-4 md:p-6">
                <div className="h-12 w-12 md:h-14 md:w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 md:h-7 md:w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">Our Expert Team</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8 md:mb-12">
            Led by board-certified pathologists with decades of experience in diagnostic medicine.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {team.map((member) => (
              <Card key={member.name}>
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg md:text-2xl font-bold text-primary-foreground">
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm md:text-base">{member.name}</h3>
                  <p className="text-primary text-xs md:text-sm mb-1">{member.role}</p>
                  <p className="text-muted-foreground text-xs">{member.specialty}</p>
                  <p className="text-muted-foreground text-xs mt-1">{member.experience}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 md:py-16 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <Award className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-4 md:mb-6 text-secondary" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Accreditations & Certifications</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-6 md:mb-8 text-sm md:text-base">
            Our quality is validated by national and international accreditation bodies.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-2 bg-primary-foreground/10 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm">
                <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 text-secondary" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4">
          <Card className="p-6 md:p-8 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">Ready to Book Your Test?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Contact us today or book an appointment online. We're here to help with all your diagnostic needs.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/tests">Book Test</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
