"use client";
import { create } from "zustand";

type GameState = {
  xp: number;
  level: number;
  completedCount: number;
  incrementXP: (amount: number) => void;
  badges: string[];
  updateProgress: (completedCount: number) => void;
  addCompleted: () => void;
};

export const useGameStore = create<GameState>((set, get) => ({
  xp: 0,
  level: 1,
  completedCount: 0,
  badges: [],

  incrementXP: (amount) => {
    const newXP = get().xp + amount;
    const newLevel = Math.floor(newXP / 100) + 1;

    set({ xp: newXP, level: newLevel });

    // if (newXP % 100 === 0) triggerConfetti("Level up! 🎉");
  },
  updateProgress: (count) => {
    const badges = [];
    if (count >= 5) badges.push("starter");
    if (count >= 10) badges.push("focus-master");
    set({ completedCount: count, badges });
  },

  addCompleted: () => {
    const newCount = get().completedCount + 1;
    const badges = [...get().badges];
    if (newCount === 5 && !badges.includes("starter")) {
      badges.push("starter");
    } else if (newCount === 10 && !badges.includes("focus-master")) {
      badges.push("focus-master");
    }
    set({ completedCount: newCount, badges });
  },
}));

export const useGame = () => {
  const xp = useGameStore((state) => state.xp);
  const level = useGameStore((state) => state.level);
  const completedCount = useGameStore((state) => state.completedCount);
  const badges = useGameStore((state) => state.badges);
  return { xp, level, completedCount, badges };
};

export const updateProgress = (count: number) =>
  useGameStore.getState().updateProgress(count);
export const incrementXP = (amount: number) =>
  useGameStore.getState().incrementXP(amount);
export const addCompleted = () => useGameStore.getState().addCompleted();
