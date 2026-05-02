/**
 * EN URL alias: /en/marketing → renders the same content as /turundus.
 *
 * Both URLs are legal in both locales (i.e. /turundus works in EN too,
 * /marketing works in ET) — but the canonical link from the home page
 * and top nav is the locale-appropriate one.
 */
import TurundusPage from "../turundus/page";

export default TurundusPage;
