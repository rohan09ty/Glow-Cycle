import React, { useState } from "react";
import { useCycle } from "@/contexts/CycleContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Droplets, Check } from "lucide-react";
import { toast } from "sonner";

const TrackerPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { cycleData, setCycleData, getCurrentPhase, getDaysUntilPeriod } = useCycle();

  const today = new Date();
  const daysUntil = getDaysUntilPeriod();
  const phase = getCurrentPhase();

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isPeriodDay = (day: number) => {
    if (!cycleData.lastPeriodStart) return false;

    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const lastPeriod = new Date(cycleData.lastPeriodStart);

    // Check if it's within period length days of the start
    const daysSinceStart = Math.floor(
      (checkDate.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceStart < 0) return false;

    const cycleDay = daysSinceStart % cycleData.cycleLength;
    return cycleDay >= 0 && cycleDay < cycleData.periodLength;
  };

  const isPredictedPeriod = (day: number) => {
    if (!cycleData.lastPeriodStart) return false;

    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (checkDate <= today) return false;

    const lastPeriod = new Date(cycleData.lastPeriodStart);
    const daysSinceStart = Math.floor(
      (checkDate.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceStart < 0) return false;

    const cycleDay = daysSinceStart % cycleData.cycleLength;
    return cycleDay >= 0 && cycleDay < cycleData.periodLength;
  };

  const logPeriodToday = () => {
    const todayStr = today.toISOString().split("T")[0];
    setCycleData({
      ...cycleData,
      lastPeriodStart: todayStr,
      periodDates: [...cycleData.periodDates, todayStr],
    });
    toast.success("Period logged for today!");
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);

  return (
    <div className="min-h-screen pb-24 gradient-hero">
      {/* Header */}
      <div className="p-6 pt-12">
        <h1 className="font-display text-2xl font-bold animate-slide-up">
          Cycle Tracker 📅
        </h1>
        <p className="text-muted-foreground text-sm animate-slide-up stagger-1">
          Track your period and predict your cycle
        </p>
      </div>

      {/* Status Card */}
      <div className="px-6 mb-6">
        <Card variant="glass" className="animate-slide-up stagger-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Period in</p>
                <p className="text-2xl font-display font-bold text-primary">
                  {daysUntil >= 0 ? `${daysUntil} days` : "Log to start"}
                </p>
              </div>
              <Button variant="rose" onClick={logPeriodToday} size="sm">
                <Droplets className="w-4 h-4 mr-2" />
                Log Period
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar */}
      <div className="px-6 mb-6">
        <Card variant="glass" className="animate-slide-up stagger-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" onClick={() => navigateMonth(-1)}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <CardTitle className="font-display">
                {currentDate.toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={() => navigateMonth(1)}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Days of week */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-muted-foreground py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for days before first of month */}
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isPeriod = isPeriodDay(day);
                const isPredicted = isPredictedPeriod(day);
                const isTodayDay = isToday(day);

                return (
                  <button
                    key={day}
                    className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200
                      ${isPeriod ? "bg-rose text-primary-foreground shadow-soft" : ""}
                      ${isPredicted && !isPeriod ? "bg-rose-light text-rose-dark border-2 border-dashed border-rose" : ""}
                      ${isTodayDay && !isPeriod ? "ring-2 ring-primary ring-offset-2" : ""}
                      ${!isPeriod && !isPredicted && !isTodayDay ? "hover:bg-muted" : ""}
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Legend */}
      <div className="px-6">
        <Card variant="glass" className="animate-slide-up stagger-3">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Legend</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-rose" />
                <span className="text-sm">Period</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-rose-light border-2 border-dashed border-rose" />
                <span className="text-sm">Predicted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg border-2 border-primary" />
                <span className="text-sm">Today</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-lavender-light" />
                <span className="text-sm">Fertile</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrackerPage;
