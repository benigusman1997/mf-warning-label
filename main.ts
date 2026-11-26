// Warning Label for Humans: One Line, Big Laugh — make.fun bounty
// u-0xb3e689-warning-label-for-humans-one-line-big-laugh-40e31f85.
//
// Writes one warning label to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// Standard library only: no network, no clock, no randomness, so every run
// writes the same bytes. No trailing newline is written.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const MAX_CHARS = 160;

// v2: printed-label register: a false reading under pressure, then a dated hazard.
const ENTRY =
  "WARNING: Unit will announce 'leaving in five minutes,' then talk in the doorway " +
  "for 45. Coat on is not an indicator. Keys in hand is not an indicator.";

function fail(message: string): never {
  console.error("entry.txt rejected: " + message);
  process.exit(1);
}

// The gate: UTF-8 text of 1 to MAX_CHARS characters, not only white space.
const chars = Array.from(ENTRY).length;
if (chars < 1 || chars > MAX_CHARS) fail(`${chars} characters, limit is 1 to ${MAX_CHARS}`);
if (ENTRY.trim().length === 0) fail("only white space");
if (/[\r\n\t]/.test(ENTRY)) fail("holds a line break or a tab, the entry must be one line");
if (ENTRY !== ENTRY.trim()) fail("starts or ends with white space");
// It has to read like a printed label, so it opens the way labels do.
if (!ENTRY.startsWith("WARNING: ")) fail("does not open with WARNING: as a printed label would");

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, "entry.txt"), ENTRY, "utf8");
console.log(`entry.txt written: ${chars} characters, ${Buffer.byteLength(ENTRY, "utf8")} bytes`);
