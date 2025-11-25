import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg"; // optional sizes
  color?: string; // optional Tailwind color
  text?: string; // optional loading text
}

const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "text-yellow-500",
  text,
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        className={`animate-spin rounded-full border-4 border-t-4 border-gray-200 ${color} ${sizeClasses[size]}`}
      ></div>
      {text && <span className="text-gray-700 text-sm">{text}</span>}
    </div>
  );
};

export default Spinner;
