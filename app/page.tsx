"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { SideBar } from "@/components/layout/SideBar";
import { TopBar } from "@/components/layout/TopBar";
import { TabBar } from "@/components/layout/TabBar";
import { MainPanel } from "@/components/layout/MainPanel";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box
      sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}
    >
      <SideBar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <TabBar />
        <MainPanel />
      </Box>
    </Box>
  );
}
