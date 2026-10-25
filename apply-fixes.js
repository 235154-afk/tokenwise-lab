/* Run from Website-main:  node apply-fixes.js   (safe to run twice) */
const fs = require("fs"), path = require("path");
const SRC = path.join(__dirname, "frontend", "src");
const log = (m) => console.log(m);

function edit(rel, fn) {
  const f = path.join(SRC, rel);
  if (!fs.existsSync(f)) return log("MISSING: " + rel);
  const a = fs.readFileSync(f, "utf8"), b = fn(a);
  if (a !== b) { fs.writeFileSync(f, b); log("updated : " + rel); } else log("no change: " + rel);
}

// 1. Buttons that were white-on-white (CONNECT, Set Owner, Switch network...)
const btn = fs.readFileSync(path.join(__dirname, "fixes", "button.txt"), "utf8");
edit("styles/global.js", (s) => {
  const a = s.indexOf("export const button = styled.button`");
  const b = s.indexOf("export const ButtonSquare");
  if (a !== -1 && b !== -1 && !s.includes("&&:disabled")) s = s.slice(0, a) + btn + s.slice(b);
  // round icon badge had no background (white icon on white card)
  return s.replace(/background-color: \$\{\(\{ theme \}\) => theme\.text2\};/g,
    "background: linear-gradient(135deg,#8B5CF6,#4C1D95);");
});

// 2. Wallet modal: only the working network, no dead WalletConnect v1, visible close icon
edit("components/WalletModal/index.js", (s) => {
  s = s.replace("import { SUPPORTED_WALLETS, WALLET_NAMES } from '../../constants';",
    "import { SUPPORTED_WALLETS, WALLET_NAMES, STORAGE_NETWORK_ID } from '../../constants';");
  s = s.replace(/return true;(\s*\}\);\s*setAvailableNetworks)/, "return Number(chainId) === STORAGE_NETWORK_ID;$1");
  const g = s.indexOf("function getAvailableWallets");
  if (g !== -1 && !s.includes("WALLET_NAMES.WALLET_CONNECT) return null")) {
    const key = "const option = SUPPORTED_WALLETS[key]";
    const i = s.indexOf(key, g);
    if (i !== -1) s = s.slice(0, i + key.length) + "\n      if (option.name === WALLET_NAMES.WALLET_CONNECT) return null" + s.slice(i + key.length);
  }
  return s.replace("stroke: white;", "stroke: #4C1D95;");
});

// 3. Reliable BSC Testnet RPC + default read-only network
edit("constants/networksInfo.js", (s) => s.replace("https://data-seed-prebsc-2-s3.binance.org:8545", "https://bsc-testnet-rpc.publicnode.com"));
edit("connectors/index.js", (s) => s.replace("defaultChainId: 5, // goerli testnet", "defaultChainId: 97, // BSC testnet"));

// 4. White text that became invisible on white cards
["components/Card/longLocker.js", "components/Card/longIdo.js", "components/Card/poolRenderer.js",
 "components/Form/lockTokenForm.js", "components/Form/Publish/publishForm.js"]
  .forEach((r) => edit(r, (s) => s.replace(/color: "white"/g, 'color: "var(--text)"')));
edit("components/Footer/Footer.js", (s) => s.replace(/"#ffffff"/g, '"#E7E0FB"'));
edit("components/Navbar/NavbarElements.js", (s) => s.replace("border: 1px solid #fff;", "border: 1px solid #E7E0FB;"));
edit("components/Web3ReactManager/index.js", (s) => s.replace("|| 'white'", "|| '#6B6785'"));
log("\nDone. Now: cd frontend ; npm run build");
