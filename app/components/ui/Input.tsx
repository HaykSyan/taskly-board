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
    className={`rounded-lg py-2 px-4 ${className}`}
    disabled={disabled}
    {...props}
  />
);
