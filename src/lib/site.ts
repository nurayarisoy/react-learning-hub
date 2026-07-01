const fallbackSiteUrl = "https://react-learning-hub.dev";

function normalizeSiteUrl(value: string): string {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;

  if (!configured) {
    return fallbackSiteUrl;
  }

  try {
    const url = new URL(configured);
    return normalizeSiteUrl(url.toString());
  } catch {
    return fallbackSiteUrl;
  }
}

export const siteUrl = resolveSiteUrl();
