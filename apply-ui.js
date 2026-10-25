/* Run from Website-main:  node apply-ui.js   (safe to run twice) */
const fs = require("fs"), path = require("path");
const SRC = path.join(__dirname, "frontend", "src");
const UI = path.join(__dirname, "ui");
const rd = (f) => fs.readFileSync(f, "utf8");
const wr = (f, s) => fs.writeFileSync(f, s);
const log = (m) => console.log(m);

// 1. new files
fs.mkdirSync(path.join(SRC, "components", "Hero"), { recursive: true });
fs.copyFileSync(path.join(UI, "theme.css"), path.join(SRC, "theme.css"));
fs.copyFileSync(path.join(UI, "Hero", "index.js"), path.join(SRC, "components", "Hero", "index.js"));
fs.copyFileSync(path.join(UI, "pages", "Connection.js"), path.join(SRC, "pages", "Connection.js"));
fs.copyFileSync(path.join(UI, "pages", "home.js"), path.join(SRC, "pages", "home.js"));
log("copied: theme.css, Hero, Connection.js, home.js");

function edit(rel, fn) {
  const f = path.join(SRC, rel);
  if (!fs.existsSync(f)) return log("skip (missing): " + rel);
  const a = rd(f), b = fn(a);
  if (a !== b) { wr(f, b); log("updated: " + rel); } else log("no change: " + rel);
}

// 2. index.js: theme.css + light MUI palette
edit("index.js", (s) => {
  if (!s.includes('./theme.css')) s = s.replace('import "./index.css";', 'import "./index.css";\nimport "./theme.css";');
  return s.replace('mode: "dark"', 'mode: "light"').replace('main: "#27C498"', 'main: "#7C3AED"')
    .replace('main: "#232227"', 'main: "#EDE7FF"').replace('text: { main: "#FFFFFF" }', 'text: { main: "#1E1B3A" }');
});

// 3. App.css: drop old font imports, old dark :root, soften shadows
edit("App.css", (s) => s.replace(/@import url\([^)]*\);\r?\n/g, "").replace(/:root \{[\s\S]*?\n\}\r?\n/, "")
  .replace("box-shadow: 6px 6px 2px 1px rgba(0,0,0,0.4);", "box-shadow: 0 10px 30px -14px rgba(76,29,149,.35);")
  .replace("box-shadow: 3px 3px 2px 1px rgba(0,0,0,0.6);", "box-shadow: 0 16px 36px -14px rgba(76,29,149,.5);"));

// 4. hard-coded dark colours -> light
const dark = ["components/WalletModal/index.js", "styles/global.js"];
dark.forEach((r) => edit(r, (s) => s.replace(/#232227/g, "#FFFFFF")));
["components/Navbar/NavbarElements.js", "components/Footer/FooterStyle.js",
 "components/WalletModal/PendingView.js", "pages/Manage/Settings/index.js"]
  .forEach((r) => edit(r, (s) => s.replace(/color: ?(#fff|white|#ffffff);/g, "color: var(--text);")));
edit("components/WalletModal/Option.js", (s) => s
  .replace(/color: #ffffff;(\r?\n\s*font-size: 0\.7rem)/, "color: var(--text);$1")
  .replace(/color: white;(\r?\n\s*margin-top: 10px)/, "color: var(--text);$1"));
edit("components/Navbar/index.js", (s) => s.replace('variant="dark"', 'variant="light"'));

// 5. public/index.html: fonts + title + theme colour
const html = path.join(__dirname, "frontend", "public", "index.html");
let h = rd(html);
if (!h.includes("Plus+Jakarta+Sans")) {
  h = h.replace(/<title>[^<]*<\/title>/, `<link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@500;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
    <title>TokenWise Lab – Token launchpad</title>`);
  h = h.replace('content="#000000"', 'content="#7C3AED"').replace("utf-16", "utf-8");
  wr(html, h); log("updated: public/index.html");
} else log("no change: public/index.html");
log("\nDone. Now: cd frontend ; npm run build");
