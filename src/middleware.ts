import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  // Get hostname (e.g., 'vercel.app', 'site.vercel.app')
  const hostname = req.headers.get("host");

  let blogDomain;
  if (process.env.NODE_ENV === "production") {
    // In production, use the custom base domain from environment variables
    const originaDomain = process.env.NEXT_ORIGIN_DOMAIN;
    blogDomain = hostname?.replace(`.${originaDomain}`, "");
  } else {
    // Ensure we extract subdomains properly in development mode
    blogDomain = hostname?.replace(`.localhost:3000`, "");
  }

  // If no subdomain, continue normally
  if (!blogDomain || blogDomain === "localhost:3000") {
    return NextResponse.next();
  }

  console.log(blogDomain);

  // Redirect the user to /app/[blogDomain]
  return NextResponse.rewrite(new URL(`/${blogDomain}${pathname}`, req.url));
}
