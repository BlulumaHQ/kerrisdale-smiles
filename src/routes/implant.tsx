import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/pages/ServicePage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/implant")({
  head: () => pageHead("implant", "en"),
  component: () => <ServicePage lang="en" service="implant" />,
});
