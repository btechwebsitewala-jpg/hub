import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Clock, Award, ArrowRight, CheckCircle2, FlaskConical, MessageCircle, FileUp } from "lucide-react";
import pathologyLabImg from "@/assets/pathology-lab-hero.jpg";
import { useAuth } from "@/hooks/useAuth";

const WHATSAPP_NUMBER = "917649885936";
const WHATSAPP_MESSAGE = "Hi Diagnostics Hub, I want to share my doctor's prescription to book a test.";

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBookAppointment = () => {
    navigate("/tests");
  };

  const handleWhatsAppChat = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden z-0 bg-[#F4F9FF]">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute pointer-events-none -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-[#38BDF8]/20 to-[#003B73]/10 blur-[100px]" />
        <div className="absolute pointer-events-none top-[30%] -right-[15%] w-[50%] h-[60%] rounded-full bg-gradient-to-bl from-[#4ADE80]/15 to-transparent blur-[80px]" />
      </div>

      <div className="container relative z-10">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div className="animate-fade-in flex flex-col items-start">

            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-white/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)] text-[#003B73] font-bold text-sm mb-7 hover:shadow-md transition-all cursor-default">
              <Award className="h-4 w-4 text-[#3B8B41]" />
              <span className="tracking-wide">NABL Accredited Laboratory</span>
            </div>

            {/* Gradient Headline */}
            <h1 className="text-[clamp(2.25rem,6vw,4.5rem)] font-extrabold text-[#002B54] leading-[1.1] mb-6 tracking-tight drop-shadow-sm text-balance">
              Accurate Diagnostics for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004A99] via-[#0066CC] to-[#38BDF8]">
                Better Health
              </span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl text-slate-600 mb-8 md:mb-10 max-w-xl font-medium leading-relaxed">
              State-of-the-art pathology services with 100+ diagnostic tests, quick turnaround times, and trusted results. Your health is our priority.
            </p>

            {/* Elevated Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10 md:mb-12 w-full sm:w-auto">
              <Button
                size="lg"
                onClick={() => navigate("/tests")}
                className="w-full sm:w-auto gap-2 bg-[#003B73] hover:bg-[#002B54] text-white text-base h-14 px-8 rounded-full shadow-[0_8px_20px_rgba(0,59,115,0.25)] hover:shadow-[0_10px_25px_rgba(0,59,115,0.35)] transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                Book Test Now
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleWhatsAppChat}
                className="w-full sm:w-auto gap-2 bg-success/10 border-2 border-success/20 hover:border-success/50 text-success hover:bg-success hover:text-white text-base h-14 px-8 rounded-full shadow-sm hover:shadow-md transition-all whitespace-nowrap"
              >
                <FileUp className="h-5 w-5" />
                Upload Dr. Prescription
              </Button>
            </div>

            {/* Modern Trust Indicators */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 w-full max-w-2xl">
              {[
                { icon: Shield, label: "99.9%", sub: "Accuracy", color: "text-[#003B73]", bg: "bg-[#003B73]/10" },
                { icon: Clock, label: "Same Day", sub: "Reports", color: "text-[#3B8B41]", bg: "bg-[#3B8B41]/10" },
                { icon: FlaskConical, label: "100+", sub: "Tests", color: "text-[#DE6F53]", bg: "bg-[#DE6F53]/10" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/60 backdrop-blur-sm border border-white/60 p-3 rounded-2xl shadow-sm hover:bg-white hover:shadow-md transition-all">
                  <div className={`h-10 w-10 md:h-12 md:w-12 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                    <item.icon className={`h-5 w-5 md:h-6 md:w-6 ${item.color}`} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-extrabold text-slate-800 text-sm md:text-[15px] leading-tight">{item.label}</span>
                    <span className="text-[11px] md:text-[13px] font-medium text-slate-500">{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-slide-in-left lg:ml-auto w-full max-w-[600px] mx-auto lg:mx-0" style={{ animationDelay: "0.2s" }}>
            {/* Image Glowing Backdrop */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-[#38BDF8] to-[#4ADE80] rounded-[1.5rem] md:rounded-[2rem] blur-xl opacity-30 animate-pulse" />

            <div className="relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={pathologyLabImg}
                alt="Modern pathology laboratory"
                className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
                loading="eager"
                width={600}
                height={450}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Premium Glassmorphic Floating Card */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 bg-white/90 backdrop-blur-xl border border-white/50 rounded-xl md:rounded-2xl shadow-xl p-3 sm:p-5 animate-fade-in hover:-translate-y-1 transition-transform cursor-default z-20" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center gap-3 md:gap-4">
                <div className="h-10 w-10 md:h-14 md:w-14 rounded-full bg-gradient-to-br from-[#3B8B41] to-[#2a6830] flex items-center justify-center shrink-0 shadow-lg shadow-green-900/20">
                  <CheckCircle2 className="h-5 w-5 md:h-7 md:w-7 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800 text-sm md:text-lg leading-tight">NABL Certified</span>
                  <span className="text-[11px] md:text-sm font-medium text-slate-500">Quality Assured Lab</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
