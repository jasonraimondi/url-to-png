export function formatUrlList(allowList: string): string[] {
  return allowList.split(",").map(url => {
    url = url.trim().replace(/https?:\/\//g, "");
    return new URL(`http://${url}`).host;
  });
}

const NON_CACHE_PARAMS = new Set(["url", "hash", "forceReload"]);

export function configToString(configAPI: URLSearchParams) {
  const entries: [string, string][] = [];
  for (const [key, value] of configAPI) {
    if (NON_CACHE_PARAMS.has(key)) continue;
    entries.push([key, value]);
  }
  entries.sort(([a], [b]) => a.localeCompare(b));
  return entries.map(([key, value]) => `_${key}-${value}`).join("");
}

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function buildImageId(url: string, params: URLSearchParams, date: Date = new Date()): string {
  return `${isoDate(date)}.${slugify(url)}${slugify(configToString(params))}`;
}

export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

const POSITIVE_NUMBER_REGEX = /^\d+$/;

export const isValidNum = (value?: string) => value && POSITIVE_NUMBER_REGEX.test(value);
