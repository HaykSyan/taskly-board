"use client";
import { useGameStore } from "@/app/shared/store/useGameStore";

export default function GameAchievements() {
  const { badges } = useGameStore();

  return (
    <div className="p-4 rounded-xl bg-neutral-800 text-white">
      <h3 className="text-lg font-semibold mb-2">Achievements 🏅</h3>
      <ul className="space-y-1 text-sm">
        {badges.length === 0 ? (
          <li>No badges yet. Complete tasks!</li>
        ) : (
          badges.map((badge: string) => <li key={badge}>• {badge}</li>)
        )}
      </ul>
    </div>
  );
}
