"use client";

import { CollectionProvider } from "@/contexts/CollectionContext";
import { TabProvider } from "@/contexts/TabContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TabProvider>
        <CollectionProvider>{children}</CollectionProvider>
      </TabProvider>
    </ThemeProvider>
  );
}
