type Props = {
  text: string;
  variant: "low" | "medium" | "high" | "done";
};

export const Badge = ({ text, variant = "low" }: Props) => (
  <span
    className={`px-2.5 py-0.5 first-letter:uppercase text-sm rounded-full w-fit inline-block ${
      variant === "low"
        ? "bg-blue-600/10 text-blue-600"
        : variant === "medium"
        ? "bg-amber-600/10 text-amber-600"
        : variant === "high"
        ? "bg-red-600/10 text-red-600"
        : "bg-green-600/10 text-green-600"
    }`}
  >
    {text}
  </span>
);
