import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/pages/HomePage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/zh-hant/")({
  head: () => pageHead("home", "zh"),
  component: () => <HomePage lang="zh" />,
});
