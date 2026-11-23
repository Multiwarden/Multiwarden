// Machine-readable list of every release, also used by the Pages workflow to tell whether
// anything changed since the last deploy.
import type { APIRoute } from "astro";
import { getReleases } from "../lib/releases";

export const GET: APIRoute = async () => {
  const releases = (await getReleases()).map(({ notesHtml: _notes, ...r }) => r);
  return new Response(JSON.stringify({ releases }, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
