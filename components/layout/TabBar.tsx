"use client";

import { useTab } from "@/contexts/TabContext";
import { useHasMounted } from "@/hooks/useHasMounted";

export function TabBar() {
  const { tabs, activeTabId, addTab, closeTab, setActiveTab } = useTab();
  const mounted = useHasMounted();

  if (!mounted) {
    return (
      <div className="flex items-center">
        <button onClick={() => addTab()}>+</button>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={tab.id === activeTabId ? "bg-blue-500" : "bg-gray-200"}
        >
          {tab.name}
          <button
            onClick={(event) => {
              event.stopPropagation();
              closeTab(tab.id);
            }}
          >
            ×
          </button>
        </div>
      ))}
      <button onClick={() => addTab()}>+</button>
    </div>
  );
}
