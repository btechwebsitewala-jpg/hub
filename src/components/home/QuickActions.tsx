import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FlaskConical, Building2, ArrowRight } from "lucide-react";
import { partnerLabs } from "@/data/testsData";

const QuickActions = () => {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Book Test */}
          <Card className="hover:shadow-lg transition-shadow border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-6 text-center">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <FlaskConical className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Book Test</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Choose from 100+ diagnostic tests with home sample collection
              </p>
              <Button asChild className="w-full">
                <Link to="/tests">
                  Browse Tests
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Lab List */}
          <Card className="hover:shadow-lg transition-shadow border-2 border-success/20 bg-gradient-to-br from-success/5 to-transparent">
            <CardContent className="p-6 text-center">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
                <Building2 className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">Partner Labs</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {partnerLabs.length}+ trusted diagnostic labs across India
              </p>
              <Button variant="outline" asChild className="w-full">
                <Link to="/tests#labs">
                  View Labs
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
