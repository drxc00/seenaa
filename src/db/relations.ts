import { relations } from "drizzle-orm";
import {  post } from "./schema";
import { user } from "./auth-schema";

export const postRelations = relations(post, ({ one }) => ({
  user: one(user, {
    fields: [post.userId],
    references: [user.id],
  }),
}));
