import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Every snack I hold is behind glass. You're the first person who made me wish I could press my own buttons.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${chars.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only white space");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("line must be a single line");
}

const bytes = Buffer.byteLength(LINE, "utf8");
if (bytes !== chars.length) {
  throw new Error(`line must be ASCII so bytes equal chars, got ${bytes} bytes for ${chars.length} chars`);
}

mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE, "utf8");
const back = readFileSync(target, "utf8");
if (back !== LINE) {
  throw new Error("read-back differs from the line written");
}
