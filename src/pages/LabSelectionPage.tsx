import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Home, Star, Award, Clock, Building, Package, Beaker, MapPin, CheckCircle, ChevronDown } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import { partnerLabs, packages, tests, formatINR, generateSlug } from "@/data/testsData";
import logo from "@/assets/diagnostics-hub-logo.png";

const LabSelectionPage = () => {
  const navigate = useNavigate();
  
  const handleBookTest = (labName: string) => {
    // Set session storage to track valid lab selection
    window.sessionStorage.setItem('fromLabSelection', 'true');
    navigate(`/lab-details/${encodeURIComponent(labName)}?fromSelection=true`);
  };

  // Enhanced lab data with more details
  const labs = partnerLabs.map(lab => ({
    ...lab,
    homeCollection: true,
    rating: 4.5 + Math.random() * 0.5, // Random rating between 4.5-5.0
    tests: Math.floor(1000 + Math.random() * 2000), // Random tests between 1000-3000
    experience: `${Math.floor(10 + Math.random() * 30)}+ years` // Random experience 10-40+ years
  }));

  return (
    <Layout>
      <SEOHead
        title="Select Lab - Diagnostics Hub"
        description="Choose from our partner diagnostic labs for quality healthcare services"
        keywords="diagnostic lab, pathology lab, NABL certified, home collection, blood test, Rewa"
      />
      
      <section className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 py-8">
        <div className="container">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground text-center">
                Diagnostics Hub
              </h1>
            </div>
          </div>

          {/* Lab Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {labs.map((lab, index) => (
              <Card 
                key={lab.name} 
                className="group cursor-pointer bg-gradient-to-br from-white via-primary/5 to-secondary/5 border border-primary/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                onClick={() => handleBookTest(lab.name)}
              >
                {/* Card Header with Consistent Theme Gradient */}
                <div className="h-2 bg-gradient-to-r from-primary via-primary/80 to-secondary" />
                
                <CardContent className="p-6">
                  {/* Lab Logo with Theme Colors */}
                  <div className="relative mb-4">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 p-1 shadow-inner">
                      <div className="w-full h-full rounded-xl bg-white flex items-center justify-center overflow-hidden">
                        {lab.logoUrl ? (
                          <img 
                            src={lab.logoUrl} 
                            alt={lab.name}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => {
                              // Fallback to initials if image fails
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <div className="text-2xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                          {lab.logo}
                        </div>
                      </div>
                    </div>
                    
                    {/* Rating Badge with Theme Colors */}
                    <div className="absolute -top-1 -right-1">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:from-yellow-400 hover:to-orange-400 text-xs px-2 py-1 shadow-md">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        {lab.rating?.toFixed(1)}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Lab Name */}
                  <h3 className="font-bold text-foreground mb-3 text-base text-center leading-tight">
                    {lab.name}
                  </h3>
                  
                  {/* Lab Stats with Theme Colors */}
                  <div className="flex justify-around mb-4 text-xs">
                    <div className="text-center">
                      <div className="font-semibold text-primary">{lab.tests}+</div>
                      <div className="text-foreground/70">Tests</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-secondary">{lab.experience}</div>
                      <div className="text-foreground/70">Experience</div>
                    </div>
                  </div>

                  {/* Popular Tests */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Beaker className="h-4 w-4 text-primary" />
                      <span className="text-xs font-semibold text-foreground">Popular Tests</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {tests.slice(0, 4).map((test, i) => (
                        <Badge key={i} variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20">
                          {test.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-center gap-1">
                      <Badge variant="secondary" className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700 border-green-200 hover:from-green-500/10 hover:to-emerald-500/10 text-xs">
                        <Home className="h-3 w-3 mr-1" />
                        Home Collection
                      </Badge>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <Badge variant="outline" className="text-xs border-primary/30 text-primary/80 hover:bg-primary/5">
                        <Award className="h-3 w-3 mr-1" />
                        NABL Certified
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Book Test Button */}
                  <Button 
                    onClick={() => handleBookTest(lab.name)}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                    size="sm"
                  >
                    Book Test
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enhanced Additional Info */}
          <div className="text-center mt-16 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 backdrop-blur-sm border border-primary/10">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Why Choose Our Partner Labs?
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">NABL Accredited</h4>
                  <p className="text-muted-foreground">All labs maintain highest quality standards and accuracy</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-100 flex items-center justify-center">
                    <Home className="h-6 w-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Home Collection</h4>
                  <p className="text-muted-foreground">Convenient sample collection from your home</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-100 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Quick Reports</h4>
                  <p className="text-muted-foreground">Get your test reports online within 24-48 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LabSelectionPage;
