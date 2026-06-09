"use client";

import { CollectionProvider } from "@/contexts/CollectionContext";
import { HistoryProvider } from "@/contexts/HistoryContext";
import { TabProvider } from "@/contexts/TabContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider>
        <TabProvider>
          <CollectionProvider>
            <HistoryProvider>{children}</HistoryProvider>
          </CollectionProvider>
        </TabProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
