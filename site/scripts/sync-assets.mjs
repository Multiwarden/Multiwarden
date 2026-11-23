// Copies the shared logo and the CNAME into public/, so the logo has one source (../logo) and
// the domain has one source (./CNAME). Runs before `dev` and `build`.
import { copyFileSync, mkdirSync } from "node:fs";

const root = new URL("../", import.meta.url);
mkdirSync(new URL("public/", root), { recursive: true });
copyFileSync(new URL("../logo/logo512.png", root), new URL("public/logo.png", root));
copyFileSync(new URL("CNAME", root), new URL("public/CNAME", root));
