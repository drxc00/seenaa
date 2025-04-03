import { relations } from "drizzle-orm";
import { userBlogDomain, post } from "./schema";
import { user } from "./auth-schema";

// User relation
export const userRelations = relations(user, ({ many, one }) => ({
  posts: many(post),
  domain: one(userBlogDomain),
}));

// Define relations for userBlogDomain
export const userBlogDomainRelations = relations(userBlogDomain, ({ one }) => ({
  user: one(user, {
    fields: [userBlogDomain.userId],
    references: [user.id],
  }),
}));

export const postRelations = relations(post, ({ one }) => ({
  user: one(user, {
    fields: [post.userId],
    references: [user.id],
  }),
}));
