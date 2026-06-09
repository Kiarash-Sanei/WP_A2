import { MainPanel } from "@/components/layout/MainPanel";
import { SideBar } from "@/components/layout/SideBar";
import { TabBar } from "@/components/layout/TabBar";
import { TopBar } from "@/components/layout/TopBar";

export default function Home() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex flex-col flex-1">
        <TopBar />
        <TabBar />
        <MainPanel />
      </div>
    </div>
  );
}
