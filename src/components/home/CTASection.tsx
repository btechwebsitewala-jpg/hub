import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, MessageSquare, Calculator } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const actions = [
  {
    icon: Calendar,
    title: "Book Test",
    description: "Schedule your lab test",
    path: "/tests",
    primary: true,
    requiresAuth: false
  },
  {
    icon: FileText,
    title: "Get Results",
    description: "Check your test status",
    path: "/results-inquiry",
    primary: false
  },
  {
    icon: MessageSquare,
    title: "Contact Us",
    description: "Have questions? Ask us",
    path: "/contact",
    primary: false
  }
];

const CTASection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAction = (action: typeof actions[0]) => {
    if (action.requiresAuth && !user) {
      navigate(`/auth?redirect=${action.path}`);
    } else {
      navigate(action.path);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            How Can We Help You Today?
          </h2>
          <p className="text-primary-foreground/80">
            Choose from our quick actions below to get started with your healthcare journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {actions.map((action) => (
            <button
              key={action.path}
              onClick={() => handleAction(action)}
              className={`group p-6 rounded-xl text-left transition-all duration-300 hover:scale-105 ${
                action.primary 
                  ? "bg-secondary text-secondary-foreground shadow-lg" 
                  : "bg-primary-foreground/10 hover:bg-primary-foreground/20"
              }`}
            >
              <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 ${
                action.primary 
                  ? "bg-secondary-foreground/20" 
                  : "bg-primary-foreground/20"
              }`}>
                <action.icon className={`h-6 w-6 ${
                  action.primary ? "text-secondary-foreground" : "text-primary-foreground"
                }`} />
              </div>
              <h3 className={`font-semibold text-lg mb-1 ${
                action.primary ? "text-secondary-foreground" : "text-primary-foreground"
              }`}>
                {action.title}
              </h3>
              <p className={`text-sm ${
                action.primary ? "text-secondary-foreground/80" : "text-primary-foreground/70"
              }`}>
                {action.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
