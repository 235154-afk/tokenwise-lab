# Developer Onboarding Guide

## Product Overview

This is a **Multichain Launchpad Kit** - a decentralized platform that enables projects to conduct Initial DEX Offerings (IDOs) across multiple EVM-compatible blockchain networks. It's similar to platforms like Polkastarter or Seedify, allowing token creators to raise funds by selling their tokens to early investors.

---

## Main Features

### 1. IDO Creation & Management
- Token creators can publish new IDO pools with customizable parameters (soft cap, hard cap, token price, min/max investment)
- Multi-step wizard form for creating IDOs (Token Verification → IDO Information → Project Info → Preview)
- Automatic liquidity provision on DEX after successful IDO
- Built-in LP token locking mechanism

### 2. Token Locker System
- Projects can lock their LP tokens for a specified period
- Provides trust and transparency to investors
- Withdrawal available only after lock period expires

### 3. Multi-Chain Support
- Supports multiple EVM-compatible networks (BSC, Ethereum, etc.)
- Easy to add new networks via configuration
- Each network can have different DEX configurations (PancakeSwap, Uniswap, etc.)

### 4. Investment Features
- Users can participate in IDOs using native currency (ETH, BNB, etc.)
- Refund mechanism if soft cap not reached
- Claim tokens after IDO completion
- Search/filter functionality for IDO pools

### 5. Admin Management Panel
- Set application owner/admin
- Configure Infura IPFS for metadata storage
- Set up WebSocket RPC for each supported network
- Deploy and configure smart contracts per network
- Enable/disable token locker feature

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  React + Redux + Web3 (MetaMask/WalletConnect)              │
│  - Wallet connection & management                            │
│  - Smart contract interactions                               │
│  - Real-time blockchain events                               │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    SMART CONTRACTS                           │
│  - IDOFactory: Creates IDO pools, collects fees             │
│  - IDOPool: Manages investments, claims, liquidity          │
│  - TokenLocker: Locks tokens for specified periods          │
│  - TokenLockerFactory: Creates token lockers                │
│  - Storage: Domain-based settings (BSC only)                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       BACKEND                                │
│  Express.js (currently underutilized)                        │
│  - MongoDB integration (commented out)                       │
│  - NFT marketplace routes (unused)                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

### Frontend
- **React 17** - UI framework
- **Redux** - State management
- **Web3.js / Ethers.js** - Blockchain interaction
- **Material UI** - Component library
- **React Router** - Navigation
- **WalletConnect** - Mobile wallet support

### Backend
- **Express.js** - Node.js server
- **MongoDB** - Database (currently disabled)
- **Mongoose** - ODM

### Smart Contracts
- **Solidity 0.8.x**
- **OpenZeppelin** - Security utilities
- **Truffle** - Development framework

---

## What's Incomplete

### 1. Backend Underutilization
- MongoDB connection is **commented out** in `backend/app.js`
- Backend has NFT marketplace models (`collectionModel`, `itemModel`, `itemBuyModel`) that seem unrelated to launchpad functionality
- The backend appears to be leftover from a different project and needs to be either:
  - Removed entirely (app works without it)
  - Repurposed for launchpad-specific features (off-chain data, analytics, user profiles)

### 2. Storage Contract
- The application requires a "Storage" smart contract (deployed on BSC) for domain-based settings
- The contract code is **not included** in the repository
- Only referenced in `frontend/src/constants/networksInfo.js` with a hardcoded address

### 3. Missing Documentation
- No README.md at root level
- Setup instructions scattered across multiple docs
- No deployment guide for smart contracts
- No environment variable documentation

### 4. Production Readiness Issues
- `getCurrentDomain` function in `frontend/src/utils/utils.js` needs modification for production
- Environment variables need configuration
- No test suite for smart contracts

### 5. Smart Contract Deployment
- Migration script exists but deployment process not documented
- Contract verification setup exists but needs configuration

---

## Previous Developer's Work

The previous developer built:

**Completed:**
- Complete smart contract architecture (Factory pattern)
- Full frontend UI with wallet integration
- Multi-chain configuration system
- Domain-based admin/settings system using Storage contract
- Basic documentation for setup and network addition
- IDO creation wizard
- Token locker functionality

**Code Quality:**
- The codebase is **functional** for its core purpose
- Appears to be in a "works but needs polish" state
- Some unused/legacy code from NFT marketplace project

---

## Priority Focus Areas

### Priority 1: Clean Up & Documentation (Week 1)
1. Create comprehensive README.md
2. Document all environment variables
3. Remove or properly integrate the unused backend NFT marketplace code
4. Add smart contract deployment guide

### Priority 2: Production Readiness (Week 2)
1. Test the complete flow on testnet
2. Improve error handling and user feedback
3. Implement proper logging
4. Security audit of smart contracts

### Priority 3: Feature Completion (Weeks 3-4)
1. Backend integration for analytics/tracking
2. User portfolio page enhancements
3. IDO filtering/sorting improvements
4. Notification system for IDO events

### Priority 4: Quality Assurance (Ongoing)
1. Unit tests for smart contracts
2. Integration tests for frontend
3. End-to-end testing

---

## Getting Started

### Prerequisites
- Node.js v16+
- npm or yarn
- MetaMask or similar Web3 wallet

### Installation

```bash
# Install dependencies
npm install
```

### Running the Application

```bash
# From frontend directory
npm start
```

This will start both frontend and backend concurrently.

### Initial Setup
1. Open the app in your browser
2. Connect your wallet using BSC network
3. Click "Set Owner" to set admin
4. Configure Infura IPFS settings
5. Configure network WebSocket RPC
6. Deploy/configure smart contracts

---

## Key Files to Review

| File | Purpose |
|------|---------|
| `frontend/src/App.js` | Main application entry |
| `frontend/src/context/applicationContext.js` | Global app state |
| `frontend/src/hooks/useDomainData.js` | Domain settings fetcher |
| `frontend/src/pages/Manage/index.js` | Admin panel |
| `frontend/src/components/Form/Publish/publishForm.js` | IDO creation form |
| `frontend/contracts/IDOFactory.sol` | IDO factory contract |
| `frontend/contracts/IDOPool.sol` | IDO pool contract |
| `frontend/src/constants/networksInfo.js` | Network configurations |
| `backend/app.js` | Backend server |

---

## Questions?

Contact the project lead for:
- Storage contract source code
- Production environment credentials
- Deployed contract addresses on different networks
- Design decisions and roadmap
