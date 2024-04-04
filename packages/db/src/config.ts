import type { Config } from "drizzle-kit";
import { env } from "../env";

export default {
  schema: "./src/schema",
  driver: "pg",
  dbCredentials: { connectionString: env.DATABASE_URL },
  tablesFilter: ["bookconer_*"],
} satisfies Config;
