import { useLocalStorage } from "@/hooks/useLocalStorage";
import { SavedRequest } from "@/types/tabs";
import { createContext, useContext } from "react";

type HistoryContextType = {
  history: SavedRequest[];
  addToHistory: (request: SavedRequest) => void;
  clearHistory: () => void;
  deleteFromHistory: (id: string) => void;
};
const HistoryContext = createContext<HistoryContextType | null>(null);

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useLocalStorage<SavedRequest[]>(
    "histories",
    [],
  );

  const addToHistory = (request: SavedRequest) => {
    setHistory([...history, request]);
  };
  const clearHistory = () => {
    setHistory([]);
  };
  const deleteFromHistory = (id: string) => {
    setHistory(history.filter((request) => request.id !== id));
  };

  return (
    <HistoryContext.Provider
      value={{
        history,
        addToHistory,
        clearHistory,
        deleteFromHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
}
