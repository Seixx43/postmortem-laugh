// Entry for the make.fun bounty "The Postmortem That Made Us Laugh":
// reads ENTRY.md and writes it to $MAKEFUN_OUTPUT_DIR/entry.txt.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const entry = readFileSync(join(here, "ENTRY.md"), "utf8");
// The bounty wants one or two sentences of at most 400 characters. Fail
// loudly instead of writing an entry that breaks the limit.
const text = entry.trim();
const sentences = text.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
if (text.length > 400 || sentences.length < 1 || sentences.length > 2) {
  process.stderr.write("postmortem must be one or two sentences of at most 400 characters\n");
  process.exit(1);
}
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
process.stdout.write(entry);
