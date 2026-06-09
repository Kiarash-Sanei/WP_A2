"use client";

import { KeyValue } from "@/types/tabs";
import {
  Box,
  Checkbox,
  TextField,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";

type KeyValueEditorProps = {
  items: KeyValue[];
  onChange: (items: KeyValue[]) => void;
};

export function KeyValueEditor({ items, onChange }: KeyValueEditorProps) {
  const addRow = () => {
    onChange([
      ...items,
      {
        id: crypto.randomUUID(),
        key: "",
        value: "",
        enabled: false,
      },
    ]);
  };

  const removeRow = (id: string) => {
    onChange(items.filter((item) => item.id !== id));
  };

  const updateRow = (
    id: string,
    field: keyof KeyValue,
    value: string | boolean,
  ) => {
    onChange(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  return (
    <Box sx={{ p: 1 }}>
      {items.map((item) => (
        <Stack
          key={item.id}
          direction="row"
          spacing={1}
          sx={{ mb: 1, alignItems: "center" }}
        >
          <Checkbox
            checked={item.enabled}
            onChange={(e) => updateRow(item.id, "enabled", e.target.checked)}
            size="small"
          />
          <TextField
            size="small"
            placeholder="Key"
            value={item.key}
            onChange={(e) => updateRow(item.id, "key", e.target.value)}
          />
          <TextField
            size="small"
            placeholder="Value"
            value={item.value}
            onChange={(e) => updateRow(item.id, "value", e.target.value)}
          />
          <IconButton size="small" onClick={() => removeRow(item.id)}>
            <Delete fontSize="small" />
          </IconButton>
        </Stack>
      ))}
      <Button startIcon={<Add />} size="small" onClick={addRow}>
        Add Row
      </Button>
    </Box>
  );
}
