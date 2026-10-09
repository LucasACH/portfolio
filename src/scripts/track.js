// Vercel Analytics custom events. Links are classified by where they point, so the resume page's Markdown links count too.
// Pro plans keep two properties per event, so each event carries at most two.
import { track } from "@vercel/analytics";

const page = location.pathname;
const resumes = { "lucas-achaval-resume.pdf": "en", "lucas-achaval-cv.pdf": "es" };
const contacts = { "github.com": "github", "www.linkedin.com": "linkedin", "linkedin.com": "linkedin" };

function classify(a) {
  if (a.classList.contains("lang")) return ["Language Switch", { to: a.dataset.lang }];
  const url = new URL(a.href, location.href);
  if (url.protocol === "mailto:") return ["Contact Click", { via: "email", page }];
  if (contacts[url.hostname]) return ["Contact Click", { via: contacts[url.hostname], page }];
  // The resume Markdown links its PDFs by absolute URL, which previews and localhost don't share.
  if (url.origin !== location.origin && url.hostname !== "lucasachaval.com") return ["Outbound Click", { host: url.hostname, page }];
  const file = url.pathname.split("/").pop();
  if (resumes[file]) return ["Resume Download", { lang: resumes[file], page }];
  if (url.pathname === "/resume/") return ["Resume View", { page }];
  if (url.pathname === "/") return ["Home Click", { page }];
  return null;
}

function onClick(e) {
  // Middle-clicks open links too; they only arrive as auxclick.
  if (e.type === "auxclick" && e.button !== 1) return;
  const a = e.target.closest && e.target.closest("a[href]");
  const event = a && classify(a);
  if (event) track(...event);
}
document.addEventListener("click", onClick);
document.addEventListener("auxclick", onClick);

// toggle doesn't bubble, so listen in the capture phase.
document.addEventListener(
  "toggle",
  (e) => {
    if (e.target.matches("details.resume") && e.target.open) track("Resume Menu Open", { page });
  },
  true,
);
