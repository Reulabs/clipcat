import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import DashboardLayout from "./layouts/dashboard-layout";
import ContentPanel from "@/components/module/content-panel.tsx";
import { get_content_title } from "@/utils/text-util.ts";
import { useSearch } from "@/hooks/use-search.tsx";
import { getDateLabel } from "@/utils/misc";

type ClipboardItem = {
  content: string;
  timestamp: string;
  app: string;
};

function App() {
  const [items, setItems] = useState<ClipboardItem[]>([]);
  const { search, keywords } = useSearch();

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await invoke<ClipboardItem[]>("get_clipboard_history");
      setItems(res);
    };
    fetchHistory();
    const interval = setInterval(fetchHistory, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredItems = items.filter((item) => {
    const content = item.content.toLowerCase();
    const app = item.app.toLowerCase();

    if (search.trim() && !content.includes(search.toLowerCase())) {
      return false;
    }

    if (keywords.length > 0) {
      return keywords.some((keyword) => {
        const lowerKeyword = keyword.toLowerCase();

        if (lowerKeyword === "filter by type") {
          return true;
        }

        if (lowerKeyword === "sort a–z") {
          return true;
        }

        if (lowerKeyword === "sort z–a") {
          return true;
        }

        return content.includes(lowerKeyword) || app.includes(lowerKeyword);
      });
    }

    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    const hasSortAZ = keywords.some((k) => k.toLowerCase() === "sort a–z");
    const hasSortZA = keywords.some((k) => k.toLowerCase() === "sort z–a");

    if (hasSortAZ) {
      return a.content.localeCompare(b.content);
    }

    if (hasSortZA) {
      return b.content.localeCompare(a.content);
    }

    return 0;
  });

  
  const groupedItems = sortedItems.reduce((groups, item) => {
    const label = getDateLabel(item.timestamp);
    if (!groups[label]) groups[label] = [];
    groups[label].push(item);
    return groups;
  }, {} as Record<string, ClipboardItem[]>);


  const groupOrder = Object.keys(groupedItems).sort((a, b) => {
    if (a === "Today") return -1;
    if (b === "Today") return 1;
    if (a === "Yesterday") return -1;
    if (b === "Yesterday") return 1;

    return new Date(b).getTime() - new Date(a).getTime();
  });

  return (
    <DashboardLayout>
      <div className={"gap-2 flex flex-col"}>
        {groupOrder.map((label) => (
          <React.Fragment key={label}>
            <div className="text-white/70 font-semibold mt-4 mb-2">{label}</div>
            {groupedItems[label].map((item, idx) => (
              <ContentPanel
                key={item.timestamp + idx}
                title={get_content_title(item.content)}
                content={item.content}
                type={"file"}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default App;
