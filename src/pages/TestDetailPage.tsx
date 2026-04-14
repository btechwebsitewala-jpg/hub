import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Eye } from "lucide-react";
import { labTests } from "@/data/labTests";
import { drLalTests } from "@/data/drLalTests";
import { metropolisTests } from "@/data/metropolisTests";
import { formatINR, generateSlug, tests as genericTests, packages } from "@/data/testsData";
import { useCart } from "@/context/CartContext";

const TestDetailPage = () => {
  const { testSlug } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addToCart, cartItems, removeFromCart } = useCart();

  const selectedLab = searchParams.get("lab");

  let test: any = null;
  let isPackage = false;

  if (selectedLab === "Dr. Lal PathLabs") {
    test = drLalTests.find(t => generateSlug(t.name) === testSlug);
  } else if (selectedLab === "Metropolis Healthcare") {
    test = metropolisTests.find(t => generateSlug(t.name) === testSlug);
  } else {
    test = labTests.find(t => generateSlug(t.name) === testSlug);
    if (!test) {
      test = genericTests.find(t => generateSlug(t.name) === testSlug);
    }
    if (!test) {
      test = packages.find(p => generateSlug(p.name) === testSlug);
      isPackage = !!test;
    }
  }

  if (!test) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Test Not Found</h1>
          <p className="text-muted-foreground mb-6">The test you're looking for doesn't exist in our catalog.</p>
          <Button onClick={() => navigate("/tests")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Tests
          </Button>
        </div>
      </Layout>
    );
  }

  const parametersCount = test.includedTests ? test.includedTests.length :
    (isPackage && test.tests ? test.tests.length : Math.floor((test.price || 400) / 40) + 5);

  return (
    <Layout>
      <div className="bg-slate-50 min-h-screen pb-12">
        {/* Breadcrumb Navigation */}
        <div className="container max-w-5xl mx-auto px-4 py-4 mb-2">
          <div className="flex items-center text-sm font-medium text-slate-500">
            <button onClick={() => navigate(-1)} className="flex items-center hover:text-[#003B73]">
              <ArrowLeft className="h-4 w-4 mr-1.5" />
              Home
            </button>
            <span className="mx-2">/</span>
            <span className="text-slate-800 capitalize">{test.name.toLowerCase()}</span>
          </div>
        </div>

        <div className="container max-w-5xl mx-auto px-4 space-y-6">
          {/* Top Info Card */}
          <Card className="border-0 shadow-sm rounded-xl overflow-hidden bg-white">
            <CardContent className="p-6 sm:p-8 flex flex-col md:flex-row justify-between gap-6">
              <div className="flex-1 space-y-4">
                <h1 className="text-xl font-bold text-slate-800 uppercase leading-snug">
                  {test.name}
                </h1>

                <p className="text-[#003B73] font-medium text-sm">
                  Special Instruction : <span className="text-slate-600 font-normal">{test.fastingRequired ? "Overnight fasting is preferred." : "No special preparation required"}</span>
                </p>



                <div className="flex items-center gap-6 pt-2">
                  <p className="text-[#003B73] font-medium text-sm">
                    Report Frequency : <span className="text-slate-600 font-normal">{test.turnaroundTime === "12 Hours" ? "Daily" : "Next Day"}</span>
                  </p>


                </div>
              </div>

              <div className="md:w-64 flex flex-col md:items-end justify-between border-t md:border-t-0 pt-6 md:pt-0">
                <div className="flex flex-col md:items-end w-full mb-6">
                  <p className="text-2xl font-bold text-[#3B8B41] mb-2">{formatINR(test.discountPrice || test.price)}</p>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-[#3B8B41]">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Home Collection
                    </span>

                  </div>
                </div>

                <div className="w-full flex flex-col md:items-end space-y-2">
                  {cartItems.some(i => i.id === test.id) ? (
                    <Button
                      className="w-full md:w-32 bg-[#DE6F53] hover:bg-[#C2583F] text-white rounded font-semibold text-[13px] h-9"
                      onClick={() => removeFromCart(test.id)}
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button
                      className="w-full md:w-32 bg-[#004A99] hover:bg-[#003B73] text-white rounded font-semibold text-[13px] h-9"
                      onClick={() => {
                        addToCart({
                          id: test.id,
                          name: test.name,
                          price: test.price,
                          discountPrice: test.discountPrice,
                          parametersCount: parametersCount,
                          fastingRequired: test.fastingRequired,
                          labName: selectedLab
                        });
                      }}
                    >
                      Add to cart
                    </Button>
                  )}
                  <p className="text-[11px] text-slate-500 text-center md:text-right w-full">
                    Price applicable for Home Collection orders only.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bottom Overview Card */}
          <Card className="border-0 shadow-sm rounded-xl overflow-hidden bg-white">
            <CardContent className="p-6 sm:p-8">
              <h2 className="text-lg font-bold text-slate-500 mb-4 uppercase">{test.name} - Overview</h2>
              <h3 className="text-[15px] font-bold text-slate-800 mb-3">What is {test.name} ?</h3>

              <div className="text-[13px] text-slate-600 space-y-4 leading-relaxed">
                <p>
                  {test.description ? test.description : `${test.name} is a comprehensive diagnostic test used to evaluate your overall health and detect a wide range of underlying medical conditions, such as infections, anemia, deficiency, or organ dysfunction.`}
                </p>
                {!test.description && (
                  <p>
                    This test measures crucial parameters in your blood/urine/sample to give a detailed snapshot of your current biological state. Regular screening can help monitor known medical conditions and detect new ones early on.
                  </p>
                )}
                {(test.includedTests || (isPackage && test.tests)) && (
                  <div className="mt-4">
                    <strong className="text-slate-800">Included Tests:</strong>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {(test.includedTests || test.tests).map((inc: string, i: number) => (
                        <li key={i}>{inc}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default TestDetailPage;
