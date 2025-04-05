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
    const originaDomain = process.env.NEXT_PUBLIC_ORIGIN_DOMAIN;
    blogDomain = hostname?.replace(`.${originaDomain}`, "");
  } else {
    // Ensure we extract subdomains properly in development mode
    blogDomain = hostname?.replace(`.localhost:3000`, "");
  }

  // LOGS
  console.log("Hostname:", hostname);
  console.log("Blog Domain:", blogDomain);

  // If no subdomain, continue normally
  if (!blogDomain || blogDomain === process.env.NEXT_PUBLIC_ORIGIN_DOMAIN) {
    return NextResponse.next();
  }

  const newUrl = `/${blogDomain}${pathname}`;
  // Redirect the user to /[blogDomain]
  return NextResponse.rewrite(new URL(newUrl, req.url));
}
