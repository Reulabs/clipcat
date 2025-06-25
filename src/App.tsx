import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import SearchModule from "./components/module/search";

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
    <div
      style={{
        background: "#181818",
        minHeight: "100vh",
        color: "#fff",
        padding: 32,
      }}
    >
      <h2 style={{ marginBottom: 24 }}>Clipboard History</h2>

      <SearchModule />

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: "#232323",
              borderRadius: 8,
              padding: 16,
              boxShadow: "0 2px 8px #0002",
            }}
          >
            <div
              style={{ fontSize: 16, marginBottom: 8, wordBreak: "break-all" }}
            >
              {item.content}
            </div>
            <div
              style={{
                fontSize: 12,
                opacity: 0.7,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{item.timestamp}</span>
              <span>{item.app}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
