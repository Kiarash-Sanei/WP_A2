import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Collection, SavedRequest } from "@/types/tabs";
import { createContext, useContext } from "react";

type CollectionContextType = {
  collections: Collection[];
  addCollection: (name: string) => void;
  deleteCollection: (id: string) => void;
  saveRequest: (collectionId: string, request: SavedRequest) => void;
  deleteRequest: (collectionId: string, requestId: string) => void;
  exportCollection: (id: string) => void;
  importCollection: (file: File) => void;
};
const CollectionContext = createContext<CollectionContextType | null>(null);

export function CollectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collections, setCollections] = useLocalStorage<Collection[]>(
    "collections",
    [],
  );

  const addCollection = (name: string) => {
    const newCollection: Collection = {
      id: crypto.randomUUID(),
      name,
      requests: [],
    };
    setCollections([...collections, newCollection]);
  };

  const deleteCollection = (id: string) => {
    setCollections(collections.filter((collection) => collection.id !== id));
  };

  const saveRequest = (collectionId: string, request: SavedRequest) => {
    setCollections(
      collections.map((collection) =>
        collection.id === collectionId
          ? { ...collection, requests: [...collection.requests, request] }
          : collection,
      ),
    );
  };

  const deleteRequest = (collectionId: string, requestId: string) => {
    setCollections(
      collections.map((collection) =>
        collection.id === collectionId
          ? {
              ...collection,
              requests: collection.requests.filter(
                (request) => request.id !== requestId,
              ),
            }
          : collection,
      ),
    );
  };

  const exportCollection = (id: string) => {
    const collection = collections.find((c) => c.id === id);
    const blob = new Blob([JSON.stringify(collection)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${collection?.name}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importCollection = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const collection = JSON.parse(e.target?.result as string);
      setCollections([
        ...collections,
        { ...collection, id: crypto.randomUUID() },
      ]);
    };
    reader.readAsText(file);
  };

  return (
    <CollectionContext.Provider
      value={{
        collections,
        addCollection,
        deleteCollection,
        saveRequest,
        deleteRequest,
        exportCollection,
        importCollection,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollection() {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error("useTab must be used within a CollectionProvider");
  }
  return context;
}
