// Serves the resume source as-is at /resume.md for LLMs and scripts; /resume/ renders the same file as a page.
import resume from "../resume.md?raw";

export const GET = () => new Response(resume, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
