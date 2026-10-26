import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/pages/InfoPages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => pageHead("contact", "en"),
  component: () => <ContactPage lang="en" />,
});
