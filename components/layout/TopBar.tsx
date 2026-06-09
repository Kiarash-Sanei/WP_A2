"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useHasMounted } from "@/hooks/useHasMounted";

export function TopBar() {
  const { isDark, toggleTheme } = useTheme();
  const mounted = useHasMounted();

  return (
    <header className="flex items-center justify-between p-4">
      <a>POSTMAN</a>
      {mounted && <button onClick={toggleTheme}>{isDark ? "☀️" : "🌙"}</button>}
    </header>
  );
}
