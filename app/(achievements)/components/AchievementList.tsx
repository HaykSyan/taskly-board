"use client";
import { Badge } from "@/app/shared/components/ui";
import { useAchievement } from "../store/useAchievementStore";
import { useGame } from "@/app/shared/store/useGameStore";
import { FaCheck } from "react-icons/fa";

export default function AchievementList() {
  const { achievements } = useAchievement();
  const { xp, level, badges } = useGame();

  const currentBadge = badges[badges.length - 1] ?? "";

  return (
    <section className="space-y-4 px-4 bg-white dark:bg-neutral-800 rounded-2xl sticky top-2 h-fit">
      <h2 className="text-lg font-bold mb-2">Achievements 🏆</h2>
      <p className="text-sm mb-4 flex gap-1.5 items-center">
        XP: {xp} | Level: {level}{" "}
        {currentBadge && (
          <>
            | <Badge text={currentBadge} variant="done" />
          </>
        )}
      </p>

      <ul className="space-y-2 lg:block hidden">
        {achievements.map((a) => (
          <li
            key={a.id}
            className={`p-2 rounded-md ${
              a.unlocked ? "bg-green-100" : "bg-gray-100"
            }`}
          >
            <strong>{a.title}</strong> — {a.description}
            {a.unlocked && (
              <span>
                {" "}
                <FaCheck className="text-green-600 inline-block" />
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
