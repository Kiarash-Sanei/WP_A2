"use client";

import { useTab } from "@/contexts/TabContext";

const getStatusColor = (status: number): string => {
  if (status >= 200 && status < 300) {
    return "text-green-500";
  }
  if (status >= 400 && status < 500) {
    return "text-yellow-500";
  }
  if (status >= 500) {
    return "text-red-500";
  }
  return "text-gray-500";
};

const formatBody = (body: string): string => {
  try {
    return JSON.stringify(JSON.parse(body), null, 2);
  } catch {
    return body;
  }
};

export function ResponseViewer() {
  const { tabs, activeTabId } = useTab();
  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  if (!activeTab?.response) return <div>No response yet</div>;

  return (
    <div>
      <div className={getStatusColor(activeTab.response.status)}>
        {activeTab.response.status}
      </div>
      <pre>{formatBody(activeTab.response.body)}</pre>
    </div>
  );
}
