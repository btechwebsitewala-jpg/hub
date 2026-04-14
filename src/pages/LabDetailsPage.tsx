import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Award, Home, ShoppingCart, CheckCircle, Package, Beaker, Clock } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { partnerLabs, packages, tests, formatINR, generateSlug } from "@/data/testsData";

interface SelectedTest {
  name: string;
  price: number;
  type: 'test' | 'package';
}

const LabDetailsPage = () => {
  const { labName } = useParams();
  const [searchParams] = useSearchParams();
  const [showTestList, setShowTestList] = useState(false);
  const [selectedTests, setSelectedTests] = useState<SelectedTest[]>([]);
  const [isValidLabSelection, setIsValidLabSelection] = useState(false);
  const navigate = useNavigate();
  
  const decodedLabName = decodeURIComponent(labName || "");
  if (decodedLabName) {
    localStorage.setItem('active_hub_lab', decodedLabName);
  }
  
  // Find lab details from partnerLabs
  const currentLab = partnerLabs.find(lab => lab.name === decodedLabName);

  useEffect(() => {
    // Check if user came from lab selection page via URL parameter or session storage
    const fromSelection = searchParams.get('fromSelection') === 'true' || 
                          window.sessionStorage.getItem('fromLabSelection') === 'true';
    
    setIsValidLabSelection(fromSelection);
    
    // Clear the session storage
    window.sessionStorage.removeItem('fromLabSelection');
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [labName, searchParams]);

  const handleViewPackages = () => {
    setShowTestList(true);
  };

  const handleViewTests = () => {
    setShowTestList(true);
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    navigate(-1);
  };

  const handleTestSelect = (testName: string, price: number, type: 'test' | 'package') => {
    const existingIndex = selectedTests.findIndex(t => t.name === testName);
    
    if (existingIndex >= 0) {
      setSelectedTests(selectedTests.filter((_, index) => index !== existingIndex));
    } else {
      setSelectedTests([...selectedTests, { name: testName, price, type }]);
    }
  };

  const handleBookSelected = () => {
    if (selectedTests.length === 0) return;
    
    const testNames = selectedTests.map(t => t.name).join(' | ');
    const totalPrice = selectedTests.reduce((sum, t) => sum + t.price, 0);
    
    // Scroll to top before navigation
    window.scrollTo(0, 0);
    navigate(`/book-appointment?lab=${encodeURIComponent(decodedLabName)}&tests=${encodeURIComponent(testNames)}&total=${totalPrice}`);
  };

  const isTestSelected = (testName: string) => {
    return selectedTests.some(t => t.name === testName);
  };

  // Sample test data with prices
  const sampleTests = [
    { name: "CBC Test", price: 300, category: "Hematology", turnaround: "Same Day" },
    { name: "Thyroid Profile", price: 500, category: "Endocrinology", turnaround: "24 Hours" },
    { name: "Lipid Profile", price: 450, category: "Biochemistry", turnaround: "Same Day" },
    { name: "Liver Function Test", price: 600, category: "Biochemistry", turnaround: "Same Day" },
    { name: "Kidney Function Test", price: 550, category: "Biochemistry", turnaround: "Same Day" },
    { name: "Blood Sugar Fasting", price: 80, category: "Biochemistry", turnaround: "Same Day" },
    { name: "Vitamin D Test", price: 1200, category: "Biochemistry", turnaround: "24 Hours" },
    { name: "Vitamin B12 Test", price: 900, category: "Biochemistry", turnaround: "24 Hours" },
    { name: "Urine Routine", price: 150, category: "Biochemistry", turnaround: "Same Day" },
    { name: "ESR Test", price: 150, category: "Hematology", turnaround: "Same Day" },
    { name: "CRP Test", price: 200, category: "Biochemistry", turnaround: "Same Day" },
    { name: "IgE Test", price: 800, category: "Immunology", turnaround: "24 Hours" },
    { name: "Allergy Panel", price: 1500, category: "Allergy", turnaround: "48 Hours" }
  ];

  if (!isValidLabSelection) {
    return (
      <Layout>
        <SEOHead
          title="Access Restricted - Diagnostics Hub"
          description="Please select a lab from the lab selection page to view tests and packages."
        />
        <section className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-8">
          <div className="container">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Access Restricted
              </h1>
              <p className="text-muted-foreground mb-6">
                Please select a lab from the lab selection page to view tests and packages.
              </p>
              <Button onClick={() => navigate('/lab-selection')}>
                Go to Lab Selection
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title={`${decodedLabName} - Diagnostics Hub`}
        description={`Learn more about ${decodedLabName} - our trusted diagnostic partner with NABL certification and home collection services.`}
      />
      <section className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-8">
        <div className="container">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex-1 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                {currentLab?.logoUrl && (
                  <img 
                    src={currentLab.logoUrl} 
                    alt={decodedLabName}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                )}
                <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
                  {decodedLabName}
                </h1>
              </div>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <Badge className="bg-yellow-100 text-yellow-800">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  4.8 Rating
                </Badge>
                <Badge variant="outline">
                  <Award className="h-3 w-3 mr-1" />
                  NABL Certified
                </Badge>
                <Badge variant="secondary">
                  <Home className="h-3 w-3 mr-1" />
                  Home Collection
                </Badge>
              </div>
              <p className="text-muted-foreground mt-2">
                Choose from our test packages and individual tests
              </p>
            </div>
          </div>

          {/* Selected Tests Summary */}
          {selectedTests.length > 0 && (
            <div className="sticky top-20 z-30 bg-white border rounded-lg shadow-lg p-4 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Selected Tests ({selectedTests.length})
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Total: {formatINR(selectedTests.reduce((sum, t) => sum + t.price, 0))}
                  </p>
                </div>
                <Button 
                  onClick={handleBookSelected}
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Book Selected
                </Button>
              </div>
            </div>
          )}

          {/* Cards Container */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Lab Package Card */}
            <Card className="hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-lg overflow-hidden group">
              {/* Card Header with Gradient */}
              <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500" />
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Lab Package</CardTitle>
                <p className="text-sm text-muted-foreground">Test Packages with Price</p>
              </CardHeader>
              <CardContent className="pt-0">
                {!showTestList ? (
                  <Button 
                    onClick={handleViewPackages}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg text-white font-semibold"
                    size="lg"
                  >
                    View Packages
                  </Button>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {packages.slice(0, 6).map((pkg, index) => (
                      <div 
                        key={index} 
                        className={`border rounded-lg p-3 hover:bg-blue-50 transition-colors cursor-pointer ${
                          isTestSelected(pkg.name) ? 'bg-blue-50 border-blue-300' : ''
                        }`}
                        onClick={() => handleTestSelect(pkg.name, pkg.price, 'package')}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm">{pkg.name}</h4>
                            {isTestSelected(pkg.name) && (
                              <CheckCircle className="h-4 w-4 text-blue-600" />
                            )}
                          </div>
                          <span className="font-bold text-blue-600 text-sm">{formatINR(pkg.price)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{pkg.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {pkg.tests.slice(0, 3).map((test, i) => (
                            <Badge key={i} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                              {test}
                            </Badge>
                          ))}
                          {pkg.tests.length > 3 && (
                            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                              +{pkg.tests.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Individual Tests Card */}
            <Card className="hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-lg overflow-hidden group">
              {/* Card Header with Gradient */}
              <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500" />
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Beaker className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Individual Tests</CardTitle>
                <p className="text-sm text-muted-foreground">Test List with Price</p>
              </CardHeader>
              <CardContent className="pt-0">
                {!showTestList ? (
                  <Button 
                    onClick={handleViewTests}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-lg text-white font-semibold"
                    size="lg"
                  >
                    View Tests
                  </Button>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {sampleTests.map((test, index) => (
                      <div 
                        key={index} 
                        className={`border rounded-lg p-3 hover:bg-green-50 transition-colors cursor-pointer ${
                          isTestSelected(test.name) ? 'bg-green-50 border-green-300' : ''
                        }`}
                        onClick={() => handleTestSelect(test.name, test.price, 'test')}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm">{test.name}</h4>
                            {isTestSelected(test.name) && (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            )}
                          </div>
                          <span className="font-bold text-green-600 text-sm">{formatINR(test.price)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{test.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {test.category}
                          </Badge>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {test.turnaround}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LabDetailsPage;
