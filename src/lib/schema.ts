import { z } from "zod";

// https://github.com/colinhacks/zod/issues/2985#issuecomment-1905652037
const zodStringBool = z
  .string()
  .toLowerCase()
  .transform(x => x === "true")
  .pipe(z.boolean());

export const PlainConfigSchema = z.object({
  url: z.string().url(),
  width: z.coerce.number().nullish(),
  height: z.coerce.number().nullish(),
  viewPortWidth: z.coerce.number().nullish(),
  viewPortHeight: z.coerce.number().nullish(),
  forceReload: zodStringBool.nullish(),
  isMobile: zodStringBool.nullish(),
  isFullPage: zodStringBool.nullish(),
  isDarkMode: zodStringBool.nullish(),
  deviceScaleFactor: z.coerce.number().nullish(),
});
export type PlainConfigSchema = z.infer<typeof PlainConfigSchema>;
export const HashSchema = z.string().startsWith("str-enc:");

export type IConfigAPI = Omit<PlainConfigSchema, "url">;
