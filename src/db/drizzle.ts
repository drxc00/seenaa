import { drizzle } from "drizzle-orm/postgres-js";
import * as authSchema from "./auth-schema";
import * as schema from "./schema";
import "./relations";

export const db = drizzle(process.env.DATABASE_URL!, {
  schema: {
    ...authSchema,
    ...schema,
  },
});
