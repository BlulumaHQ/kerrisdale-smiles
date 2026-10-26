import { createFileRoute } from "@tanstack/react-router";
import { FaqPage } from "@/components/pages/InfoPages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () => pageHead("faq", "en"),
  staticData: { sitemap: true },
  component: () => <FaqPage lang="en" />,
});
