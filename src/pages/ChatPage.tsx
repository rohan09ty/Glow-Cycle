import React, { useState, useRef, useEffect } from "react";
import { useCycle } from "@/contexts/CycleContext";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickSuggestions = [
  "What foods help with cramps?",
  "How can I manage PMS?",
  "Tell me about my cycle phase",
  "Self-care tips for today",
];

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi there! 🌸 I'm your wellness companion. I'm here to support you with period care, emotional wellness, and hygiene tips. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { getCurrentPhase, moodEntries } = useCycle();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const phase = getCurrentPhase();
    const lastMood = moodEntries[0];
    const lowercaseMsg = userMessage.toLowerCase();

    // Context-aware responses based on cycle phase
    if (lowercaseMsg.includes("cramp") || lowercaseMsg.includes("pain")) {
      return `I'm sorry you're experiencing cramps 💕 Here are some tips that might help:\n\n• Apply a warm heating pad to your lower abdomen\n• Try gentle yoga poses like child's pose\n• Stay hydrated with warm herbal teas (ginger or chamomile)\n• Consider magnesium-rich foods like dark chocolate and bananas\n\nIf cramps are severe, it's always a good idea to consult with your healthcare provider.`;
    }

    if (lowercaseMsg.includes("pms") || lowercaseMsg.includes("mood swing")) {
      return `PMS can be challenging, but you're not alone 🌸\n\nHere's what might help:\n• Regular exercise (even gentle walks)\n• Limit caffeine and salt intake\n• Get enough sleep (7-9 hours)\n• Practice mindfulness or meditation\n• Eat complex carbs and protein\n\nRemember, these feelings are temporary and valid. Be gentle with yourself! 💕`;
    }

    if (lowercaseMsg.includes("phase") || lowercaseMsg.includes("cycle")) {
      const phaseInfo: Record<string, string> = {
        menstrual: `You're in your **menstrual phase** 🩸\n\nThis is a time for rest and reflection. Your body is doing important work! Focus on:\n• Rest and gentle movement\n• Iron-rich foods (leafy greens, beans)\n• Staying warm and cozy\n• Self-compassion`,
        follicular: `You're in your **follicular phase** 🌱\n\nYour energy is rising! This is a great time for:\n• Starting new projects\n• Social activities\n• More intense workouts\n• Creative endeavors`,
        ovulation: `You're in your **ovulation phase** ✨\n\nYou're at peak energy and confidence! Perfect for:\n• Important meetings or conversations\n• High-intensity exercise\n• Socializing and connecting\n• Taking on challenges`,
        luteal: `You're in your **luteal phase** 🌙\n\nTime to slow down and nurture yourself:\n• Gentle yoga and walks\n• Comfort foods (healthy ones!)\n• Extra self-care rituals\n• Preparing for rest`,
        unknown: `I don't have your cycle data yet. Log your period in the tracker to get personalized phase insights! 📅`,
      };
      return phaseInfo[phase] || phaseInfo.unknown;
    }

    if (lowercaseMsg.includes("self-care") || lowercaseMsg.includes("tips")) {
      return `Here are some self-care ideas for today 🌸\n\n✨ **Physical**\n• Take a warm bath or shower\n• Do some gentle stretching\n• Get outside for fresh air\n\n💆 **Mental**\n• Practice 5 minutes of deep breathing\n• Journal your thoughts\n• Listen to calming music\n\n💕 **Emotional**\n• Reach out to a friend\n• Say kind things to yourself\n• Do something that brings you joy`;
    }

    if (lowercaseMsg.includes("food") || lowercaseMsg.includes("eat") || lowercaseMsg.includes("diet")) {
      return `Great question about nutrition! 🥗\n\nHere are foods that support your cycle:\n\n**During period:**\n• Iron-rich: spinach, lentils, dark chocolate\n• Anti-inflammatory: turmeric, ginger, salmon\n\n**Throughout cycle:**\n• Magnesium: nuts, seeds, avocado\n• Omega-3s: fatty fish, walnuts\n• Fiber: whole grains, vegetables\n\nStay hydrated with water and herbal teas! 💧`;
    }

    // Default supportive response
    return `Thank you for sharing that with me 💕\n\nI'm here to support your wellness journey. Feel free to ask me about:\n• Period symptoms and relief\n• Cycle phases and what to expect\n• Self-care and wellness tips\n• Nutrition for hormonal balance\n\nRemember, I'm here to provide general wellness guidance. For medical concerns, please consult a healthcare provider.`;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const response = generateResponse(userMessage.content);

    const assistantMessage: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="min-h-screen pb-24 flex flex-col gradient-hero">
      {/* Header */}
      <div className="p-6 pt-12 border-b border-border/30">
        <div className="flex items-center gap-3 animate-slide-up">
          <div className="w-12 h-12 rounded-2xl gradient-rose flex items-center justify-center">
            <Bot className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold">Wellness AI</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
              Online • Here to help
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex gap-3 animate-slide-up ${
              message.role === "user" ? "flex-row-reverse" : ""
            }`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                message.role === "user"
                  ? "gradient-lavender"
                  : "gradient-rose"
              }`}
            >
              {message.role === "user" ? (
                <User className="w-4 h-4 text-primary-foreground" />
              ) : (
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              )}
            </div>
            <Card
              variant={message.role === "user" ? "default" : "glass"}
              className={`max-w-[80%] ${
                message.role === "user" ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              <CardContent className="p-3">
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p
                  className={`text-[10px] mt-1 ${
                    message.role === "user"
                      ? "text-primary-foreground/60"
                      : "text-muted-foreground"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 animate-slide-up">
            <div className="w-8 h-8 rounded-xl gradient-rose flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <Card variant="glass">
              <CardContent className="p-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                  <span
                    className="w-2 h-2 rounded-full bg-primary animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <span
                    className="w-2 h-2 rounded-full bg-primary animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Quick Suggestions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {quickSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestion(suggestion)}
                className="shrink-0 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium hover:bg-primary/10 hover:border-primary transition-all"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border/30 bg-background/80 backdrop-blur-lg">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask me anything..."
            className="bg-card"
          />
          <Button
            variant="rose"
            size="icon"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
