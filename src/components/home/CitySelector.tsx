import { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Only show city selector when logged in
  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="bg-background border-b py-2">
      <div className="container flex items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedState} onValueChange={(val) => {
            setSelectedState(val);
            setSelectedCity(citiesByState[val]?.[0]?.value || "");
          }}>
            <SelectTrigger className="h-7 text-xs w-32 sm:w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {states.map((state) => (
                <SelectItem key={state.value} value={state.value} className="text-xs">
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="h-7 text-xs w-24 sm:w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {citiesByState[selectedState]?.map((city) => (
                <SelectItem key={city.value} value={city.value} className="text-xs">
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
