/**
 * Utils for working with posts
 */

export function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}
