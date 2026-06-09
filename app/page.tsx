import { MainPanel } from "@/components/layout/MainPanel";
import { SideBar } from "@/components/layout/SideBar";
import { TabBar } from "@/components/layout/TabBar";
import { TopBar } from "@/components/layout/TopBar";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}
    >
      <SideBar />
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <TopBar />
        <TabBar />
        <MainPanel />
      </Box>
    </Box>
  );
}
