/**
 * Deploys the Storage contract (frontend/src/contracts/Storage.json) to BSC Mainnet.
 *
 * Usage:
 *   1. Create a file named `.env.deploy` in the `frontend` folder (NOT `.env`) with:
 *        DEPLOYER_PRIVATE_KEY=your_private_key_here
 *   2. Run:  node scripts/deployStorage.js
 *
 * SECURITY: `.env.deploy` is git-ignored. Never commit a private key.
 * This script only deploys the contract — it does not touch your existing
 * frontend/.env file or any deployed app.
 */

const fs = require("fs");
const path = require("path");
const Web3 = require("web3");

// --- Load DEPLOYER_PRIVATE_KEY from frontend/.env.deploy ---
const envPath = path.join(__dirname, "..", ".env.deploy");
if (!fs.existsSync(envPath)) {
  console.error(
    "\nMissing frontend/.env.deploy file.\n" +
      "Create it with one line:\n" +
      "  DEPLOYER_PRIVATE_KEY=your_private_key_here\n"
  );
  process.exit(1);
}
const envContent = fs.readFileSync(envPath, "utf8");
const match = envContent.match(/DEPLOYER_PRIVATE_KEY\s*=\s*(.+)/);
if (!match) {
  console.error("DEPLOYER_PRIVATE_KEY not found in .env.deploy");
  process.exit(1);
}
let privateKey = match[1].trim();
if (!privateKey.startsWith("0x")) privateKey = "0x" + privateKey;

// --- BSC Mainnet RPC (matches constants/networksInfo.js) ---
const RPC_URL = "https://bsc-dataseed.binance.org/";

// --- Load the compiled contract artifact ---
const artifactPath = path.join(__dirname, "..", "src", "contracts", "Storage.json");
const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

async function main() {
  const web3 = new Web3(RPC_URL);
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(account);

  const balanceWei = await web3.eth.getBalance(account.address);
  const balanceBNB = web3.utils.fromWei(balanceWei, "ether");

  console.log("Deployer address:", account.address);
  console.log("BNB balance:", balanceBNB);

  if (parseFloat(balanceBNB) < 0.003) {
    console.error(
      "\nBalance too low. Send at least ~0.005 BNB to this address on BSC " +
        "Mainnet before deploying (covers gas with margin).\n"
    );
    process.exit(1);
  }

  console.log("\nDeploying Storage contract to BSC Mainnet...");

  const contract = new web3.eth.Contract(artifact.abi);
  const deployTx = contract.deploy({ data: artifact.bytecode });

  const gas = await deployTx.estimateGas({ from: account.address });
  const gasPrice = await web3.eth.getGasPrice();

  const deployed = await deployTx.send({
    from: account.address,
    gas: Math.floor(Number(gas) * 1.2),
    gasPrice,
  });

  console.log("\n✅ Deployed! Contract address:");
  console.log(deployed.options.address);
  console.log(
    "\nNext step: put this address into " +
      "frontend/src/constants/networksInfo.js under networks[56].storage"
  );
}

main().catch((err) => {
  console.error("\nDeployment failed:", err.message || err);
  process.exit(1);
});
