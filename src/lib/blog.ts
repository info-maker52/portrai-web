import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

/**
 * Filesystem-backed blog index. Reads MDX files from
 * `src/content/blog/<slug>.mdx`, parses frontmatter, sorts by date desc.
 *
 * Frontmatter contract:
 *   title:       string
 *   date:        ISO-8601 (YYYY-MM-DD)
 *   excerpt:     string
 *   coverImage:  string (path under /public)
 *   locale:      "et" | "en"
 *   author:      string
 */

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  locale: "et" | "en";
  author: string;
};

export type BlogPost = BlogPostMeta & {
  body: string; // raw MDX
};

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

async function readPostFile(filename: string): Promise<BlogPost | null> {
  if (!filename.endsWith(".mdx")) return null;
  const slug = filename.replace(/\.mdx$/, "");
  const fullPath = path.join(BLOG_DIR, filename);
  try {
    const raw = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? ""),
      excerpt: String(data.excerpt ?? ""),
      coverImage: String(data.coverImage ?? ""),
      locale: (data.locale as "et" | "en") ?? "et",
      author: String(data.author ?? "PortrAI"),
      body: content,
    };
  } catch {
    return null;
  }
}

export async function getAllBlogPosts(
  locale?: "et" | "en",
): Promise<BlogPostMeta[]> {
  let files: string[];
  try {
    files = await fs.readdir(BLOG_DIR);
  } catch {
    return [];
  }

  const posts = (await Promise.all(files.map(readPostFile)))
    .filter((p): p is BlogPost => p !== null)
    .filter((p) => (locale ? p.locale === locale : true))
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return posts.map(({ body, ...meta }) => meta);
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return readPostFile(`${slug}.mdx`);
}

export async function getAllBlogSlugs(): Promise<string[]> {
  let files: string[];
  try {
    files = await fs.readdir(BLOG_DIR);
  } catch {
    return [];
  }
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
