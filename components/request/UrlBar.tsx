"use client";

import { METHODS } from "@/constants/methods";
import { useTab } from "@/contexts/TabContext";
import { useState } from "react";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import { useHistory } from "@/contexts/HistoryContext";
import { useHasMounted } from "@/hooks/useHasMounted";
import { Box, TextField, Select, MenuItem, Button, Alert } from "@mui/material";
import { Send, Clear, Save } from "@mui/icons-material";
import { useCollection } from "@/contexts/CollectionContext";

export function UrlBar() {
  const { tabs, activeTabId, updateTab, clearTab } = useTab();
  const activeTab = tabs.find((tab) => tab.id === activeTabId);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { addToHistory } = useHistory();
  const mounted = useHasMounted();
  const { collections, saveRequest } = useCollection();
  const [collectionId, setCollectionId] = useState("");
  const selectedCollectionId = collectionId || collections[0]?.id || "";

  const isValidUrl = (url: string): boolean => {
    return url.startsWith("http://") || url.startsWith("https://");
  };

  const handleSend = async () => {
    if (!activeTab?.url || !isValidUrl(activeTab.url)) {
      setError("Please enter a valid URL (http:// or https://)");
      return;
    }
    setError(null);
    try {
      setIsLoading(true);

      const headersObj = Object.fromEntries(
        activeTab.headers
          .filter((h) => h.enabled && h.key)
          .map((h) => [h.key, h.value]),
      );

      const response = await fetch(activeTab.url, {
        method: activeTab.method,
        headers: headersObj,
        body: ["GET", "DELETE"].includes(activeTab.method)
          ? undefined
          : activeTab.body,
      });

      const body = await response.text();
      updateTab(activeTabId, {
        response: { status: response.status, body: body },
      });
      addToHistory({
        id: crypto.randomUUID(),
        name: activeTab.name,
        url: activeTab.url,
        method: activeTab.method,
        params: activeTab.params,
        headers: activeTab.headers,
        body: activeTab.body,
      });
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = (collectionId: string) => {
    if (!activeTab || !collectionId) return;
    saveRequest(collectionId, {
      id: crypto.randomUUID(),
      name: activeTab.name,
      url: activeTab.url,
      method: activeTab.method,
      params: activeTab.params,
      headers: activeTab.headers,
      body: activeTab.body,
    });
  };

  if (!mounted) {
    return <div className="flex items-center" />;
  }

  return (
    <>
      {activeTab ? (
        <Box sx={{ p: 1 }}>
          <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
            <Select
              size="small"
              value={activeTab.method}
              onChange={(event) =>
                updateTab(activeTabId, { method: event.target.value as string })
              }
              sx={{ minWidth: 90 }}
            >
              {METHODS.map((method) => (
                <MenuItem key={method} value={method}>
                  {method}
                </MenuItem>
              ))}
            </Select>
            <TextField
              size="small"
              fullWidth
              placeholder="https://api.example.com"
              value={activeTab.url}
              onChange={(e) => updateTab(activeTabId, { url: e.target.value })}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSend}
              startIcon={
                isLoading ? <LoadingSpinner isLoading={true} /> : <Send />
              }
              disabled={isLoading}
              sx={{ whiteSpace: "nowrap", minWidth: "auto" }}
            >
              {isLoading ? "Sending..." : "Send"}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => clearTab(activeTabId)}
              startIcon={<Clear />}
              sx={{ whiteSpace: "nowrap", minWidth: "auto" }}
            >
              Clear
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleSave(selectedCollectionId)}
              startIcon={<Save />}
              sx={{ whiteSpace: "nowrap", minWidth: "auto" }}
            >
              Save
            </Button>
            <Select
              size="small"
              value={selectedCollectionId}
              onChange={(event) => setCollectionId(event.target.value)}
              sx={{ minWidth: 90 }}
            >
              {collections.length === 0 ? (
                <MenuItem disabled>No collections yet</MenuItem>
              ) : (
                collections.map((collection) => (
                  <MenuItem key={collection.id} value={collection.id}>
                    {collection.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {error}
            </Alert>
          )}
        </Box>
      ) : null}
    </>
  );
}
