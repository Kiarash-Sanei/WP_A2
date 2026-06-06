"use client";

import { useTab } from "@/contexts/TabContext";

export function TabBar() {
  const { tabs, activeTabId, addTab, closeTab, setActiveTab } = useTab();

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
            onClick={(e) => {
              e.stopPropagation();
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
