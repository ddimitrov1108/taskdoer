export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/todo/:path*",
    "/api/projects/:path*",
    "/api/labels/:path*",
    "/api/tasks/:path*",
  ],
};
