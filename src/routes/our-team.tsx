import { createFileRoute } from "@tanstack/react-router";
import { TeamPage } from "@/components/pages/InfoPages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/our-team")({
  head: () => pageHead("team", "en"),
  staticData: { sitemap: true },
  component: () => <TeamPage lang="en" />,
});
