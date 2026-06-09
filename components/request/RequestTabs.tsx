"use client";

import { useTab } from "@/contexts/TabContext";
import { useState } from "react";
import { KeyValueEditor } from "./KeyValueEditor";
import { useHasMounted } from "@/hooks/useHasMounted";
import { Box, Tabs, Tab, TextField } from "@mui/material";

type Section = "params" | "headers" | "body";

export function RequestTabs() {
  const [activeSection, setActiveSection] = useState<Section>("params");
  const { tabs, activeTabId, updateTab } = useTab();
  const activeTab = tabs.find((tab) => tab.id === activeTabId);
  const mounted = useHasMounted();

  if (!mounted) return null;
  if (!activeTab) return null;

  return (
    <Box sx={{ p: 1 }}>
      <Tabs
        value={activeSection}
        onChange={(_, value) => setActiveSection(value as Section)}
        sx={{ borderBottom: 1, borderColor: "divider", mb: 1 }}
      >
        <Tab label="Params" value="params" />
        <Tab label="Headers" value="headers" />
        <Tab label="Body" value="body" />
      </Tabs>

      {activeSection === "params" && (
        <KeyValueEditor
          items={activeTab.params}
          onChange={(params) => updateTab(activeTabId, { params })}
        />
      )}
      {activeSection === "headers" && (
        <KeyValueEditor
          items={activeTab.headers}
          onChange={(headers) => updateTab(activeTabId, { headers })}
        />
      )}
      {activeSection === "body" && (
        <TextField
          multiline
          rows={6}
          fullWidth
          placeholder='{"key": "value"}'
          value={activeTab.body}
          onChange={(e) => updateTab(activeTabId, { body: e.target.value })}
        />
      )}
    </Box>
  );
}
