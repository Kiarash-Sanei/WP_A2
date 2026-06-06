import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Tab } from "@/types/tabs";
import { createContext, useContext } from "react";

type TabContextType = {
    tabs: Tab[];
    activeTabId: string;
    addTab: () => void;
    closeTab: (id: string) => void;
    setActiveTab: (id: string) => void;
    updateTab: (id: string, updates: Partial<Tab>) => void;
};

const TabContext = createContext<TabContextType | null>(null);

export function TabProvider({ children }: { children: React.ReactNode }) {
    const [tabs, setTabs] = useLocalStorage<Tab[]>("tabs", []);
    const [activeTabId, setActiveTabId] = useLocalStorage<string>("activeTabId", "");

    const addTab = () => {
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
    };
    const closeTab = (id: string) => {
        if (activeTabId === id) {
            const index = tabs.findIndex(tab => tab.id === id);
            setActiveTabId(tabs[index - 1]?.id ?? "");
        }
        setTabs(tabs.filter(tab => tab.id !== id));
    };
    const setActiveTab = (id: string) => {
        setActiveTabId(id);
    };
    const updateTab = (id: string, updates: Partial<Tab>) => {
        setTabs(tabs.map((tab) => {
            if (tab.id !== id) {
                return tab;
            }
            return { ...tab, ...updates };
        }));
    };

    return (
        <TabContext.Provider value={{ tabs, activeTabId, addTab, closeTab, setActiveTab, updateTab }}>
        {children}
        </TabContext.Provider>
    );
};

export function useTab() {
    const context = useContext(TabContext);
    if (!context) {
        throw new Error("useTab must be used within a TabProvider");
    }
    return context;
};
