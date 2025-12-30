import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { useCycle } from "@/contexts/CycleContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Calendar, Droplets, Sparkles, Heart } from "lucide-react";
import { toast } from "sonner";

const skinTypes = [
  { id: "oily", label: "Oily", emoji: "💧" },
  { id: "dry", label: "Dry", emoji: "🏜️" },
  { id: "combination", label: "Combination", emoji: "🌓" },
  { id: "sensitive", label: "Sensitive", emoji: "🌸" },
  { id: "normal", label: "Normal", emoji: "✨" },
];

const OnboardingPage = () => {
  const [step, setStep] = useState(1);
  const [cycleLength, setCycleLength] = useState(28);
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [skinType, setSkinType] = useState("");
  const { user, setUser } = useUser();
  const { setCycleData, cycleData } = useCycle();
  const navigate = useNavigate();

  const handleNext = () => {
    if (step === 1 && !lastPeriodDate) {
      toast.error("Please select your last period date");
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleComplete = () => {
    if (!skinType) {
      toast.error("Please select your skin type");
      return;
    }

    // Update user profile
    if (user) {
      setUser({
        ...user,
        cycleLength,
        lastPeriodDate,
        skinType,
        onboardingComplete: true,
      });
    }

    // Update cycle data
    setCycleData({
      ...cycleData,
      cycleLength,
      lastPeriodStart: lastPeriodDate,
    });

    toast.success("You're all set! Let's start your wellness journey 🌸");
    navigate("/");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-rose-light mx-auto mb-4 flex items-center justify-center">
                <Calendar className="w-8 h-8 text-rose-dark" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-2">
                When did your last period start?
              </h2>
              <p className="text-muted-foreground text-sm">
                This helps us predict your cycle
              </p>
            </div>
            <Input
              type="date"
              value={lastPeriodDate}
              onChange={(e) => setLastPeriodDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="text-center text-lg"
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-lavender-light mx-auto mb-4 flex items-center justify-center">
                <Droplets className="w-8 h-8 text-lavender-dark" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-2">
                How long is your cycle?
              </h2>
              <p className="text-muted-foreground text-sm">
                Average is 28 days, but it can vary
              </p>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCycleLength(Math.max(21, cycleLength - 1))}
              >
                -
              </Button>
              <div className="text-center">
                <span className="text-4xl font-display font-bold text-primary">
                  {cycleLength}
                </span>
                <span className="text-muted-foreground ml-2">days</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCycleLength(Math.min(40, cycleLength + 1))}
              >
                +
              </Button>
            </div>
            <div className="flex justify-center gap-2">
              {[21, 25, 28, 30, 35].map((days) => (
                <button
                  key={days}
                  onClick={() => setCycleLength(days)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    cycleLength === days
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {days}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-slide-up">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-peach-light mx-auto mb-4 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-peach-dark" />
              </div>
              <h2 className="font-display text-2xl font-bold mb-2">
                What's your skin type?
              </h2>
              <p className="text-muted-foreground text-sm">
                We'll personalize skincare tips for you
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {skinTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSkinType(type.id)}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                    skinType === type.id
                      ? "border-primary bg-primary/10 shadow-soft"
                      : "border-border hover:border-primary/50 bg-card"
                  }`}
                >
                  <span className="text-2xl mb-1 block">{type.emoji}</span>
                  <span className="font-medium text-sm">{type.label}</span>
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex flex-col p-6">
      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
              s <= step ? "gradient-rose" : "bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Step indicator */}
      <div className="text-sm text-muted-foreground mb-2">
        Step {step} of 3
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center">
        <Card variant="glass" className="p-6">
          <CardContent className="p-0">{renderStep()}</CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-6">
        {step > 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
            Back
          </Button>
        )}
        <Button
          variant="rose"
          onClick={step === 3 ? handleComplete : handleNext}
          className="flex-1"
        >
          {step === 3 ? (
            <>
              <Heart className="w-5 h-5" />
              Get Started
            </>
          ) : (
            <>
              Continue
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingPage;
