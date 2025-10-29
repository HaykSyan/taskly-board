type Props = {
  priority: "low" | "medium" | "high";
};

export const Badge = ({ priority }: Props) => (
  <p
    className={`px-2.5 py-0.5 first-letter:uppercase text-sm rounded-full w-fit ${
      priority === "low"
        ? "bg-blue-600/10 text-blue-600"
        : priority === "medium"
        ? "bg-amber-600/10 text-amber-600"
        : "bg-red-600/10 text-red-600"
    }`}
  >
    {priority}
  </p>
);
