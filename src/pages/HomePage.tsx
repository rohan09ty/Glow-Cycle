import React from "react";
import { useUser } from "@/contexts/UserContext";
import { useCycle } from "@/contexts/CycleContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Calendar,
  MessageCircle,
  Sparkles,
  Droplets,
  Heart,
  Moon,
  Sun,
  Leaf,
} from "lucide-react";

const phaseInfo: Record<
  string,
  { name: string; icon: React.ReactNode; color: string; tip: string }
> = {
  menstrual: {
    name: "Menstrual Phase",
    icon: <Droplets className="w-6 h-6" />,
    color: "bg-rose-light text-rose-dark",
    tip: "Rest and nourish. Focus on iron-rich foods.",
  },
  follicular: {
    name: "Follicular Phase",
    icon: <Sun className="w-6 h-6" />,
    color: "bg-peach-light text-peach-dark",
    tip: "Energy is rising! Great time for new projects.",
  },
  ovulation: {
    name: "Ovulation Phase",
    icon: <Sparkles className="w-6 h-6" />,
    color: "bg-lavender-light text-lavender-dark",
    tip: "Peak energy and confidence. Socialize!",
  },
  luteal: {
    name: "Luteal Phase",
    icon: <Moon className="w-6 h-6" />,
    color: "bg-mint-light text-mint",
    tip: "Slow down, practice self-care, stay hydrated.",
  },
  unknown: {
    name: "Track Your Cycle",
    icon: <Calendar className="w-6 h-6" />,
    color: "bg-muted text-muted-foreground",
    tip: "Log your period to get personalized insights.",
  },
};

const quickActions = [
  {
    label: "Track Period",
    icon: <Calendar className="w-5 h-5" />,
    path: "/tracker",
    gradient: "gradient-rose",
  },
  {
    label: "Log Mood",
    icon: <Heart className="w-5 h-5" />,
    path: "/mood",
    gradient: "gradient-lavender",
  },
  {
    label: "AI Chat",
    icon: <MessageCircle className="w-5 h-5" />,
    path: "/chat",
    gradient: "gradient-peach",
  },
  {
    label: "Wellness Tips",
    icon: <Leaf className="w-5 h-5" />,
    path: "/tips",
    gradient: "bg-mint",
  },
];

const HomePage = () => {
  const { user } = useUser();
  const { getCurrentPhase, getDaysUntilPeriod, getPredictedNextPeriod } = useCycle();

  const phase = getCurrentPhase();
  const phaseData = phaseInfo[phase];
  const daysUntil = getDaysUntilPeriod();
  const nextPeriod = getPredictedNextPeriod();

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen pb-24 gradient-hero">
      {/* Header */}
      <div className="p-6 pt-12">
        <div className="animate-slide-up">
          <p className="text-muted-foreground text-sm">{greeting()}</p>
          <h1 className="font-display text-2xl font-bold">
            {user?.name || "Beautiful"} 🌸
          </h1>
        </div>
      </div>

      {/* Cycle Status Card */}
      <div className="px-6 mb-6">
        <Card variant="glass" className="overflow-hidden animate-slide-up stagger-1">
          <div className={`${phaseData.color} p-4 flex items-center gap-3`}>
            {phaseData.icon}
            <div>
              <h3 className="font-display font-bold">{phaseData.name}</h3>
              <p className="text-sm opacity-80">{phaseData.tip}</p>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Next period in</p>
                <p className="text-3xl font-display font-bold text-primary">
                  {daysUntil >= 0 ? `${daysUntil} days` : "—"}
                </p>
              </div>
              {nextPeriod && (
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Expected</p>
                  <p className="font-semibold">
                    {nextPeriod.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-6">
        <h2 className="font-display font-bold mb-3 animate-slide-up stagger-2">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <Link key={action.path} to={action.path}>
              <Card
                className="animate-slide-up overflow-hidden hover:shadow-glow transition-all duration-300 cursor-pointer"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className={`${action.gradient} p-4 text-primary-foreground`}>
                  {action.icon}
                </div>
                <CardContent className="p-3">
                  <span className="font-semibold text-sm">{action.label}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Today's Tips */}
      <div className="px-6">
        <h2 className="font-display font-bold mb-3 animate-slide-up stagger-3">
          Today's Wellness Tips
        </h2>
        <div className="space-y-3">
          <Card variant="glass" className="animate-slide-up stagger-4">
            <CardContent className="p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-lavender-light flex items-center justify-center shrink-0">
                💧
              </div>
              <div>
                <h4 className="font-semibold text-sm">Stay Hydrated</h4>
                <p className="text-xs text-muted-foreground">
                  Drink at least 8 glasses of water today
                </p>
              </div>
            </CardContent>
          </Card>
          <Card variant="glass" className="animate-slide-up stagger-5">
            <CardContent className="p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-peach-light flex items-center justify-center shrink-0">
                🧘
              </div>
              <div>
                <h4 className="font-semibold text-sm">Gentle Movement</h4>
                <p className="text-xs text-muted-foreground">
                  Try some light yoga or stretching
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
