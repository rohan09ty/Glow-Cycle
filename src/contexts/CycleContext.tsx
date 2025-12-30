import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CycleData {
  periodDates: string[];
  cycleLength: number;
  lastPeriodStart: string | null;
  periodLength: number;
}

interface MoodEntry {
  id: string;
  date: string;
  mood: string;
  energy: number;
  notes: string;
}

interface SymptomEntry {
  id: string;
  date: string;
  symptoms: string[];
  severity: "mild" | "moderate" | "severe";
}

interface CycleContextType {
  cycleData: CycleData;
  setCycleData: (data: CycleData) => void;
  moodEntries: MoodEntry[];
  addMoodEntry: (entry: Omit<MoodEntry, "id">) => void;
  symptomEntries: SymptomEntry[];
  addSymptomEntry: (entry: Omit<SymptomEntry, "id">) => void;
  getCurrentPhase: () => string;
  getDaysUntilPeriod: () => number;
  getPredictedNextPeriod: () => Date | null;
}

const CycleContext = createContext<CycleContextType | undefined>(undefined);

export const CycleProvider = ({ children }: { children: ReactNode }) => {
  const [cycleData, setCycleData] = useState<CycleData>(() => {
    const saved = localStorage.getItem("wellness_cycle");
    return saved
      ? JSON.parse(saved)
      : {
          periodDates: [],
          cycleLength: 28,
          lastPeriodStart: null,
          periodLength: 5,
        };
  });

  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(() => {
    const saved = localStorage.getItem("wellness_moods");
    return saved ? JSON.parse(saved) : [];
  });

  const [symptomEntries, setSymptomEntries] = useState<SymptomEntry[]>(() => {
    const saved = localStorage.getItem("wellness_symptoms");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wellness_cycle", JSON.stringify(cycleData));
  }, [cycleData]);

  useEffect(() => {
    localStorage.setItem("wellness_moods", JSON.stringify(moodEntries));
  }, [moodEntries]);

  useEffect(() => {
    localStorage.setItem("wellness_symptoms", JSON.stringify(symptomEntries));
  }, [symptomEntries]);

  const addMoodEntry = (entry: Omit<MoodEntry, "id">) => {
    const newEntry = { ...entry, id: crypto.randomUUID() };
    setMoodEntries((prev) => [newEntry, ...prev]);
  };

  const addSymptomEntry = (entry: Omit<SymptomEntry, "id">) => {
    const newEntry = { ...entry, id: crypto.randomUUID() };
    setSymptomEntries((prev) => [newEntry, ...prev]);
  };

  const getCurrentPhase = () => {
    if (!cycleData.lastPeriodStart) return "unknown";
    
    const lastPeriod = new Date(cycleData.lastPeriodStart);
    const today = new Date();
    const daysSinceStart = Math.floor(
      (today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24)
    );
    const cycleDay = daysSinceStart % cycleData.cycleLength;

    if (cycleDay < cycleData.periodLength) return "menstrual";
    if (cycleDay < 13) return "follicular";
    if (cycleDay < 17) return "ovulation";
    return "luteal";
  };

  const getDaysUntilPeriod = () => {
    if (!cycleData.lastPeriodStart) return -1;

    const lastPeriod = new Date(cycleData.lastPeriodStart);
    const today = new Date();
    const daysSinceStart = Math.floor(
      (today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24)
    );
    const daysRemaining = cycleData.cycleLength - (daysSinceStart % cycleData.cycleLength);
    return daysRemaining === cycleData.cycleLength ? 0 : daysRemaining;
  };

  const getPredictedNextPeriod = () => {
    if (!cycleData.lastPeriodStart) return null;

    const lastPeriod = new Date(cycleData.lastPeriodStart);
    const today = new Date();
    const daysSinceStart = Math.floor(
      (today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24)
    );
    const cyclesSinceStart = Math.floor(daysSinceStart / cycleData.cycleLength);
    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(nextPeriod.getDate() + (cyclesSinceStart + 1) * cycleData.cycleLength);
    return nextPeriod;
  };

  return (
    <CycleContext.Provider
      value={{
        cycleData,
        setCycleData,
        moodEntries,
        addMoodEntry,
        symptomEntries,
        addSymptomEntry,
        getCurrentPhase,
        getDaysUntilPeriod,
        getPredictedNextPeriod,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
};

export const useCycle = () => {
  const context = useContext(CycleContext);
  if (!context) {
    throw new Error("useCycle must be used within a CycleProvider");
  }
  return context;
};
