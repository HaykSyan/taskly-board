import { ReactNode } from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}
export const Select = ({
  children,
  className = "",
  disabled = false,
  ...props
}: SelectProps) => (
  <select
    className={`border border-gray-400 rounded-lg py-2 px-4 ${className}`}
    disabled={disabled}
    {...props}
  >
    {children}
  </select>
);

interface OptionProps extends React.OptionHTMLAttributes<HTMLOptionElement> {
  children: ReactNode | string;
  className?: string;
}
export const Option = ({
  children,
  value,
  className = "",
  ...props
}: OptionProps) => (
  <option className={className} value={value} {...props}>
    {children}
  </option>
);
