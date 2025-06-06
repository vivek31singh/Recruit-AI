import React from "react";

interface LabelProps {
  htmlFor: string;
  label?: string;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({ htmlFor, label, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-gray-600 dark:text-gray-400 ${className}`}
    >
      {label}
    </label>
  );
};

