"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useHasMounted } from "@/hooks/useHasMounted";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

export function TopBar() {
  const { isDark, toggleTheme } = useTheme();
  const mounted = useHasMounted();

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography>POSTMAN</Typography>
        {mounted && (
          <IconButton onClick={toggleTheme}>
            {isDark ? <LightMode /> : <DarkMode />}
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
