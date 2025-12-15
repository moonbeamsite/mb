import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Moon, Sparkles } from "lucide-react";
import logo from "@/assets/logoMoonbeam.png";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn, signUp, resetPassword, user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  const [resetEmail, setResetEmail] = useState("");

  useEffect(() => {
    if (user) {
      const redirect = searchParams.get("redirect") || "/";
      navigate(redirect);
    }
  }, [user, navigate, searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(loginData.email, loginData.password);
    setLoading(false);
    
    if (error) {
      toast.error("Login failed", { description: error.message });
    } else {
      toast.success("Welcome back!");
      const redirect = searchParams.get("redirect") || "/";
      navigate(redirect);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signUp(
      signupData.email,
      signupData.password,
      signupData.firstName,
      signupData.lastName
    );
    setLoading(false);
    
    if (error) {
      toast.error("Signup failed", { description: error.message });
    } else {
      toast.success("Account created! Please check your email to verify.");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await resetPassword(resetEmail);
    setLoading(false);
    
    if (error) {
      toast.error("Failed to send reset email", { description: error.message });
    } else {
      toast.success("Password reset email sent! Check your inbox.");
      setResetEmail("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-lavender-light/5 to-royal/5 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Moon className="absolute top-20 right-20 text-lavender/20 w-32 h-32" />
        <Sparkles className="absolute bottom-40 left-20 text-royal/20 w-24 h-24" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <img src={logo} alt="Moonbeam" className="h-20 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-royal glow-lavender">Welcome to Moonbeam</h1>
          <p className="text-muted-foreground mt-2">Your Kumaoni culinary journey begins here</p>
        </div>

        <Card className="border-2 border-lavender/20 bg-card/80 backdrop-blur-sm shadow-mystical">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-lavender/10">
              <TabsTrigger value="login" className="data-[state=active]:bg-lavender data-[state=active]:text-lavender-foreground">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-lavender data-[state=active]:text-lavender-foreground">
                Sign Up
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <CardHeader>
                <CardTitle className="text-royal">Login to Your Account</CardTitle>
                <CardDescription>Enter your credentials to continue</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                      className="border-lavender/20 focus:border-lavender"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                      className="border-lavender/20 focus:border-lavender"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-mystical hover:shadow-lavender"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </Button>
                </form>

                <div className="mt-4">
                  <Tabs defaultValue="" className="w-full">
                    <TabsList className="grid w-full grid-cols-1 h-auto bg-transparent">
                      <TabsTrigger
                        value="forgot"
                        className="data-[state=active]:bg-lavender/10 text-sm text-royal hover:text-lavender"
                      >
                        Forgot Password?
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="forgot" className="mt-4">
                      <form onSubmit={handleResetPassword} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="reset-email">Email</Label>
                          <Input
                            id="reset-email"
                            type="email"
                            placeholder="your@email.com"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            required
                            className="border-lavender/20 focus:border-lavender"
                          />
                        </div>
                        <Button
                          type="submit"
                          variant="outline"
                          className="w-full border-lavender/50 text-royal hover:bg-lavender/10"
                          disabled={loading}
                        >
                          {loading ? "Sending..." : "Send Reset Link"}
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </TabsContent>

            <TabsContent value="signup">
              <CardHeader>
                <CardTitle className="text-royal">Create an Account</CardTitle>
                <CardDescription>Join the Moonbeam family</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <Input
                        id="first-name"
                        placeholder="John"
                        value={signupData.firstName}
                        onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                        required
                        className="border-lavender/20 focus:border-lavender"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input
                        id="last-name"
                        placeholder="Doe"
                        value={signupData.lastName}
                        onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                        required
                        className="border-lavender/20 focus:border-lavender"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your@email.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                      className="border-lavender/20 focus:border-lavender"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Min. 6 characters"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                      minLength={6}
                      className="border-lavender/20 focus:border-lavender"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-mystical hover:shadow-lavender"
                    disabled={loading}
                  >
                    {loading ? "Creating Account..." : "Sign Up"}
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
