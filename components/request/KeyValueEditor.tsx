"use client"

import { KeyValue } from "@/types/tabs";

type KeyValueEditorProps = {
  items: KeyValue[];
  onChange: (items: KeyValue[]) => void;
}

export function KeyValueEditor({ items, onChange } : KeyValueEditorProps) {
    const addRow = () => {
        onChange([...items, {
            id: crypto.randomUUID(),
            key: "",
            value: "",
            enabled: false,
        }]);
    };

    const removeRow = (id: string) => {
        onChange(items.filter((item) => item.id !== id));
    };

    const updateRow = (id: string, field: keyof KeyValue, value: string | boolean) => {
        onChange(items.map((item) =>
            item.id === id ? { ...item, [field]: value } : item));
    };

    return (
        <div>
            {items.map(item => (
            <div key={item.id}>
                <input type="checkbox" checked={item.enabled} 
                    onChange={(e) => updateRow(item.id, "enabled", e.target.checked)} />
                <input value={item.key} 
                    onChange={(e) => updateRow(item.id, "key", e.target.value)} />
                <input value={item.value} 
                    onChange={(e) => updateRow(item.id, "value", e.target.value)} />
                <button onClick={() => removeRow(item.id)}>×</button>
            </div>
            ))}
            <button onClick={addRow}>+ Add Row</button>
        </div>
    );
};