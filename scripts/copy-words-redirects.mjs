import { copyFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "dist");
const destination = path.join(output, "_redirects");

if (!existsSync(path.join(output, "words", "index.html"))) {
  throw new Error("Astro export is missing dist/words/index.html.");
}
if (existsSync(destination)) {
  throw new Error("Astro export already contains _redirects; merge rules before overwriting it.");
}

copyFileSync(path.join(root, "scripts", "words-redirects.txt"), destination);
console.log("Added scoped word routes to dist/_redirects.");
