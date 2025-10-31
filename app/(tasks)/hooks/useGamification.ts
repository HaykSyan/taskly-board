import { useEffect, useState } from "react";
import { triggerConfetti } from "@/app/shared/libs/confetti";
import { GameProgress } from "../types/progress.type";

const initialProgress: GameProgress = {
  completedCount: 0,
  badges: [],
};

export function useGamification() {
  const [progress, setProgress] = useState<GameProgress>(initialProgress);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("taskly-progress");
    if (stored) {
      setProgress(JSON.parse(stored));
    }
    setIsLoading(false);
  }, []);

  const storeProgress = (progress: GameProgress) => {
    localStorage.setItem("taskly-progress", JSON.stringify(progress));
  };

  useEffect(() => {
    storeProgress(progress);
  }, [progress]);

  const addCompleted = () => {
    setProgress((prev) => {
      const newCount = prev.completedCount + 1;
      const newBadges = [...prev.badges];

      if (newCount === 5 && !newBadges.includes("starter")) {
        newBadges.push("starter");
        triggerConfetti("You’ve completed 5 tasks! 🎉");
      } else if (newCount === 10 && !newBadges.includes("focus-master")) {
        newBadges.push("focus-master");
        triggerConfetti("Focus Master unlocked! 🔥");
      }

      return { ...prev, completedCount: newCount, badges: newBadges };
    });
  };

  return { progress, addCompleted, isLoading, storeProgress };
}
