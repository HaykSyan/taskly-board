// Compound Card Components

import { ReactNode } from "react";

type CardBaseProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardBaseProps) {
  return (
    <div
      className={`flex flex-col gap-2 px-4 py-1 rounded-2xl shadow overflow-hidden bg-white ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: CardBaseProps) {
  return <div className={`flex py-3 ${className}`}>{children}</div>;
}

export function CardBody({ children, className = "" }: CardBaseProps) {
  return <div className={`flex py-3 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }: CardBaseProps) {
  return <div className={`flex py-3 ${className}`}>{children}</div>;
}
