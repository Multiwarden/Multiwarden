import { readFileSync } from "node:fs";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// The domain lives in CNAME (also deployed as-is), so canonical URLs follow it.
const domain = readFileSync(new URL("./CNAME", import.meta.url), "utf8").trim();

export default defineConfig({
  site: `https://${domain}`,
  trailingSlash: "ignore",
  build: { format: "directory" },
  vite: { plugins: [tailwindcss()] },
});
