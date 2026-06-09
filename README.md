# 📮 Postman Clone

> A fully client-side HTTP client built as a Postman alternative, developed for the Web Programming course at Sharif University of Technology.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![MUI](https://img.shields.io/badge/MUI-6-007FFF?logo=mui)](https://mui.com/)

---

## ✨ Features

| Feature                  | Description                                                                    |
| ------------------------ | ------------------------------------------------------------------------------ |
| 🗂️ **Multi-tab**         | Manage multiple requests simultaneously, rename tabs with double-click         |
| 🌐 **HTTP Methods**      | Full support for GET, POST, PUT, PATCH, DELETE                                 |
| ✅ **URL Validation**    | Validates `http://` and `https://` before sending                              |
| 🔧 **Params & Headers**  | Add, edit, and toggle key-value pairs for params and headers                   |
| 📝 **Body Editor**       | Raw and JSON body support with multiline editor                                |
| 📊 **Response Viewer**   | Color-coded status codes with pretty-printed JSON                              |
| ⚠️ **Error Handling**    | Network errors and invalid input feedback via alerts                           |
| 🗑️ **Clear Fields**      | Reset all tab fields instantly                                                 |
| 📁 **Collections**       | Save requests to named collections, export/import as JSON, duplicate detection |
| 🕐 **Request History**   | Auto-saved history, click to open in new tab                                   |
| 🌙 **Dark Mode**         | Toggle between light and dark themes, persisted across sessions                |
| 📱 **Responsive Design** | Mobile-friendly with collapsible sidebar drawer                                |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [Material UI (MUI)](https://mui.com/)
- **State Management**: React Context API
- **Persistence**: `localStorage` via custom `useLocalStorage` hook

---

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with Providers and metadata
│   └── page.tsx            # Main page with sidebar + main panel
├── components/
│   ├── layout/
│   │   ├── MainPanel.tsx   # Main content area
│   │   ├── Providers.tsx   # All context providers
│   │   ├── Sidebar.tsx     # Collections, history, import/export
│   │   ├── TabBar.tsx      # Tab management with rename support
│   │   └── TopBar.tsx      # App bar with theme toggle
│   ├── request/
│   │   ├── KeyValueEditor.tsx   # Reusable key-value pair editor
│   │   ├── RequestTabs.tsx      # Params / Headers / Body switcher
│   │   ├── ResponseViewer.tsx   # Status code + formatted response
│   │   └── UrlBar.tsx           # Method, URL, Send, Clear, Save
│   └── ui/
│       └── LoadingSpinner.tsx   # Animated loading indicator
├── constants/
│   └── methods.ts          # HTTP method list
├── contexts/
│   ├── CollectionContext.tsx    # Collections CRUD + import/export
│   ├── HistoryContext.tsx       # Request history management
│   ├── TabContext.tsx           # Tab state and operations
│   └── ThemeContext.tsx         # Dark/light mode toggle
├── hooks/
│   ├── useHasMounted.ts    # SSR-safe hydration hook
│   └── useLocalStorage.ts  # Generic localStorage state hook
└── types/
    └── tabs.ts             # Shared TypeScript types
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/Kiarash-Sanei/WP_A2.git
cd WP_A2
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## 📖 Usage Guide

### Sending a Request

1. Enter a URL starting with `http://` or `https://`
2. Select an HTTP method from the dropdown
3. Optionally add params, headers, or a request body
4. Click **Send** and view the response below

### Managing Collections

1. Enter a collection name in the sidebar and click **+**
2. Build and send a request, then click **Save** to add it to a collection
3. Click a saved request to load it into the active tab
4. Click **↓** to export a collection as JSON
5. Click **Import Collection** to restore from a JSON file

### Request History

- Every sent request is automatically saved to history
- Click any history item to open it in a new tab

### Renaming Tabs

- Double-click any tab name to rename it inline

---

## 🌿 Branch Strategy

| Branch                    | Feature                                 |
| ------------------------- | --------------------------------------- |
| `feature/ui-layout`       | App shell, dark mode, loading spinner   |
| `feature/multi-tab`       | Tab management with localStorage        |
| `feature/method-url`      | Method selector, URL bar, HTTP requests |
| `feature/params-headers`  | Key-value editor for params and headers |
| `feature/response-viewer` | Status code display and response body   |
| `feature/clear-fields`    | Reset all tab fields                    |
| `feature/collections-io`  | Collections with import/export          |
| `feature/history`         | Request history with localStorage       |
| `feat/improve-ui`         | MUI redesign for all components         |
| `feat/responsive-design`  | Mobile-friendly layout with Drawer      |

---

## 📋 Assignment Info

|                |                                 |
| -------------- | ------------------------------- |
| **Course**     | Web Programming                 |
| **University** | Sharif University of Technology |
| **Faculty**    | Computer Engineering            |
| **Semester**   | Spring 1405                     |
| **Instructor** | Ali Abrishami                   |
| **Assignment** | Homework 2 — Postman Clone      |
