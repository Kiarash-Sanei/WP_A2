"use client";

import { useCollection } from "@/contexts/CollectionContext";
import { useHistory } from "@/contexts/HistoryContext";
import { useTab } from "@/contexts/TabContext";
import { useHasMounted } from "@/hooks/useHasMounted";
import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  TextField,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import {
  Delete,
  Download,
  Add,
  FolderOpen,
  History,
} from "@mui/icons-material";
import { SavedRequest } from "@/types/tabs";

export function SideBar() {
  const {
    collections,
    addCollection,
    deleteCollection,
    deleteRequest,
    exportCollection,
    importCollection,
  } = useCollection();
  const { history, clearHistory, deleteFromHistory } = useHistory();
  const { updateTab, activeTabId } = useTab();
  const [newName, setNewName] = useState("");
  const mounted = useHasMounted();

  if (!mounted) return null;

  const loadRequest = (request: SavedRequest) => {
    updateTab(activeTabId, {
      url: request.url,
      method: request.method,
      params: request.params,
      headers: request.headers,
      body: request.body,
    });
  };

  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
        overflow: "auto",
        bgcolor: "background.paper",
        borderRight: 1,
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        p: 1,
      }}
    >
      <Stack direction="row" sx={{ mb: 1, alignItems: "center" }}>
        <FolderOpen fontSize="small" sx={{ mr: 1 }} />
        <Typography variant="subtitle2" sx={{ flex: 1, fontWeight: "bold" }}>
          Collections
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ mb: 1, alignItems: "center" }}>
        <TextField
          size="small"
          fullWidth
          placeholder="Collection name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <IconButton
          size="small"
          onClick={() => {
            addCollection(newName);
            setNewName("");
          }}
        >
          <Add fontSize="small" />
        </IconButton>
      </Stack>

      {collections.map((collection) => (
        <Box key={collection.id} sx={{ mb: 1 }}>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Typography
              variant="body2"
              sx={{ flex: 1, fontWeight: "bold" }}
              noWrap
            >
              {collection.name}
            </Typography>
            <IconButton
              size="small"
              onClick={() => exportCollection(collection.id)}
            >
              <Download fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => deleteCollection(collection.id)}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Stack>

          {collection.requests.map((request) => (
            <Stack
              key={request.id}
              direction="row"
              onClick={() => loadRequest(request)}
              sx={{
                pl: 2,
                cursor: "pointer",
                borderRadius: 1,
                "&:hover": { bgcolor: "action.hover" },
                alignItems: "center",
              }}
            >
              <Chip
                label={request.method}
                size="small"
                sx={{ mr: 1, fontSize: 10 }}
              />
              <Typography
                variant="caption"
                sx={{ flex: 1, fontWeight: "bold" }}
                noWrap
              >
                {request.name}
              </Typography>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteRequest(collection.id, request.id);
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Stack>
          ))}
        </Box>
      ))}

      <Divider sx={{ my: 1 }} />

      <Stack direction="row" sx={{ mb: 1, alignItems: "center" }}>
        <History fontSize="small" sx={{ mr: 1 }} />
        <Typography variant="subtitle2" sx={{ flex: 1, fontWeight: "bold" }}>
          History
        </Typography>
        <Button size="small" onClick={clearHistory}>
          Clear
        </Button>
      </Stack>

      {history.map((request) => (
        <Stack
          key={request.id}
          direction="row"
          onClick={() => loadRequest(request)}
          sx={{
            cursor: "pointer",
            borderRadius: 1,
            "&:hover": { bgcolor: "action.hover" },
            alignItems: "center",
          }}
        >
          <Chip
            label={request.method}
            size="small"
            sx={{ mr: 1, fontSize: 10 }}
          />
          <Typography
            variant="caption"
            sx={{ flex: 1, fontWeight: "bold" }}
            noWrap
          >
            {request.name}
          </Typography>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              deleteFromHistory(request.id);
            }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Stack>
      ))}

      <Box sx={{ mt: "auto", pt: 1 }}>
        <Button
          fullWidth
          variant="outlined"
          size="small"
          component="label"
          startIcon={<FolderOpen />}
        >
          Import Collection
          <input
            type="file"
            accept=".json"
            hidden
            onChange={(e) =>
              e.target.files?.[0] && importCollection(e.target.files[0])
            }
          />
        </Button>
      </Box>
    </Box>
  );
}
