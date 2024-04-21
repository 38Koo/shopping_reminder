import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  ignoredRoutes: ["/"],
  afterAuth(auth, req, _) {
    const signInPath = new URL("/", req.url);

    if (!auth.sessionId && !auth.userId) {
      return NextResponse.redirect(signInPath);
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
