import React from "react";
import { Input } from "../base/Input";

interface FormFieldProps {
  error?: string;
}
export const FormField: React.FC<FormFieldProps> = ({ error }) => {
  // FormField = Label + Input + Error
  
  // Dropdown = Input + Menu List

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // handle the change event
    console.log(event.target.value);
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      <Input
        type="text"
        id="email"
        label="Email"
        placeholder="Enter your email"
        onChange={handleChange}
        className={`text-sm text-black border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:border-indigo-500 dark:focus:ring-indigo-900 dark:focus:border-indigo-900 ${
          error
            ? "border-red-500 text-red-500 focus:outline-red-500 focus:ring-red-500 focus:border-red-500"
            : ""
        }`}
      />
      <p className="text-red-500 text-sm">{error}</p>
    </div>
  );
};
