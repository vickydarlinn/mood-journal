import React from "react";

export const Switch = ({ checked, onCheckedChange, className = "" }) => {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`focus-visible:ring-ring relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${checked ? "bg-primary" : "bg-input"} ${className} `}
    >
      <span
        className={`bg-background pointer-events-none block h-5 w-5 rounded-full shadow-lg ring-0 transition-transform ${checked ? "translate-x-5" : "translate-x-0"} `}
      />
    </button>
  );
};
