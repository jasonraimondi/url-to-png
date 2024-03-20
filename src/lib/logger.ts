import { Logger, pino } from "pino";

let level: string = process.env.LOG_LEVEL ?? "info";

if (process.env.NODE_ENV === "test") {
  level = "warn";
}

export const logger: Logger = pino({ name: "url-to-png", level });
