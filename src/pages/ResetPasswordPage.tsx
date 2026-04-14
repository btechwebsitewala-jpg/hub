import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, Loader2, CheckCircle2 } from "lucide-react";
import logo from "@/assets/diagnostics-hub-logo.png";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRecovery, setIsRecovery] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Listen for PASSWORD_RECOVERY event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setIsRecovery(true);
      }
    });

    // Also check if we have a recovery session from the URL hash
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    if (hashParams.get("type") === "recovery") {
      setIsRecovery(true);
    }

    // Check current session - if user arrived via recovery link, they'll have a session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsRecovery(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast({ title: "Password too short", description: "Password must be at least 6 characters.", variant: "destructive" });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({ title: "Passwords don't match", description: "Please make sure your passwords match.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        toast({ title: "Update Failed", description: error.message, variant: "destructive" });
      } else {
        setSuccess(true);
        toast({ title: "Password Updated!", description: "Your password has been reset successfully." });
        // Sign out so they can log in with new password
        await supabase.auth.signOut();
        setTimeout(() => navigate("/auth"), 3000);
      }
    } catch {
      toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary/5 to-secondary/5 min-h-[calc(100vh-200px)]">
        <div className="container max-w-md px-4">
          <Card>
            <CardHeader className="text-center">
              <img 
                src={logo} 
                alt="Diagnostics Hub Logo" 
                className="h-20 w-20 mx-auto mb-4 rounded-full object-cover shadow-lg"
              />
              <CardTitle className="text-xl md:text-2xl">
                {success ? "Password Updated!" : "Set New Password"}
              </CardTitle>
              <CardDescription>
                {success 
                  ? "Redirecting you to login..." 
                  : isRecovery 
                    ? "Enter your new password below" 
                    : "Loading your recovery session..."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {success ? (
                <div className="text-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your password has been updated. You will be redirected to the login page.
                  </p>
                  <Button className="w-full" onClick={() => navigate("/auth")}>
                    Go to Login
                  </Button>
                </div>
              ) : isRecovery ? (
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div className="flex justify-center mb-2">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Lock className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Updating...</>
                    ) : (
                      "Set New Password"
                    )}
                  </Button>
                </form>
              ) : (
                <div className="text-center space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                  <p className="text-sm text-muted-foreground">
                    If you're not redirected, please check your email and click the reset link again.
                  </p>
                  <Button variant="outline" className="w-full" onClick={() => navigate("/auth")}>
                    Back to Login
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default ResetPasswordPage;
