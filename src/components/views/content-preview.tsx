import { useEffect, useState } from "react";
import ContentPreviewPanel from "@/components/module/content-preview.tsx";
import useContentStore from "@/store/content-store.ts";
import { get_content_title } from "@/utils/text-util.ts";
import { codeToHtml } from "shiki";

function isCode(content: string) {
  return (
    content.trim().startsWith("```") ||
    /^[\s\S]*[{};=<>()[\]]+[\s\S]*$/.test(content)
  );
}

const ContentPreview = () => {
  const { content } = useContentStore();
  const [highlighted, setHighlighted] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function highlight() {
      if (isCode(content)) {
        let code = content.trim();
        let lang = "typescript";
        if (code.startsWith("```")) {
          const match = code.match(/^```(\w+)?\n/);
          if (match) {
            lang = match[1] || "typescript";
            code = code.replace(/^```(\w+)?\n/, "").replace(/```$/, "");
          }
        }
        const html = await codeToHtml(code, { lang, theme: "github-dark" });
        if (!cancelled) setHighlighted(html);
      } else {
        setHighlighted(null);
      }
    }
    highlight();
    return () => {
      cancelled = true;
    };
  }, [content]);

  return (
    <ContentPreviewPanel title={get_content_title(content, 7)} type="text">
      {highlighted ? (
        <div
          className="shiki text-white/90"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      ) : (
        <div className={"text-white/90 "}>{content}</div>
      )}
    </ContentPreviewPanel>
  );
};

export default ContentPreview;
