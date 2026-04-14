import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, Loader2, Shield, ArrowLeft } from "lucide-react";
import logo from "@/assets/diagnostics-hub-logo.png";
import { Link } from "react-router-dom";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    checkExistingSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setTimeout(async () => {
          const isAdmin = await checkAdminRole(session.user.id);
          if (isAdmin) {
            navigate("/admin");
          }
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkExistingSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const isAdmin = await checkAdminRole(session.user.id);
      if (isAdmin) {
        navigate("/admin");
      }
    }
    setCheckingAuth(false);
  };

  const checkAdminRole = async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      return !error && !!data;
    } catch {
      return false;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (data.user) {
        const isAdmin = await checkAdminRole(data.user.id);

        if (isAdmin) {
          toast({
            title: "Welcome, Admin!",
            description: "You have been logged in successfully.",
          });
          navigate("/admin");
        } else {
          await supabase.auth.signOut();
          toast({
            title: "Access Denied",
            description: "This account does not have admin privileges.",
            variant: "destructive",
          });
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="w-full max-w-sm">
        <Card className="shadow-2xl border border-border/50 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <img
                  src={logo}
                  alt="Pathology Hub Logo"
                  className="h-20 w-20 rounded-full object-cover shadow-lg border-4 border-primary/20"
                />
                <div className="absolute -bottom-1 -right-1 h-7 w-7 bg-primary rounded-full flex items-center justify-center shadow-md">
                  <Shield className="h-3.5 w-3.5 text-primary-foreground" />
                </div>
              </div>
            </div>
            <CardTitle className="text-xl font-bold text-foreground">Admin Portal</CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              Pathology Hub Administration
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email" className="text-sm font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="Enter admin email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full mt-2" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-border">
              <Link to="/">
                <Button variant="ghost" className="w-full text-muted-foreground">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Website
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLoginPage;
