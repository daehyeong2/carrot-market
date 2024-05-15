import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("d");
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
