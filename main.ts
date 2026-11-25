// One Star, Written in Sap — a one-line 1-star review from a houseplant
// about the human who owns it. The program writes the review to
// <output dir>/entry.txt and checks the length gate itself.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "★☆☆☆☆ Six moves this month for “better light” and now I live by the Wi-Fi router, watered with leftover coffee, repotted into a pot with no drainage, and only spoken to on video calls when I am needed on camera. I don't want water or sun — I want my sunlight refunded, itemised.";

// Self gate: 1 to 279 characters of UTF-8 text, not only whitespace,
// exactly one line.
const length = [...ENTRY].length;
if (length < 1 || length > 279) {
  throw new Error(`entry is ${length} characters, must be 1-279`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}
// The brief forbids stock phrasing: none of these words may appear.
const banned = ["drama", "dramatic", "wilting", "ignored"];
for (const word of banned) {
  if (ENTRY.toLowerCase().includes(word)) {
    throw new Error(`entry must not contain ${word}`);
  }
}

// Output folder comes from the environment so the harness can point it
// anywhere; it falls back to the default /output folder.
const outDir = process.env.OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote ${length}-character entry to ${join(outDir, "entry.txt")}`);
