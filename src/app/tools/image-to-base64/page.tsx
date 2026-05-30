import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import ImageToBase64 from "@/components/tools/image-to-base64/ImageToBase64";
import { getTool } from "@/data/tools";

const tool = getTool("image-to-base64")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function ImageToBase64Page() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <ImageToBase64 />
    </ToolPageShell>
  );
}
