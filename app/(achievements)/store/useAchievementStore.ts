"use client";
import { create } from "zustand";
import { triggerConfetti } from "@/app/shared/libs/confetti";

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  xpRequired: number;
}

interface AchievementState {
  achievements: Achievement[];
  unlockByXP: (xp: number) => void;
}

export const useAchievementStore = create<AchievementState>((set, get) => ({
  achievements: [
    {
      id: "a1",
      title: "First Steps",
      description: "Earn 100 XP",
      unlocked: false,
      xpRequired: 100,
    },
    {
      id: "a2",
      title: "Level 2",
      description: "Earn 200 XP and Reach Level 2",
      unlocked: false,
      xpRequired: 200,
    },
    {
      id: "a5",
      title: "Level 5 Pro",
      description: "Reach Level 5",
      unlocked: false,
      xpRequired: 500,
    },
  ],
  unlockByXP: (xp) => {
    const updated = get().achievements.map((ach) => {
      if (xp >= ach.xpRequired && !ach.unlocked) {
        triggerConfetti(`${ach.title} unlocked! 🏆`);
      }
      return !ach.unlocked && xp >= ach.xpRequired
        ? { ...ach, unlocked: true }
        : ach;
    });

    set({ achievements: updated });
  },
}));

export const useAchievement = () => {
  const achievements = useAchievementStore((state) => state.achievements);
  return { achievements };
};

export const unlockByXP = (xp: number) =>
  useAchievementStore.getState().unlockByXP(xp);
