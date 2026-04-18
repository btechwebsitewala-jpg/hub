import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { LabLogos } from "@/components/ui/LabLogos";
import { labTests } from "@/data/labTests";
import { drLalTests } from "@/data/drLalTests";
import { metropolisTests } from "@/data/metropolisTests";
import { useCart } from "@/context/CartContext";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { generateSlug } from "@/data/testsData";

const FALLBACK_LOGO = "https://via.placeholder.com/60?text=Lab";

const labs = [
  { name: "Dr. Lal PathLabs", logo: "" },
  { name: "Metropolis Healthcare", logo: "" },
  { name: "Thyrocare", logo: "" },
  { name: "Pathkind Labs", logo: "" },
  { name: "Redcliffe Labs", logo: "" },
  { name: "Agilus Diagnostics", logo: "" },
  { name: "Bharat Lab", logo: "" },
  { name: "Labwala Health Diagnostics", logo: "" },
  { name: "Other Labs", logo: "" }
];

export default function DiagnosticsUI() {
  const { addToCart, cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedLab = searchParams.get("lab");

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedTests, setExpandedTests] = useState<Record<string, boolean>>({});

  const handleNavigate = (labName: string | null) => {
    if (labName) {
      setSearchParams({ lab: labName });
      localStorage.setItem('active_hub_lab', labName);
    } else {
      setSearchParams({});
      localStorage.removeItem('active_hub_lab');
    }
    setSearchQuery("");
    setActiveCategory("All");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 👉 SECOND PAGE (Lab Details - View 200+ Tests)
  if (selectedLab) {
    const activeTests = selectedLab === "Dr. Lal PathLabs"
      ? (drLalTests as typeof labTests)
      : selectedLab === "Metropolis Healthcare"
        ? (metropolisTests as typeof labTests)
        : labTests;

    const filteredTests = activeTests.filter(test => {
      const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || test.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

    const LogoComponent = LabLogos[selectedLab as keyof typeof LabLogos] || LabLogos["Other Labs"];

    return (
      <Layout>
        <SEOHead
          title={`${selectedLab} - View & Book Tests`}
          description={`Browse over 200 high-quality health packages and tests from ${selectedLab}`}
        />
        <div className="p-4 md:p-8 min-h-screen bg-slate-50">
          <button
            className="mb-6 text-slate-500 hover:text-blue-700 font-medium flex items-center gap-2 transition-colors group"
            onClick={() => handleNavigate(null)}
          >
            ← Back to Labs
          </button>

          {/* Lab Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <div className="w-24 bg-white rounded-xl p-2 flex justify-center items-center h-24 border border-slate-100 shadow-sm shrink-0">
                <LogoComponent className="w-full h-full object-contain max-h-20" />
              </div>
              <div className="pt-1">
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">
                  {selectedLab}
                </h1>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                  <span className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-bold tracking-wide">
                    ✓ Home Collection
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-bold tracking-wide">
                    ⭐ Trusted Partner
                  </span>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="w-full md:w-80 mt-2 md:mt-4">
              <input
                type="text"
                placeholder="Search 200+ tests & packages..."
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner bg-slate-50 font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Categories Filter */}
          <div className="flex overflow-x-auto pb-2 gap-2 mb-6 scrollbar-hide">
            {["All", "Individual Test", "Health Package"].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeCategory === cat
                  ? "bg-slate-800 text-white shadow-md transform scale-105"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
              >
                {cat} {cat === "All" && `(${activeTests.length})`}
              </button>
            ))}
          </div>

          {/* Tests Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredTests.map((test) => {
              return (
                <Card key={test.id} className="rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white border border-slate-100 flex flex-col h-full overflow-hidden p-5">
                  <div className="flex-grow">
                    <h3 className="font-bold text-[#003B73] text-[15px] hover:text-[#002B54] transition-colors uppercase leading-snug mb-1 cursor-pointer">
                      {test.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-4 mt-3">
                      <span className="text-xl font-bold text-slate-900">₹ {test.discountPrice || test.price}</span>
                      {test.discountPrice && test.discountPrice < test.price && (
                        <span className="text-sm line-through text-slate-400 font-medium">₹{test.price}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      {test.homeCollection && (
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-[#3B8B41]">
                          <span className="flex items-center justify-center bg-[#3B8B41] text-white rounded-full w-3.5 h-3.5 text-[9px] font-bold">✓</span>
                          Home Collection
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-2">
                    {cartItems.some(i => i.id === test.id) ? (
                      <Button
                        className="bg-[#DE6F53] hover:bg-[#C2583F] text-white rounded-lg px-6 py-2 h-auto text-sm font-semibold active:scale-95 transition-all"
                        onClick={() => removeFromCart(test.id)}
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button
                        className="bg-[#003B73] hover:bg-[#002B54] text-white rounded-lg px-6 py-2 h-auto text-sm font-semibold active:scale-95 transition-all"
                        onClick={() => {
                          addToCart({
                            id: test.id,
                            name: test.name,
                            price: test.price,
                            discountPrice: test.discountPrice,
                            parametersCount: test.includedTests ? test.includedTests.length : Math.floor(Math.random() * 20 + 2),
                            fastingRequired: test.fastingRequired,
                            labName: selectedLab
                          });
                        }}
                      >
                        Add to cart
                      </Button>
                    )}
                    <div className="flex items-center gap-3">
                      <Link to={`/test/${generateSlug(test.name)}?lab=${encodeURIComponent(selectedLab || "")}`} className="text-[13px] font-bold text-[#003B73] hover:text-[#002B54] cursor-pointer">
                        Know More
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}

            {filteredTests.length === 0 && (
              <div className="col-span-full text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-300">
                <span className="text-4xl block mb-3">🔍</span>
                <h3 className="text-xl font-bold text-slate-700 mb-1">No matches found</h3>
                <p className="text-slate-500 font-medium">Try adjusting your search or category filter.</p>
              </div>
            )}
          </div>
        </div>
      </Layout>
    );
  }

  // 👉 FIRST PAGE
  return (
    <Layout>
      <SEOHead
        title="Diagnostics Hub - Lab Selection"
        description="Choose from our partner diagnostic labs for quality healthcare services"
      />
      <div className="p-6 bg-gradient-to-br from-blue-50 to-green-50 min-h-screen">
        <div className="container max-w-7xl mx-auto mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors pl-0"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-semibold">Back</span>
          </Button>
        </div>
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0b417c] tracking-tight mb-2 selection:bg-blue-200">
            Diagnostics Hub
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium mx-auto flex items-center justify-center gap-3">
            <span className="w-10 h-[2px] bg-green-500 rounded-full hidden sm:block"></span>
            India's top pathology labs
            <span className="w-10 h-[2px] bg-green-500 rounded-full hidden sm:block"></span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {labs.map((lab, index) => {
            const LogoComponent = LabLogos[lab.name as keyof typeof LabLogos] || LabLogos["Other Labs"];
            return (
              <Card key={index} className="rounded-2xl shadow-md hover:shadow-xl transition">
                <CardContent className="p-5 flex flex-col items-center gap-4 text-center">

                  <div className="w-full bg-slate-50 rounded-xl p-3 flex justify-center items-center h-28 border border-slate-100">
                    <LogoComponent className="w-full h-full object-contain max-h-24" />
                  </div>

                  <h2 className="text-lg font-semibold">{lab.name}</h2>

                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                    Home Collection Available
                  </span>

                  <Button className="w-full" onClick={() => handleNavigate(lab.name)}>
                    View Packages & Test
                  </Button>

                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-600">Only Home Collection Service Available</p>
        </div>
      </div>
    </Layout>
  );
}
