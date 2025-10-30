interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  disabled?: boolean;
}
export const Input = ({
  className = "",
  disabled = false,
  ...props
}: Props) => (
  <input
    className={`border border-gray-400 rounded-lg py-2 px-4 ${className}`}
    disabled={disabled}
    {...props}
  />
);

export const ErrorMessage = ({ error }: { error: string | undefined }) =>
  error ? <p className="text-sm text-red-500">{error}</p> : null;
