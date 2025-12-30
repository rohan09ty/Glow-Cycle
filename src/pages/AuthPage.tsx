import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Mail, Lock, User, Sparkles } from "lucide-react";
import { toast } from "sonner";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate auth - in production this would connect to backend
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // Create mock user
    const user = {
      id: crypto.randomUUID(),
      email,
      name: name || email.split("@")[0],
      cycleLength: 28,
      lastPeriodDate: null,
      skinType: null,
      onboardingComplete: false,
    };

    setUser(user);
    toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
    navigate("/onboarding");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center p-6">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-rose-light rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-40 right-10 w-40 h-40 bg-lavender-light rounded-full blur-3xl opacity-60" />
      <div className="absolute top-1/3 right-20 w-24 h-24 bg-peach-light rounded-full blur-2xl opacity-50" />

      {/* Logo */}
      <div className="relative z-10 mb-8 animate-slide-up">
        <div className="w-20 h-20 rounded-3xl gradient-rose shadow-glow flex items-center justify-center animate-float">
          <Heart className="w-10 h-10 text-primary-foreground" />
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-8 animate-slide-up stagger-1 relative z-10">
        <h1 className="font-display text-3xl font-bold text-foreground mb-2">
          Glow<span className="text-primary">Cycle</span>
        </h1>
        <p className="text-muted-foreground">Your wellness companion</p>
      </div>

      {/* Auth Card */}
      <Card className="w-full max-w-sm relative z-10 animate-slide-up stagger-2" variant="glass">
        <CardContent className="p-6">
          {/* Toggle */}
          <div className="flex gap-2 mb-6 p-1 bg-muted/50 rounded-xl">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                isLogin
                  ? "bg-card shadow-soft text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                !isLogin
                  ? "bg-card shadow-soft text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-12"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12"
              />
            </div>

            <Button
              type="submit"
              variant="rose"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  {isLogin ? "Sign In" : "Create Account"}
                </>
              )}
            </Button>
          </form>

          {isLogin && (
            <button className="w-full mt-4 text-sm text-primary hover:underline">
              Forgot password?
            </button>
          )}
        </CardContent>
      </Card>

      {/* Footer */}
      <p className="mt-8 text-xs text-muted-foreground text-center relative z-10 animate-slide-up stagger-3">
        By continuing, you agree to our Terms of Service
      </p>
    </div>
  );
};

export default AuthPage;
