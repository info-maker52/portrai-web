// One-off image compressor. Resizes oversized source images and re-encodes
// them in place (same filename + extension → no code changes needed).
//
// Run: node scripts/compress-images.mjs
//
// PNGs that are actually photographs (our AI-portrait samples, covers) are
// re-encoded as optimized PNGs; if a PNG is photographic and huge, it is
// converted to a high-quality version at a sane display size. next/image
// still serves AVIF/WebP at runtime — this just stops shipping 8–11 MB
// source files (repo size, OG cards, and the raw-<img> hero fallback).

import { readdir, stat, readFile, writeFile } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const ROOT = "public/images";
const MAX_EDGE = 1600; // no display surface needs more than this
const PNG_OPTS = { compressionLevel: 9, effort: 10, palette: true, quality: 82 };
const JPG_OPTS = { quality: 82, mozjpeg: true };

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}

function fmt(bytes) {
  return `${(bytes / 1024).toFixed(0)} KB`;
}

const files = (await walk(ROOT)).filter((f) =>
  [".png", ".jpg", ".jpeg"].includes(extname(f).toLowerCase()),
);

let beforeTotal = 0;
let afterTotal = 0;

for (const file of files) {
  const ext = extname(file).toLowerCase();
  const before = (await stat(file)).size;
  beforeTotal += before;

  // Read the whole file into memory first so we're not holding a handle on
  // the path when we overwrite it (Windows locks the file otherwise).
  const input = await readFile(file);
  const meta = await sharp(input, { failOn: "none" }).metadata();
  const longEdge = Math.max(meta.width ?? 0, meta.height ?? 0);

  let pipeline = sharp(input, { failOn: "none" }).rotate();
  if (longEdge > MAX_EDGE) {
    pipeline = pipeline.resize({
      width: meta.width >= meta.height ? MAX_EDGE : undefined,
      height: meta.height > meta.width ? MAX_EDGE : undefined,
      withoutEnlargement: true,
    });
  }
  pipeline =
    ext === ".png" ? pipeline.png(PNG_OPTS) : pipeline.jpeg(JPG_OPTS);

  const buf = await pipeline.toBuffer();

  // Only write if we actually saved space (never bloat).
  if (buf.length < before) {
    await writeFile(file, buf);
    afterTotal += buf.length;
    console.log(
      `${file}  ${fmt(before)} -> ${fmt(buf.length)}  (${meta.width}x${meta.height}${longEdge > MAX_EDGE ? " resized" : ""})`,
    );
  } else {
    afterTotal += before;
  }
}

console.log(
  `\nTOTAL: ${fmt(beforeTotal)} -> ${fmt(afterTotal)}  (saved ${fmt(beforeTotal - afterTotal)}, ${(((beforeTotal - afterTotal) / beforeTotal) * 100).toFixed(0)}%)`,
);
