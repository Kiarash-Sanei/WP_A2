import { useLocalStorage } from "@/hooks/useLocalStorage";
import { SavedRequest, Tab } from "@/types/tabs";
import { createContext, useCallback, useContext, useEffect } from "react";

type TabContextType = {
  tabs: Tab[];
  activeTabId: string;
  addTab: () => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  updateTab: (id: string, updates: Partial<Tab>) => void;
  clearTab: (id: string) => void;
  openRequestInNewTab: (request: SavedRequest) => void;
};

const TabContext = createContext<TabContextType | null>(null);

export function TabProvider({ children }: { children: React.ReactNode }) {
  const [tabs, setTabs] = useLocalStorage<Tab[]>("tabs", []);
  const [activeTabId, setActiveTabId] = useLocalStorage<string>(
    "activeTabId",
    "",
  );

  const addTab = useCallback(() => {
    const newTab: Tab = {
      id: crypto.randomUUID(),
      name: "New Request",
      url: "",
      method: "GET",
      params: [],
      headers: [],
      body: "",
      response: null,
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  }, [tabs, setTabs, setActiveTabId]);

  const closeTab = (id: string) => {
    if (activeTabId === id) {
      const index = tabs.findIndex((tab) => tab.id === id);
      setActiveTabId(tabs[index - 1]?.id ?? "");
    }
    setTabs(tabs.filter((tab) => tab.id !== id));
  };
  const setActiveTab = (id: string) => {
    setActiveTabId(id);
  };
  const updateTab = (id: string, updates: Partial<Tab>) => {
    setTabs(
      tabs.map((tab) => {
        if (tab.id !== id) {
          return tab;
        }
        return { ...tab, ...updates };
      }),
    );
  };

  const clearTab = (id: string) => {
    updateTab(id, {
      url: "",
      method: "GET",
      params: [],
      headers: [],
      body: "",
      response: null,
    });
  };

  const openRequestInNewTab = (request: SavedRequest) => {
    const newTab: Tab = {
      id: crypto.randomUUID(),
      name: request.name,
      url: request.url,
      method: request.method,
      params: request.params,
      headers: request.headers,
      body: request.body,
      response: null,
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  useEffect(() => {
    if (tabs.length === 0) {
      addTab();
    }
  }, [addTab, tabs.length]);

  return (
    <TabContext.Provider
      value={{
        tabs,
        activeTabId,
        addTab,
        closeTab,
        setActiveTab,
        updateTab,
        clearTab,
        openRequestInNewTab,
      }}
    >
      {children}
    </TabContext.Provider>
  );
}

export function useTab() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTab must be used within a TabProvider");
  }
  return context;
}
