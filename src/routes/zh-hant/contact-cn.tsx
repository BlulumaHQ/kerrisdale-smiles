import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/pages/InfoPages";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/zh-hant/contact-cn")({
  head: () => pageHead("contact", "zh"),
  staticData: { sitemap: true },
  component: () => <ContactPage lang="zh" />,
});
