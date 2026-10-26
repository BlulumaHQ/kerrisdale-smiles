import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/pages/ServicePage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/zh-hant/cosmetic-cn")({
  head: () => pageHead("cosmetic", "zh"),
  component: () => <ServicePage lang="zh" service="cosmetic" />,
});
