# Postman Clone — Web Programming Assignment 2

A fully client-side Postman-like HTTP client built with Next.js, TypeScript, and Material UI.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Library**: Material UI (MUI)
- **State Management**: React Context + useReducer
- **Persistence**: localStorage via custom `useLocalStorage` hook

## Features

- **Multi-tab support** — manage multiple requests simultaneously
- **HTTP Methods** — GET, POST, PUT, PATCH, DELETE
- **URL Validation** — validates http:// and https:// before sending
- **Query Params Editor** — add, edit, delete key-value pairs
- **Headers Editor** — manage request headers as key-value pairs
- **Body Editor** — raw and JSON body support
- **Response Viewer** — displays status code with color coding and formatted JSON
- **Error Handling** — network errors and invalid input feedback
- **Clear Fields** — reset all tab fields at once
- **Collections** — save, organize, export, and import requests as JSON
- **Request History** — auto-saved history of all sent requests
- **Dark Mode** — toggle between light and dark themes
- **Responsive Design** — mobile-friendly with collapsible sidebar drawer

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── layout/
│   │   ├── MainPanel.tsx
│   │   ├── Providers.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TabBar.tsx
│   │   └── TopBar.tsx
│   ├── request/
│   │   ├── KeyValueEditor.tsx
│   │   ├── RequestTabs.tsx
│   │   ├── ResponseViewer.tsx
│   │   └── UrlBar.tsx
│   └── ui/
│       └── LoadingSpinner.tsx
├── constants/
│   └── methods.ts
├── contexts/
│   ├── CollectionContext.tsx
│   ├── HistoryContext.tsx
│   ├── TabContext.tsx
│   └── ThemeContext.tsx
├── hooks/
│   ├── useHasMounted.ts
│   └── useLocalStorage.ts
└── types/
    └── tabs.ts
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone <repository-url>
cd postman-clone
npm install
```

### Running the App

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Branch Strategy

Each feature was developed in a separate branch:

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

## Usage

### Sending a Request

1. Enter a URL starting with `http://` or `https://`
2. Select an HTTP method from the dropdown
3. Optionally add params, headers, or a body
4. Click **Send**
5. View the response status and body below

### Managing Collections

1. Enter a collection name in the sidebar and click **+**
2. After sending a request, save it to a collection
3. Click **↓** to export a collection as JSON
4. Click **Import Collection** to import a JSON file

### Dark Mode

Click the moon/sun icon in the top right to toggle dark mode. Your preference is saved automatically.

## Assignment Info

- **Course**: Web Programming
- **University**: Sharif University of Technology
- **Semester**: Spring 2026
- **Instructor**: Ali Abrishami
