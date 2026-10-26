import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/pages/InfoPages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/zh-hant/about-cn")({
  head: () => pageHead("about", "zh"),
  component: () => <AboutPage lang="zh" />,
});
