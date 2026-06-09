"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { useHasMounted } from "@/hooks/useHasMounted";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { Menu } from "@mui/icons-material";

type TopBarProps = {
  onMenuClick: () => void;
};

export function TopBar({ onMenuClick }: TopBarProps) {
  const { isDark, toggleTheme } = useTheme();
  const mounted = useHasMounted();

  if (!mounted) return null;

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          onClick={onMenuClick}
          sx={{ display: { md: "none" }, color: "inherit" }}
        >
          <Menu />
        </IconButton>

        <Typography>POSTMAN</Typography>

        <IconButton onClick={toggleTheme} color="inherit">
          {isDark ? <LightMode /> : <DarkMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
