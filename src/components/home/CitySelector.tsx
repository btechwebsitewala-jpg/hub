import { useState, useEffect } from "react";
import { MapPin, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

const states = [
  { value: "madhya-pradesh", label: "Madhya Pradesh" },
];

const citiesByState: Record<string, { value: string; label: string }[]> = {
  "madhya-pradesh": [
    { value: "rewa", label: "Rewa" },
    { value: "satna", label: "Satna" },
    { value: "sidhi", label: "Sidhi" },
    { value: "shahdol", label: "Shahdol" },
  ],
};

const CitySelector = () => {
  const [selectedState, setSelectedState] = useState("madhya-pradesh");
  const [selectedCity, setSelectedCity] = useState("rewa");

  return (
    <div className="bg-gradient-to-r from-[#f8faff] to-[#ffffff] border-b border-blue-100 py-2 sm:py-2.5">
      <div className="container max-w-7xl flex flex-row items-center justify-between gap-3 px-4 mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 p-1.5 rounded-full hidden sm:flex">
            <MapPin className="h-3.5 w-3.5 text-primary" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
            <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <MapPin className="h-3 w-3 text-primary sm:hidden" />
              Your Location
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <Select 
            value={selectedState} 
            onValueChange={(val) => {
              setSelectedState(val);
              setSelectedCity(citiesByState[val]?.[0]?.value || "");
            }}
          >
            <SelectTrigger className="h-8 sm:h-9 text-[11px] sm:text-xs w-[110px] sm:w-44 bg-white border-blue-100 hover:border-blue-300 transition-all rounded-lg shadow-sm focus:ring-1 focus:ring-primary/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-blue-100 shadow-xl">
              {states.map((state) => (
                <SelectItem key={state.value} value={state.value} className="text-xs focus:bg-blue-50 rounded-lg mx-1">
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <ChevronRight className="h-3 w-3 text-slate-300 hidden sm:block" />

          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="h-8 sm:h-9 text-[11px] sm:text-xs w-[80px] sm:w-36 bg-white border-blue-100 hover:border-blue-300 transition-all rounded-lg shadow-sm focus:ring-1 focus:ring-primary/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-blue-100 shadow-xl">
              {citiesByState[selectedState]?.map((city) => (
                <SelectItem key={city.value} value={city.value} className="text-xs focus:bg-blue-50 rounded-lg mx-1">
                  {city.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CitySelector;
