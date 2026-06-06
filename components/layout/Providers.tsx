"use client";

import { TabProvider } from "@/contexts/TabContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TabProvider>
        {children}
      </TabProvider>
    </ThemeProvider>
  );
};
