import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import {
  Calendar,
  ChartLine,
  Settings as SettingsIcon,
  Sun,
  Moon,
} from "lucide-react";

const Header = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const getNavItemClass = (path) => {
    const baseClass =
      "flex items-center gap-2 px-4 py-2 rounded-md transition-colors";
    const activeClass = "bg-primary text-primary-foreground";
    const inactiveClass = "hover:bg-muted";

    return `${baseClass} ${location.pathname === path ? activeClass : inactiveClass}`;
  };

  return (
    <div className="container mx-auto mb-6 flex items-center justify-between border-b py-4">
      <div className="flex items-center gap-1 text-xl font-bold">
        <Calendar className="h-6 w-6" />
        <span>Mood Journal</span>
      </div>

      <div className="flex gap-4">
        <Link to="/" className={getNavItemClass("/")}>
          <Calendar className="h-5 w-5" />
          <span className="hidden md:inline">Journal</span>
        </Link>
        <Link to="/statistics" className={getNavItemClass("/statistics")}>
          <ChartLine className="h-5 w-5" />
          <span className="hidden md:inline">Statistics</span>
        </Link>
        <Link to="/settings" className={getNavItemClass("/settings")}>
          <SettingsIcon className="h-5 w-5" />
          <span className="hidden md:inline">Settings</span>
        </Link>
        <button
          onClick={toggleTheme}
          className="hover:bg-muted rounded-md p-2 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
