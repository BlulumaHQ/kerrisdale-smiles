import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/pages/HomePage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageHead("home", "en"),
  component: () => <HomePage lang="en" />,
});
