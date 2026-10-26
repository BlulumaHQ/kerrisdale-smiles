import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // Original WordPress URLs all end with "/" — keep links and canonicals identical.
    trailingSlash: "always",
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultHashScrollIntoView: { behavior: "smooth", block: "start" },
  });

  return router;
};
