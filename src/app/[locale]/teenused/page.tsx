import { redirect } from "@/i18n/navigation";

/**
 * /teenused was the old single services page. The site now splits services
 * into two paths (/turundus + /peod), so this URL redirects to home where
 * the visitor picks the path that matches their job.
 *
 * Old links from email footers, social posts, and SEO indexes still resolve.
 */
export default async function TeenusedPage({
  params,
}: {
  params: Promise<{ locale: "et" | "en" }>;
}) {
  const { locale } = await params;
  redirect({ href: "/", locale });
}
