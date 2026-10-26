import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/pages/ServicePage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/cosmetic")({
  head: () => pageHead("cosmetic", "en"),
  component: () => <ServicePage lang="en" service="cosmetic" />,
});
