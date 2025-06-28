import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import DashboardLayout from "./layouts/dashboard-layout";
import ContentPanel from "@/components/module/content-panel.tsx";

type ClipboardItem = {
  content: string;
  timestamp: string;
  app: string;
};

function App() {
  const [items, setItems] = useState<ClipboardItem[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await invoke<ClipboardItem[]>("get_clipboard_history");
      setItems(res);
    };
    fetchHistory();
    const interval = setInterval(fetchHistory, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <div className={"gap-2 flex flex-col"}>
        {items.map(({ timestamp, content }: ClipboardItem, idx: number) => {
          return (
            <ContentPanel
              key={idx}
              title={"User testing interpretation"}
              content={content}
              type={"file"}
            />
          );
        })}
      </div>
    </DashboardLayout>
  );
}

export default App;
