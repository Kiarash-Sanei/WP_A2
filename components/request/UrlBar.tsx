"use client";

import { METHODS } from "@/constants/methods";
import { useTab } from "@/contexts/TabContext";
import { useState } from "react";
import { LoadingSpinner } from "../ui/LoadingSpinner";

export function UrlBar() {
  const { tabs, activeTabId, updateTab } = useTab();
  const activeTab = tabs.find((tab) => tab.id === activeTabId);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {activeTab ? (
        <div className="flex items-center">
          <LoadingSpinner isLoading={isLoading} />
          <select
            value={activeTab?.method}
            onChange={(value) =>
              updateTab(activeTabId, { method: value.target.value })
            }
          >
            {METHODS.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
          <input
            value={activeTab?.url}
            onChange={(value) =>
              updateTab(activeTabId, { url: value.target.value })
            }
          />
          <button onClick={handleSend}>Send</button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      ) : null}
    </>
  );
}
