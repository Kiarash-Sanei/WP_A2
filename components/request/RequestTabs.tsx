"use client";

import { useTab } from "@/contexts/TabContext";
import { useState } from "react";
import { KeyValueEditor } from "./KeyValueEditor";

type Section = "params" | "headers" | "body";

export function RequestTabs() {
  const [activeSection, setActiveSection] = useState<Section>("params");
  const { tabs, activeTabId, updateTab } = useTab();
  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  if (!activeTab) return null;

  return (
    <div>
      <button onClick={() => setActiveSection("params")}>Params</button>
      <div>
        {(["params", "headers", "body"] as Section[]).map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={
              activeSection === section ? "bg-blue-500" : "bg-gray-200"
            }
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>
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
        <textarea
          value={activeTab.body}
          onChange={(event) =>
            updateTab(activeTabId, { body: event.target.value })
          }
        />
      )}
    </div>
  );
}
