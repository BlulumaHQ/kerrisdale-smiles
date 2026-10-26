import { createFileRoute } from "@tanstack/react-router";
import { CdcpPage } from "@/components/pages/InfoPages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/zh-hant/canada-dental-care-plan-ch")({
  head: () => pageHead("cdcp", "zh"),
  staticData: { sitemap: true },
  component: () => <CdcpPage lang="zh" />,
});
