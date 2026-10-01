import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const output = path.join(root, "dist");
const destination = path.join(output, "_redirects");

if (!existsSync(path.join(output, "words", "index.html"))) {
  throw new Error("Astro export is missing dist/words/index.html.");
}
if (!existsSync(path.join(output, "listen", "index.html"))) {
  throw new Error("Astro export is missing dist/listen/index.html.");
}
if (existsSync(destination)) {
  throw new Error("Astro export already contains _redirects; merge rules before overwriting it.");
}

const words = readFileSync(path.join(root, "scripts", "words-redirects.txt"), "utf8").trim();
const listen = readFileSync(path.join(root, "scripts", "listen-redirects.txt"), "utf8").trim();
writeFileSync(destination, `${words}\n${listen}\n`);
console.log("Added scoped word and listening routes to dist/_redirects.");
