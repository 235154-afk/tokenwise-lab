/* Free deploy to BNB Smart Chain Testnet (chain 97).
   Run from Website-main:  node scripts/deploy-testnet.js
   Reads PRIVATE_KEY and BSC_TESTNET_RPC from Website-main/.env (never printed). */
const fs = require("fs");
const path = require("path");
const Web3 = require("../frontend/node_modules/web3");

// tiny .env reader (no extra packages)
const envFile = path.join(__dirname, "..", ".env");
const env = {};
fs.readFileSync(envFile, "utf8").split(/\r?\n/).forEach((l) => {
  const m = l.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
});

const RPC = env.BSC_TESTNET_RPC || "https://data-seed-prebsc-1-s1.binance.org:8545";
let pk = env.PRIVATE_KEY || "";
if (!pk) throw new Error("PRIVATE_KEY missing in .env");
if (!pk.startsWith("0x")) pk = "0x" + pk;

const web3 = new Web3(RPC);
const account = web3.eth.accounts.privateKeyToAccount(pk);
web3.eth.accounts.wallet.add(account);

const art = (n) =>
  JSON.parse(fs.readFileSync(path.join(__dirname, "..", "frontend", "src", "contracts", n + ".json"), "utf8"));

async function deploy(name, args = []) {
  const { abi, bytecode } = art(name);
  const c = new web3.eth.Contract(abi);
  const tx = c.deploy({ data: bytecode, arguments: args });
  const gas = Math.ceil((await tx.estimateGas({ from: account.address })) * 1.2);
  const inst = await tx.send({ from: account.address, gas });
  console.log(name.padEnd(20), inst.options.address);
  return inst.options.address;
}

(async () => {
  const chainId = await web3.eth.getChainId();
  if (chainId !== 97) throw new Error("Wrong network: expected 97, got " + chainId);
  const bal = await web3.eth.getBalance(account.address);
  console.log("Deployer:", account.address);
  console.log("Balance :", web3.utils.fromWei(bal), "tBNB");
  if (BigInt(bal) < BigInt(web3.utils.toWei("0.05"))) {
    throw new Error("Balance too low. Get more tBNB from the faucet first.");
  }
  const out = {};
  out.Storage = await deploy("Storage");
  out.FeeToken = await deploy("FeeToken");
  out.IDOFactory = await deploy("IDOFactory", [out.FeeToken, "0", "0"]);
  out.TokenLockerFactory = await deploy("TokenLockerFactory");
  fs.writeFileSync(path.join(__dirname, "..", "deployed-testnet.json"), JSON.stringify(out, null, 2));
  console.log("\nSaved to deployed-testnet.json");
  console.log("Next: put the Storage address in frontend/src/constants/networksInfo.js (network 97 -> storage)");
})().catch((e) => { console.error("FAILED:", e.message); process.exit(1); });
