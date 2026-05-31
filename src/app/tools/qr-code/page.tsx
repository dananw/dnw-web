import type { Metadata } from "next";
import ToolPageShell from "@/components/tools/ToolPageShell";
import QrCode from "@/components/tools/qr-code/QrCode";
import { getTool } from "@/data/tools";

const tool = getTool("qr-code")!;

export const metadata: Metadata = {
  title: `${tool.title} — Tools`,
  description: tool.description,
};

export default function QrCodePage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <QrCode />
    </ToolPageShell>
  );
}
