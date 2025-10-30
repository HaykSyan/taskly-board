type Props = {
  status: "creating" | "failed" | "done" | undefined;
};
export const StatusLifecycle = ({ status }: Props) => {
  if (status === "creating")
    return <span className="text-xs text-yellow-600">⏳ Creating...</span>;
  if (status === "failed")
    return <span className="text-xs text-red-600">❌ Failed</span>;

  return null;
};
