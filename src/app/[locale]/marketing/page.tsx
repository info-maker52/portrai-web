/**
 * EN URL alias: /en/marketing → renders the same content as /turundus.
 * Same pattern as /events → /peod. Both URLs are crawlable in both
 * locales but the canonical link from the home page and top nav is the
 * locale-appropriate one (/turundus in ET, /marketing in EN).
 */
import TurundusPage from "../turundus/page";

export default TurundusPage;

export { generateMetadata } from "../turundus/page";
