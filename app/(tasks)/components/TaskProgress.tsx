"use client";
import { useGamification } from "../hooks/useGamification";

export default function TaskProgress() {
  const { progress, isLoading } = useGamification();

  return (
    <div className="p-4 rounded-xl bg-neutral-800 text-white">
      <h3 className="text-lg font-semibold mb-2">Achievements 🏅</h3>
      <ul className="space-y-1 text-sm">
        {isLoading ? (
          <li>Loading...</li>
        ) : progress.badges.length === 0 ? (
          <li>No badges yet. Complete tasks!</li>
        ) : (
          progress.badges.map((badge: string) => <li key={badge}>• {badge}</li>)
        )}
      </ul>
    </div>
  );
}
