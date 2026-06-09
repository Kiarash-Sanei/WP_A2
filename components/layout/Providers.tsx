"use client";

import { CollectionProvider } from "@/contexts/CollectionContext";
import { HistoryProvider } from "@/contexts/HistoryContext";
import { TabProvider } from "@/contexts/TabContext";
import {
  ThemeProvider as AppThemeProvider,
  useTheme,
} from "@/contexts/ThemeContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";
import { useHasMounted } from "@/hooks/useHasMounted";

function MuiThemeSync({ children }: { children: React.ReactNode }) {
  const { isDark } = useTheme();
  const mounted = useHasMounted();

  const theme = createTheme({
    palette: { mode: mounted ? (isDark ? "dark" : "light") : "light" },
  });

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <AppThemeProvider>
        <MuiThemeSync>
          <TabProvider>
            <CollectionProvider>
              <HistoryProvider>{children}</HistoryProvider>
            </CollectionProvider>
          </TabProvider>
        </MuiThemeSync>
      </AppThemeProvider>
    </AppRouterCacheProvider>
  );
}
