import React from "react";

interface MainContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const MainContainer: React.FC<MainContainerProps> = ({
  children,
  className,
}) => {
  return (
    <main
      className={`flex flex-col items-center min-h-screen w-full ${className}`}
    >
      {children}
    </main>
  );
};
