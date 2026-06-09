"use client";

import { useTab } from "@/contexts/TabContext";
import { useHasMounted } from "@/hooks/useHasMounted";
import { Box, Tabs, Tab, IconButton } from "@mui/material";
import { Close, Add } from "@mui/icons-material";
import { useState } from "react";

export function TabBar() {
  const { tabs, activeTabId, addTab, closeTab, setActiveTab, updateTab } =
    useTab();
  const mounted = useHasMounted();
  const [editingId, setEditingId] = useState("");

  if (!mounted) return null;

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider", display: "flex" }}>
      <Tabs value={activeTabId} onChange={(_, value) => setActiveTab(value)}>
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            value={tab.id}
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {editingId === tab.id ? (
                  <input
                    autoFocus
                    value={tab.name}
                    onChange={(e) =>
                      updateTab(tab.id, { name: e.target.value })
                    }
                    onBlur={() => setEditingId("")}
                    onKeyDown={(e) => e.key === "Enter" && setEditingId("")}
                  />
                ) : (
                  <span onDoubleClick={() => setEditingId(tab.id)}>
                    {tab.name}
                  </span>
                )}
                <Close
                  fontSize="small"
                  onClick={(event) => {
                    event.stopPropagation();
                    closeTab(tab.id);
                  }}
                />
              </Box>
            }
          />
        ))}
      </Tabs>
      <IconButton onClick={addTab} size="small">
        <Add />
      </IconButton>
    </Box>
  );
}
