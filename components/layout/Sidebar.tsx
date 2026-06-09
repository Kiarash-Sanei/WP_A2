"use client";

import { useCollection } from "@/contexts/CollectionContext";
import { useHistory } from "@/contexts/HistoryContext";
import { useTab } from "@/contexts/TabContext";
import { useState } from "react";

export function Sidebar() {
  const {
    collections,
    addCollection,
    deleteCollection,
    deleteRequest,
    exportCollection,
    importCollection,
  } = useCollection();
  const [newName, setNewName] = useState("");
  const { updateTab, activeTabId } = useTab();
  const { history, clearHistory, deleteFromHistory } = useHistory();

  return (
    <aside
      className="w-64 h-full dark:bg-gray-900 bg-gray-100 
                      hidden md:block"
    >
      <div>
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          placeholder="Collection name"
        />
        <button
          onClick={() => {
            addCollection(newName);
            setNewName("");
          }}
        >
          +
        </button>
      </div>
      {collections.map((collection) => (
        <div key={collection.id}>
          <p>{collection.name}</p>
          <button onClick={() => exportCollection(collection.id)}>↓</button>
          <button onClick={() => deleteCollection(collection.id)}>×</button>
          {collection.requests.map((request) => (
            <div
              key={request.id}
              onClick={() =>
                updateTab(activeTabId, {
                  url: request.url,
                  method: request.method,
                  params: request.params,
                  headers: request.headers,
                  body: request.body,
                })
              }
            >
              {request.method} {request.name}
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  deleteRequest(collection.id, request.id);
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      ))}
      <div>
        <p>History</p>
        <button onClick={clearHistory}>Clear All</button>
        {history.map((request) => (
          <div
            key={request.id}
            onClick={() =>
              updateTab(activeTabId, {
                url: request.url,
                method: request.method,
                params: request.params,
                headers: request.headers,
                body: request.body,
              })
            }
          >
            {request.method} {request.name}
            <button
              onClick={(event) => {
                event.stopPropagation();
                deleteFromHistory(request.id);
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <input
        type="file"
        accept=".json"
        onChange={(event) =>
          event.target.files?.[0] && importCollection(event.target.files[0])
        }
      />
    </aside>
  );
}
