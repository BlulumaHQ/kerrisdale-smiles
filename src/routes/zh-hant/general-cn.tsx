import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/pages/ServicePage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/zh-hant/general-cn")({
  head: () => pageHead("general", "zh"),
  staticData: { sitemap: true },
  component: () => <ServicePage lang="zh" service="general" />,
});
