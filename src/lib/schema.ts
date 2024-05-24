import { z } from "zod";

// https://github.com/colinhacks/zod/issues/2985#issuecomment-1905652037
const zodStringBool = z
  .string()
  .toLowerCase()
  .transform(x => x === "true")
  .pipe(z.boolean());

const zodStringUrl = z
  .string()
  .transform(value => {
    try {
      return decodeURIComponent(value);
    } catch (error) {
      return value;
    }
  })
  .pipe(z.string().url());

export const PlainConfigSchema = z.object({
  url: zodStringUrl,
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
