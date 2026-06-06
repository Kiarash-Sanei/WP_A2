"use client";

import { UrlBar } from "../request/UrlBar";
import { RequestTabs } from "../request/RequestTabs";
import { ResponseViewer } from "../request/ResponseViewer";

export function MainPanel() {
  return (
    <main className="flex flex-col flex-1 p-4 gap-4">
      <UrlBar />
      <RequestTabs />
      <ResponseViewer />
    </main>
  );
}
