import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ArchiveDocument, ArchiveDocumentTypeValues } from "./lib/enums";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const pathParts = path.split("/");
  const paramPath = pathParts[pathParts.length - 1];
  if (
    pathParts.length === 3 &&
    Object.values(ArchiveDocument).includes(
      paramPath as ArchiveDocumentTypeValues,
    )
  ) {
    return NextResponse.redirect(
      new URL(`/experiences/${paramPath}/all`, request.url),
    );
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/experiences/:path*",
};
