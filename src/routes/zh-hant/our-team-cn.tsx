import { createFileRoute } from "@tanstack/react-router";
import { TeamPage } from "@/components/pages/InfoPages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/zh-hant/our-team-cn")({
  head: () => pageHead("team", "zh"),
  component: () => <TeamPage lang="zh" />,
});
