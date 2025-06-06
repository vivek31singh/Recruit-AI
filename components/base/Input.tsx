"use client";
import React, { ChangeEvent } from "react";
import { Label } from "./Label";

interface InputProps {
  id: string;
  type?: string;
  value?: string | number;
  label?: string;
  placeholder?: string;
  className?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void
}

export const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  onClick,
  className,
}) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <Label htmlFor={id} label={label} className="text-sm font-medium" />
      )}
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        className={`border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:border-indigo-500 dark:focus:ring-indigo-900 dark:focus:border-indigo-900 ${className}`}
        onChange={onChange}
        onClick={onClick}
      />
    </div>
  );
};
