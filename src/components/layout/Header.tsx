import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Clock, User, LogOut, ShoppingCart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { useCart } from "@/context/CartContext";
import logo from "@/assets/diagnostics-hub-logo.png";

const WHATSAPP_NUMBER = "917649885936";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();
  const { cartItems } = useCart();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchUserName(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setTimeout(() => {
          fetchUserName(session.user.id);
        }, 0);
      } else {
        setUserName(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserName = async (userId: string) => {
    try {
      const { data } = await supabase
        .from("profiles")
        .select("first_name, last_name")
        .eq("user_id", userId)
        .maybeSingle();
      
      if (data) {
        setUserName(data.first_name || data.last_name ? `${data.first_name || ''} ${data.last_name || ''}`.trim() : null);
      }
    } catch (error) {
      console.error("Error fetching user name:", error);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserName(null);
    navigate("/");
  };

  const handleBookAppointment = () => {
    navigate("/tests");
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Tests", path: "/tests" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Help", path: "/help" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container flex flex-wrap justify-between items-center text-xs sm:text-sm gap-2 px-4">
          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            <a href={`tel:+${WHATSAPP_NUMBER}`} className="flex items-center gap-1 sm:gap-2 hover:underline">
              <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>+91 7649885936</span>
            </a>
            <div className="hidden sm:flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Mon-Sat: 7:00 AM - 7:00 PM</span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                <Link to="/dashboard" className="flex items-center gap-1 hover:underline">
                  <User className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="max-w-[80px] sm:max-w-[120px] truncate">{userName || "My Account"}</span>
                </Link>
                <button onClick={handleSignOut} className="flex items-center gap-1 hover:underline opacity-80">
                  <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/auth" className="flex items-center gap-1 hover:underline">
                <User className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Login / Register</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container py-3 sm:py-4 px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <img 
              src={logo} 
              alt="Diagnostics Hub Logo" 
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg object-cover shadow-sm"
              loading="eager"
              decoding="async"
              width={48}
              height={48}
            />
            <div>
              <h1 className="text-base sm:text-xl font-bold text-foreground leading-tight">Diagnostics Hub</h1>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Your Health Partner</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-foreground hover:text-primary font-medium transition-colors text-sm xl:text-base"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate("/cart")} className="relative border-slate-200 hover:bg-slate-50 text-slate-700 mr-2 rounded-full w-10 h-10 p-0">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold h-4.5 w-4.5 min-w-[18px] min-h-[18px] flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Button>
            {user && (
              <Button variant="ghost" onClick={() => navigate("/dashboard")} className="text-primary hover:bg-primary/10">
                <User className="h-4 w-4 mr-1.5" /> My Bookings
              </Button>
            )}
            <Button variant="outline" onClick={() => navigate("/results-inquiry")} className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Result Inquiry
            </Button>
            <Button onClick={handleBookAppointment} className="bg-secondary hover:bg-secondary/90">
              Book Test
            </Button>
          </div>

          {/* Mobile Menu Toggle & Cart */}
          <div className="lg:hidden flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate("/cart")} className="relative border-slate-200 hover:bg-slate-50 text-slate-700 rounded-full w-9 h-9 p-0">
              <ShoppingCart className="h-4 w-4" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold h-4.5 w-4.5 min-w-[18px] min-h-[18px] flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Button>
            <button
              className="text-foreground p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-foreground hover:text-primary font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {user && (
                <Link
                  to="/dashboard"
                  className="text-foreground hover:text-primary font-medium py-2 flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4" /> My Bookings
                </Link>
              )}
              <Button 
                onClick={handleBookAppointment} 
                className="bg-secondary hover:bg-secondary/90 w-full mt-2"
              >
                Book Test
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
