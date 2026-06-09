"use client";

import { useTab } from "@/contexts/TabContext";
import { useHasMounted } from "@/hooks/useHasMounted";
import { Chip, Paper } from "@mui/material";

const getStatusColor = (status: number) => {
  if (status >= 200 && status < 300) {
    return "success";
  }
  if (status >= 400 && status < 500) {
    return "warning";
  }
  if (status >= 500) {
    return "error";
  }
  return "default";
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
  const mounted = useHasMounted();
  if (!mounted) return null;

  return (
    <Paper
      variant="outlined"
      sx={{ p: 2, mt: 1, overflow: "auto", maxHeight: 400 }}
    >
      {activeTab?.response && (
        <Chip
          label={`Status: ${activeTab.response.status}`}
          color={getStatusColor(activeTab.response.status)}
          sx={{ mb: 1 }}
        />
      )}
      <pre style={{ margin: 0 }}>
        {!activeTab?.response
          ? "No response yet"
          : formatBody(activeTab.response.body)}
      </pre>
    </Paper>
  );
}
