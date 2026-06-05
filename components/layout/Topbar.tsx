"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export function TopBar() {
  const { isDark, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <header className="flex items-center justify-between p-4">
      <a>POSTMAN</a>
      {mounted && (
        <button onClick={toggleTheme}>
          {isDark ? "☀️" : "🌙"}
        </button>
      )}
    </header>
  );
}