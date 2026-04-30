import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

/**
 * Filesystem-backed case study index. Reads MDX files from
 * `src/content/work/<slug>.mdx`, parses frontmatter, sorts by `order`.
 *
 * Frontmatter contract:
 *   slug:        string (matches filename)
 *   client:      string
 *   event:       string
 *   year:        string
 *   service:     string
 *   coverImage:  string (path under /public)
 *   order:       number (smaller = appears first)
 *   locale:      "et" | "en"
 *   featured:    boolean (true = appears in home featured section)
 *   metrics:     Array<{ label, value }>  (optional)
 *   awards:      string[]                  (optional)
 */

export type WorkMetric = { label: string; value: string };

export type WorkMeta = {
  slug: string;
  client: string;
  event: string;
  year: string;
  service: string;
  coverImage: string;
  order: number;
  locale: "et" | "en";
  featured: boolean;
  metrics: WorkMetric[];
  awards: string[];
};

export type Work = WorkMeta & {
  body: string; // raw MDX
};

const WORK_DIR = path.join(process.cwd(), "src", "content", "work");

async function readWorkFile(filename: string): Promise<Work | null> {
  if (!filename.endsWith(".mdx")) return null;
  const slug = filename.replace(/\.mdx$/, "");
  const fullPath = path.join(WORK_DIR, filename);
  try {
    const raw = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(raw);
    return {
      slug: String(data.slug ?? slug),
      client: String(data.client ?? ""),
      event: String(data.event ?? ""),
      year: String(data.year ?? ""),
      service: String(data.service ?? ""),
      coverImage: String(data.coverImage ?? ""),
      order: Number(data.order ?? 999),
      locale: (data.locale as "et" | "en") ?? "et",
      featured: Boolean(data.featured ?? false),
      metrics: Array.isArray(data.metrics) ? (data.metrics as WorkMetric[]) : [],
      awards: Array.isArray(data.awards) ? (data.awards as string[]) : [],
      body: content,
    };
  } catch {
    return null;
  }
}

export async function getAllWork(): Promise<WorkMeta[]> {
  let files: string[];
  try {
    files = await fs.readdir(WORK_DIR);
  } catch {
    return [];
  }

  const all = (await Promise.all(files.map(readWorkFile)))
    .filter((w): w is Work => w !== null)
    .sort((a, b) => a.order - b.order);

  return all.map(({ body, ...meta }) => meta);
}

export async function getFeaturedWork(): Promise<WorkMeta[]> {
  return (await getAllWork()).filter((w) => w.featured);
}

export async function getWork(slug: string): Promise<Work | null> {
  return readWorkFile(`${slug}.mdx`);
}

export async function getAllWorkSlugs(): Promise<string[]> {
  let files: string[];
  try {
    files = await fs.readdir(WORK_DIR);
  } catch {
    return [];
  }
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/**
 * Returns the next case study in display order (by `order` field), wrapping
 * back to the first one after the last.
 */
export async function getNextWork(slug: string): Promise<WorkMeta | null> {
  const all = await getAllWork();
  if (all.length === 0) return null;
  const idx = all.findIndex((w) => w.slug === slug);
  if (idx === -1) return all[0] ?? null;
  return all[(idx + 1) % all.length] ?? null;
}
