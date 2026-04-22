import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, TrendingUp, ShoppingCart } from "lucide-react";
import { tests, formatINR, generateSlug } from "@/data/testsData";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

// Get top 6 popular tests
const popularTests = tests.slice(0, 6).map((test, idx) => ({
  ...test,
  popular: idx < 4
}));

const TestsPreview = () => {
  const { addToCart, cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <p className="text-secondary font-semibold mb-2">POPULAR TESTS</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Most Requested Tests
            </h2>
          </div>
          <Button variant="outline" asChild>
            <Link to="/tests" className="gap-2">
              View All Tests
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Tests Grid */}
        <div className="grid xs:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularTests.map((test) => (
            <Card key={test.name} className="rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white border border-slate-100 flex flex-col h-full overflow-hidden p-5">
              <div className="flex-grow">
                <h3 className="font-bold text-[#003B73] text-[15px] hover:text-[#002B54] transition-colors uppercase leading-snug mb-1 cursor-pointer">
                  {test.name}
                </h3>
                <div className="flex items-center gap-2 mb-4 mt-3">
                  <span className="text-xl font-bold text-slate-900">{formatINR(test.price)}</span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-[#3B8B41]">
                    <span className="flex items-center justify-center bg-[#3B8B41] text-white rounded-full w-3.5 h-3.5 text-[9px] font-bold">✓</span>
                    Home Collection
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto pt-2">
                {cartItems.some(i => i.id === `preview-${test.name}`) ? (
                  <Button
                    className="bg-[#DE6F53] hover:bg-[#C2583F] text-white rounded-lg px-6 py-2 h-auto text-sm font-semibold active:scale-95 transition-all"
                    onClick={() => removeFromCart(`preview-${test.name}`)}
                  >
                    Remove
                  </Button>
                ) : (
                  <Button
                    className="bg-[#003B73] hover:bg-[#002B54] text-white rounded-lg px-6 py-2 h-auto text-sm font-semibold active:scale-95 transition-all"
                    onClick={() => {
                      addToCart({
                        id: `preview-${test.name}`,
                        name: test.name,
                        price: test.price,
                        discountPrice: (test as any).discountPrice || test.price,
                        parametersCount: (test as any).includedTests ? (test as any).includedTests.length : Math.floor(Math.random() * 20 + 2),
                        fastingRequired: (test as any).fastingRequired || false
                      });
                    }}
                  >
                    Add to cart
                  </Button>
                )}
                <div className="flex items-center gap-3">
                  <Link to={`/test/${generateSlug(test.name)}`} className="text-[13px] font-bold text-[#003B73] hover:text-[#002B54] cursor-pointer">
                    Know More
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Packages CTA */}
        <div className="mt-12 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Looking for Health Packages?
            </h3>
            <p className="text-muted-foreground">
              Get comprehensive health checkups at discounted rates. Perfect for annual health monitoring.
            </p>
          </div>
          <Button asChild className="bg-secondary hover:bg-secondary/90 flex-shrink-0">
            <Link to="/tests#packages">View Health Packages</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestsPreview;
