import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const firstSegment = request.nextUrl.pathname.split("/")[1];
  const locale = firstSegment === "en" || firstSegment === "es" ? firstSegment : "fr";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-portfolio-locale", locale);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });
  response.headers.set("Content-Language", locale);
  return response;
}

export const config = {
  matcher: ["/", "/about", "/en", "/en/about", "/es", "/es/about"],
};
