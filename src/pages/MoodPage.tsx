import React, { useState } from "react";
import { useCycle } from "@/contexts/CycleContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const moods = [
  { emoji: "😊", label: "Happy", value: "happy" },
  { emoji: "😌", label: "Calm", value: "calm" },
  { emoji: "😔", label: "Sad", value: "sad" },
  { emoji: "😤", label: "Irritable", value: "irritable" },
  { emoji: "😰", label: "Anxious", value: "anxious" },
  { emoji: "😴", label: "Tired", value: "tired" },
  { emoji: "🥰", label: "Loving", value: "loving" },
  { emoji: "😢", label: "Emotional", value: "emotional" },
];

const energyLevels = [1, 2, 3, 4, 5];

const symptoms = [
  { emoji: "🩸", label: "Cramps", value: "cramps" },
  { emoji: "🤕", label: "Headache", value: "headache" },
  { emoji: "😣", label: "Bloating", value: "bloating" },
  { emoji: "🍫", label: "Cravings", value: "cravings" },
  { emoji: "😓", label: "Fatigue", value: "fatigue" },
  { emoji: "💔", label: "Breast Pain", value: "breast_pain" },
  { emoji: "🌡️", label: "Hot Flashes", value: "hot_flashes" },
  { emoji: "😵", label: "Dizziness", value: "dizziness" },
];

const MoodPage = () => {
  const [selectedMood, setSelectedMood] = useState("");
  const [energy, setEnergy] = useState(3);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const { addMoodEntry, addSymptomEntry, moodEntries } = useCycle();

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const handleSave = () => {
    if (!selectedMood) {
      toast.error("Please select your mood");
      return;
    }

    const today = new Date().toISOString().split("T")[0];

    addMoodEntry({
      date: today,
      mood: selectedMood,
      energy,
      notes,
    });

    if (selectedSymptoms.length > 0) {
      addSymptomEntry({
        date: today,
        symptoms: selectedSymptoms,
        severity: selectedSymptoms.length > 3 ? "severe" : selectedSymptoms.length > 1 ? "moderate" : "mild",
      });
    }

    toast.success("Entry saved! 💕");
    setSelectedMood("");
    setEnergy(3);
    setSelectedSymptoms([]);
    setNotes("");
  };

  const todaysMood = moodEntries.find(
    (entry) => entry.date === new Date().toISOString().split("T")[0]
  );

  return (
    <div className="min-h-screen pb-24 gradient-hero">
      {/* Header */}
      <div className="p-6 pt-12">
        <h1 className="font-display text-2xl font-bold animate-slide-up">
          How are you feeling? 🌸
        </h1>
        <p className="text-muted-foreground text-sm animate-slide-up stagger-1">
          Track your mood and symptoms daily
        </p>
      </div>

      {/* Today's Status */}
      {todaysMood && (
        <div className="px-6 mb-6">
          <Card variant="glass" className="animate-slide-up stagger-1 border-primary/30">
            <CardContent className="p-4 flex items-center gap-3">
              <span className="text-3xl">
                {moods.find((m) => m.value === todaysMood.mood)?.emoji}
              </span>
              <div>
                <p className="font-semibold">Today's mood logged</p>
                <p className="text-sm text-muted-foreground">
                  Energy: {todaysMood.energy}/5
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Mood Selection */}
      <div className="px-6 mb-6">
        <Card variant="glass" className="animate-slide-up stagger-2">
          <CardHeader>
            <CardTitle className="font-display text-lg">Select Your Mood</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-3">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-200 ${
                    selectedMood === mood.value
                      ? "bg-primary/20 ring-2 ring-primary shadow-soft scale-105"
                      : "bg-card hover:bg-muted"
                  }`}
                >
                  <span className="text-2xl mb-1">{mood.emoji}</span>
                  <span className="text-[10px] font-medium">{mood.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Energy Level */}
      <div className="px-6 mb-6">
        <Card variant="glass" className="animate-slide-up stagger-3">
          <CardHeader>
            <CardTitle className="font-display text-lg">Energy Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center gap-2">
              <span className="text-sm text-muted-foreground">Low</span>
              <div className="flex gap-2">
                {energyLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setEnergy(level)}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-all duration-200 ${
                      energy >= level
                        ? "gradient-lavender text-primary-foreground shadow-soft"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">High</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Symptoms */}
      <div className="px-6 mb-6">
        <Card variant="glass" className="animate-slide-up stagger-4">
          <CardHeader>
            <CardTitle className="font-display text-lg">Any Symptoms?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {symptoms.map((symptom) => (
                <button
                  key={symptom.value}
                  onClick={() => toggleSymptom(symptom.value)}
                  className={`flex flex-col items-center p-2 rounded-xl transition-all duration-200 ${
                    selectedSymptoms.includes(symptom.value)
                      ? "bg-rose-light text-rose-dark ring-2 ring-rose"
                      : "bg-card hover:bg-muted"
                  }`}
                >
                  <span className="text-xl mb-0.5">{symptom.emoji}</span>
                  <span className="text-[9px] font-medium text-center leading-tight">
                    {symptom.label}
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notes */}
      <div className="px-6 mb-6">
        <Card variant="glass" className="animate-slide-up stagger-5">
          <CardHeader>
            <CardTitle className="font-display text-lg">Notes (Optional)</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="How are you really feeling today?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px] bg-card/50"
            />
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <div className="px-6">
        <Button variant="rose" size="lg" className="w-full" onClick={handleSave}>
          Save Entry 💕
        </Button>
      </div>
    </div>
  );
};

export default MoodPage;
