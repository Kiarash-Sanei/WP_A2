"use client"

import { METHODS } from "@/constants/methods";
import { useTab } from "@/contexts/TabContext";
import { useState } from "react";

export function UrlBar() {
    const { tabs, activeTabId, updateTab } = useTab();
    const activeTab = tabs.find(tab => tab.id === activeTabId);
    const [error, setError] = useState<string | null>(null);
    
    const isValidUrl = (url: string): boolean => {
        return url.startsWith("http://") || url.startsWith("https://");
    };

    const handleSend = () => {
        if (!activeTab?.url || !isValidUrl(activeTab.url)) {
            setError("Please enter a valid URL (http:// or https://)");
            return;
        }
        setError(null);
        // actual request logic comes later
    };

    return (
        <>
            {activeTab ?
                <div className="flex items-center">
                    <select 
                        value={activeTab?.method}
                        onChange={(value) => updateTab(activeTabId, { method: value.target.value })}
                    >
                        {METHODS.map(method => (
                            <option key={method} value={method}>{method}</option>
                        ))}
                    </select>
                    <input
                        value={activeTab?.url}
                        onChange={(value) => updateTab(activeTabId, { url: value.target.value })}
                    />
                    <button onClick={handleSend}>Send</button>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
                : null}
        </>
    );
}