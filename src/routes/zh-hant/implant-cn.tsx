import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/pages/ServicePage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/zh-hant/implant-cn")({
  head: () => pageHead("implant", "zh"),
  component: () => <ServicePage lang="zh" service="implant" />,
});
