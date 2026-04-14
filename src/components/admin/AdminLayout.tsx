import { ReactNode, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut, Menu, X } from "lucide-react";
import AdminSidebar from "./AdminSidebar";
import { cn } from "@/lib/utils";

interface AdminLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminLayout = ({ children, activeTab, onTabChange }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const { user, loading: authLoading, isAdmin, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      // Not logged in - redirect to admin login
      navigate("/admin-login");
    } else if (!authLoading && user && !isAdmin) {
      // Logged in but not admin - stay on page (will show access denied)
    }
  }, [user, authLoading, isAdmin, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-4">You need admin privileges to access this page.</p>
          <Button onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Mobile Header */}
      <header className="lg:hidden bg-card border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <h1 className="font-bold">Admin Panel</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={handleSignOut}>
          <LogOut className="h-5 w-5" />
        </Button>
      </header>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-0 h-screen">
            <AdminSidebar activeTab={activeTab} onTabChange={onTabChange} />
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40">
            <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
            <div className="absolute left-0 top-0 h-full w-64 bg-card shadow-xl">
              <AdminSidebar activeTab={activeTab} onTabChange={(tab) => {
                onTabChange(tab);
                setMobileMenuOpen(false);
              }} />
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="hidden lg:flex items-center justify-between px-4 md:px-6 py-4 bg-card border-b border-border">
            <div className="min-w-0">
              <h1 className="text-lg md:text-xl font-bold capitalize truncate">{activeTab}</h1>
              <p className="text-sm text-muted-foreground">Manage your pathology lab</p>
            </div>
            <Button variant="outline" onClick={handleSignOut} className="flex-shrink-0">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
          <div className="p-3 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
