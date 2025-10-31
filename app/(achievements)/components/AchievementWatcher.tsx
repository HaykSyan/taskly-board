"use client";
import { useEffect } from "react";
import { useGame } from "@/app/shared/store/useGameStore";
import { unlockByXP } from "../store/useAchievementStore";

export default function AchievementWatcher() {
  const { xp } = useGame();

  useEffect(() => {
    unlockByXP(xp);
  }, [xp]);

  return null; // no UI — just syncing XP → achievements
}
