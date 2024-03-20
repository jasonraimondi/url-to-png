export function formatAllowList(allowList: string): string[] {
  return allowList.split(",").map(url => {
    url = url.trim().replace(/https?:\/\//g, "");
    return new URL(`http://${url}`).host;
  });
}

export function configToString(configAPI: URLSearchParams) {
  let result = "";
  for (const [key, value] of configAPI) {
    if (key === "url") continue;
    result += `_${key}-${value}`;
  }
  return result;
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
