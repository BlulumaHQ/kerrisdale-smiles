import { createFileRoute } from "@tanstack/react-router";
import { FaqPage } from "@/components/pages/InfoPages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/zh-hant/faq-cn")({
  head: () => pageHead("faq", "zh"),
  component: () => <FaqPage lang="zh" />,
});
