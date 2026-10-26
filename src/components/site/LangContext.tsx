import { useRouterState } from "@tanstack/react-router";
import { resolvePath, type Lang, type PageKey } from "@/content/site";

/** Language and page are always derived from the URL — never from client state. */
export function useCurrentPage(): { lang: Lang; key: PageKey | null } {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const r = resolvePath(pathname);
  if (r) return r;
  return { lang: pathname.startsWith("/zh-hant") ? "zh" : "en", key: null };
}
