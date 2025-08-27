import authConfig from "@/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

const authRoutes = ["/auth/login", "/auth/register"];
const publicRoutes = ["/" , "/about"]; // 

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;

  const isAuthRoute = authRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isApiAuthRouter = pathname.startsWith("/api/auth");

  if (isApiAuthRouter) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/dashboard", req.nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isAuthRoute && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", req.nextUrl));
  }

  return;
});

export const config = {
  matcher: [
     "/((?!auth|_next|api|favicon.ico|.*\\..*).*)",
  ],
};
