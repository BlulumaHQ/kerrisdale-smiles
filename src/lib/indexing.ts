const PLATFORM_HOST_SUFFIXES = ["lovable.app", "workers.dev", "pages.dev", "netlify.app"] as const;

/** True only for the platform hosts that must stay out of search indexes. */
export function isPlatformHostname(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return PLATFORM_HOST_SUFFIXES.some((suffix) => host === suffix || host.endsWith(`.${suffix}`));
}

/**
 * Adds noindex to HTML served on platform hosts only. Custom-domain responses,
 * non-HTML assets, status codes and response bodies are left untouched.
 */
export function applyPlatformNoindex(request: Request, response: Response): Response {
  if (!response.headers.get("content-type")?.toLowerCase().includes("text/html")) return response;
  if (!isPlatformHostname(new URL(request.url).hostname)) return response;

  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", "noindex");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
