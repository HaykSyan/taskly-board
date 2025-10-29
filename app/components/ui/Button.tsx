import { ReactNode } from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  children: ReactNode | string;
  className?: string;
  disabled?: boolean;
}
export const Button = ({
  children,
  className = "",
  disabled = false,
  ...props
}: Props) => (
  <button
    className={`rounded-lg px-4 py-2 cursor-pointer ${className}`}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);
