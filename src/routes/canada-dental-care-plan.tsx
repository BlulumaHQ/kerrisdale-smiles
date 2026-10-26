import { createFileRoute } from "@tanstack/react-router";
import { CdcpPage } from "@/components/pages/InfoPages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/canada-dental-care-plan")({
  head: () => pageHead("cdcp", "en"),
  staticData: { sitemap: true },
  component: () => <CdcpPage lang="en" />,
});
