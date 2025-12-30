import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { useCycle } from "@/contexts/CycleContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  User,
  Settings,
  Calendar,
  Bell,
  Moon,
  HelpCircle,
  LogOut,
  ChevronRight,
  Heart,
} from "lucide-react";
import { toast } from "sonner";

const ProfilePage = () => {
  const { user, logout } = useUser();
  const { cycleData, moodEntries, symptomEntries } = useCycle();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  const stats = [
    {
      label: "Cycle Length",
      value: `${cycleData.cycleLength} days`,
      icon: <Calendar className="w-5 h-5" />,
      color: "bg-rose-light text-rose-dark",
    },
    {
      label: "Mood Entries",
      value: moodEntries.length,
      icon: <Heart className="w-5 h-5" />,
      color: "bg-lavender-light text-lavender-dark",
    },
    {
      label: "Symptom Logs",
      value: symptomEntries.length,
      icon: <Bell className="w-5 h-5" />,
      color: "bg-peach-light text-peach-dark",
    },
  ];

  const menuItems = [
    { icon: <User />, label: "Edit Profile", action: () => { } },
    { icon: <Calendar />, label: "Cycle Settings", action: () => { } },
    { icon: <Bell />, label: "Notifications", action: () => { } },
    { icon: <Moon />, label: "Appearance", action: () => { } },
    { icon: <HelpCircle />, label: "Help & Support", action: () => { } },
  ];

  return (
    <div className="min-h-screen pb-24 gradient-hero">
      {/* Header */}
      <div className="p-6 pt-12 text-center">
        <div className="w-24 h-24 rounded-3xl gradient-rose mx-auto mb-4 flex items-center justify-center shadow-glow animate-slide-up">
          <User className="w-12 h-12 text-primary-foreground" />
        </div>
        <h1 className="font-display text-2xl font-bold animate-slide-up stagger-1">
          {user?.name || "Beautiful"}
        </h1>
        <p className="text-muted-foreground text-sm animate-slide-up stagger-2">
          {user?.email || "user@example.com"}
        </p>
      </div>

      {/* Stats */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <Card
              key={stat.label}
              variant="glass"
              className="text-center animate-slide-up"
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <CardContent className="p-3">
                <div
                  className={`w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center ${stat.color}`}
                >
                  {stat.icon}
                </div>
                <p className="text-lg font-bold">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Menu */}
      <div className="px-6 mb-6">
        <Card variant="glass" className="animate-slide-up stagger-3">
          <CardContent className="p-0">
            {menuItems.map((item, index) => (
              <button
                key={item.label}
                onClick={item.action}
                className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors border-b border-border/30 last:border-0"
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                  {item.icon}
                </div>
                <span className="flex-1 text-left font-medium">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Logout */}
      <div className="px-6">
        <Button
          variant="outline"
          className="w-full text-destructive border-destructive/30 hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Log Out
        </Button>
      </div>

      {/* Version */}
      <p className="text-center text-xs text-muted-foreground mt-8">
        GlowCycle v1.0.0
      </p>
    </div>
  );
};

export default ProfilePage;
