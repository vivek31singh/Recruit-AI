"use client";
import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "disabled"
    | "info"
    | "light"
    | "dark";
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  type = "button",
  variant = "primary",
  onClick,
  className,
  children,
}) => {
  return (
    <button
      className={`bg-${variant} px-4 py-2 rounded ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
