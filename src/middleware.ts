import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip Next internals, API routes, static files, and the standalone /ru
  // Russian landing page (lives outside the next-intl ET/EN routing).
  matcher: ["/((?!api|_next|_vercel|ru|.*\\..*).*)"],
};
