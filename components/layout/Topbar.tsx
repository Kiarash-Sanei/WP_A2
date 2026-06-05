"use client";

import { useTheme } from "@/contexts/ThemeContext";

export function TopBar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between p-4">
      <a>POSTMAN</a>
      <button onClick={toggleTheme}>{isDark ? "☀️" : "🌙"}</button>
    </header>
  );
}
