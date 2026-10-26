import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/pages/InfoPages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => pageHead("about", "en"),
  staticData: { sitemap: true },
  component: () => <AboutPage lang="en" />,
});
