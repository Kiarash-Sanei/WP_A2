"use client";

import { CollectionProvider } from "@/contexts/CollectionContext";
import { HistoryProvider } from "@/contexts/HistoryContext";
import { TabProvider } from "@/contexts/TabContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TabProvider>
        <CollectionProvider>
          <HistoryProvider>{children}</HistoryProvider>
        </CollectionProvider>
      </TabProvider>
    </ThemeProvider>
  );
}
