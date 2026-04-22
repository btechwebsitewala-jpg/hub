import { Card } from "@/components/ui/card";
import { LabLogos, LabNameAliases, DefaultLogo } from "@/components/ui/LabLogos";

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

const PartnerLabs = () => {
  return (
    <section className="py-12 md:py-16 bg-muted/30 overflow-hidden">
      <div className="container px-4 mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">Our Partner Labs</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto">
          We collaborate with India's leading diagnostic laboratories to provide you with the best services
        </p>
      </div>
      
      <div className="relative">
        {/* CSS for infinite marquee is handled in Layout or globally, 
            but for self-containment we'll add it here if it's missing in some contexts.
            Actually, AboutPage had it in a <style> tag. We should move it to index.css 
            or keep it in the component. */}
        <style>{`
          @keyframes marquee-partner {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .partner-marquee-container {
            display: flex;
            width: fit-content;
            animation: marquee-partner 30s linear infinite;
          }
          .partner-marquee-container:hover {
            animation-play-state: paused;
          }
        `}</style>
        
        <div className="partner-marquee-container gap-4 md:gap-8 px-4">
          {/* List twice for seamless infinite loop */}
          {[...partnerLabs, ...partnerLabs].map((lab, index) => {
            const officialName = LabNameAliases[lab] || lab;
            // @ts-ignore - dynamic key access
            const LogoComponent = LabLogos[officialName] || DefaultLogo;

            return (
              <Card key={`${lab}-${index}`} className="flex-shrink-0 w-[160px] xs:w-[200px] md:w-[280px] p-3 md:p-4 text-center hover:shadow-xl transition-all border-none bg-white shadow-sm flex flex-col items-center justify-center min-h-[110px] md:min-h-[140px]">
                <div className="w-full flex items-center justify-center mb-2 md:mb-3">
                  <LogoComponent className="w-full h-auto max-h-12 md:max-h-16 object-contain" />
                </div>
                <p className="text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mt-auto">{lab}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PartnerLabs;
