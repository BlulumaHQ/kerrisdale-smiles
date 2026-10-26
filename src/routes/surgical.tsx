import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/pages/ServicePage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/surgical")({
  head: () => pageHead("surgical", "en"),
  staticData: { sitemap: true },
  component: () => <ServicePage lang="en" service="surgical" />,
});
