import { Activity, Star } from "lucide-react";

const OfferBanner = () => {
  const titles = [
    {
      icon: <Activity className="h-4 w-4 sm:h-[18px] sm:w-[18px] shrink-0 text-[#4ADE80]" strokeWidth={2.5} />,
      title: "𝐑𝐨𝐮𝐭𝐢𝐧𝐞 𝐓𝐞𝐬𝐭 𝐃𝐢𝐬𝐜𝐨𝐮𝐧𝐭",
      discount: "𝐆𝐞𝐭 𝐔𝐩 𝐓𝐨 𝟏𝟓-𝟐𝟓%",
      badgeColor: "bg-[#FBBF24] text-[#451A03]",
    },
    {
      icon: <Star className="h-4 w-4 sm:h-[18px] sm:w-[18px] shrink-0 text-[#FBBF24] fill-[#FBBF24]" strokeWidth={2.5} />,
      title: "𝐒𝐩𝐞𝐜𝐢𝐚𝐥 𝐓𝐞𝐬𝐭 𝐃𝐢𝐬𝐜𝐨𝐮𝐧𝐭",
      discount: "𝐆𝐞𝐭 𝐔𝐩 𝐓𝐨 𝟏𝟎-𝟐𝟎%",
      badgeColor: "bg-[#38BDF8] text-[#082F49]",
    },
  ];

  const items = [...Array(10)].flatMap(() => titles);

  return (
    <div className="bg-[#002B54] text-white py-3 overflow-hidden flex whitespace-nowrap relative border-b border-white/10 shadow-[inset_0_-1px_4px_rgba(0,0,0,0.1)]">
      {/* subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
      
      <div className="flex animate-marquee hover:[animation-play-state:paused] w-max items-center relative z-10">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 sm:gap-6 px-4 sm:px-8">
            <div className="flex items-center gap-2 shrink-0 md:text-[15px] text-[14px]">
              {item.icon}
              <span className="font-semibold tracking-wide text-white/95">{item.title}</span>
              <span className={`px-3 py-1 rounded-full font-bold shadow-sm ml-2 text-[12px] sm:text-[13px] ${item.badgeColor} tracking-tight leading-none`}>
                {item.discount}
              </span>
            </div>
            
            {/* Elegant Separator */}
            <div className="flex items-center justify-center gap-1.5 opacity-60 ml-3 sm:ml-5">
              <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
              <div className="w-1 h-1 rounded-full bg-white/20"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferBanner;
