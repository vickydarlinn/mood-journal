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
import { navItems } from "../config";

const Header = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const getNavItemClass = (path) => {
    const base =
      "flex items-center gap-2 px-4 py-2 rounded-md transition-colors";
    const active = "bg-primary text-primary-foreground";
    const inactive = "hover:bg-muted";
    return `${base} ${location.pathname === path ? active : inactive}`;
  };

  return (
    <div className="container mx-auto mb-6 flex items-center justify-between border-b py-4">
      {/* Logo / Title */}
      <div className="flex items-center gap-1 p-1 text-xl font-bold sm:p-0">
        <Calendar className="h-6 w-6" />
        <span>Mood Journal</span>
      </div>

      {/* ─── Desktop nav (sm and up) ──────────────────────────── */}
      <div className="hidden items-center gap-4 sm:flex">
        {navItems.map((item) => (
          <Link key={item.to} to={item.to} className={getNavItemClass(item.to)}>
            <item.icon className="h-5 w-5" />
            <span className="hidden md:inline">{item.label}</span>
          </Link>
        ))}
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

      {/* ─── Mobile nav (below sm) ───────────────────────────── */}
      <div className="bg-accent fixed bottom-0 left-0 z-20 flex w-full p-2 sm:hidden">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-1 flex-col items-center justify-center ${getNavItemClass(
              item.to,
            )}`}
          >
            <item.icon className="h-5 w-5" />
            {/* you can drop labels here or keep only icons */}
          </Link>
        ))}
        <button
          onClick={toggleTheme}
          className="hover:bg-muted hidden flex-1 items-center justify-center rounded-md p-2 transition-colors sm:flex"
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
