import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Home, Calendar, MessageCircle, User, Smile } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/tracker", icon: Calendar, label: "Tracker" },
  { path: "/mood", icon: Smile, label: "Mood" },
  { path: "/chat", icon: MessageCircle, label: "AI Chat" },
  { path: "/profile", icon: User, label: "Profile" },
];

const BottomNav = () => {
  const location = useLocation();

  // Don't show on auth/onboarding pages
  if (["/auth", "/onboarding"].includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-card border-t border-border/50 safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto px-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <NavLink
              key={path}
              to={path}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 w-16 h-14 rounded-xl transition-all duration-300",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  isActive && "scale-110"
                )}
              />
              <span className="text-[10px] font-medium">{label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
