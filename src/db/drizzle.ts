import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import * as authSchema from "./auth-schema";
import * as schema from "./schema";
import "./relations";

config({ path: ".env" }); // or .env.local

export const db = drizzle(process.env.DATABASE_URL!, {
  schema: {
    ...authSchema,
    ...schema,
  },
});
