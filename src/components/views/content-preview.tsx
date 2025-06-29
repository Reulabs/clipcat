import ContentPreviewPanel from "@/components/module/content-preview.tsx";
import useContentStore from "@/store/content-store.ts";
import { get_content_title } from "@/utils/text-util.ts";

const ContentPreview = () => {
  const { content } = useContentStore();
  return (
    <ContentPreviewPanel title={get_content_title(content, 7)} type="text">
      <div className={"text-white/90 "}>{content}</div>
    </ContentPreviewPanel>
  );
};

export default ContentPreview;
