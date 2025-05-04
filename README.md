## IOTA Tipping Platform

### Overview

This project is a decentralized tipping platform built on the IOTA network using @iota/dapp-kit and @iota/iota-sdk. It allows users to buy TIP tokens with IOTA, tip creators, redeem tokens, and view their balances. The frontend is a React application styled with Radix UI components, featuring a modern dark theme with tabbed navigation inspired by NFT marketplaces.
The platform addresses issues like balance fetching errors and missing dependencies, ensuring a seamless user experience on the IOTA testnet.

### Features
- Tipping Functionality: Buy TIP tokens, tip creators, and redeem tokens using IOTA.
- Wallet Integration: Fetches IOTA and TIP token balances via @iota/iota-sdk.
- UI Design: Dark theme with blue accents, tabbed navigation ("Buy," "Tip," "Redeem," "Balance"), and sleek dialogs.
- Error Handling: Robust balance fetching with proper error logging and user feedback.

### Prerequisites
Node.js (v16 or higher)

pnpm (v8 or higher)

IOTA testnet wallet with funded tokens

Git

### Setup Instructions if you want to run the application
1. Clone the Repository
```bash
git clone https://github.com/Dipika-Srivastava/IOTA-MOVEATHON-2025
cd IOTA-MOVEATHON-2025
```
3. Initialize the dApp
   
If you haven't already set up the project, initialize it using the IOTA dApp template:
```bash
pnpm create @iota/create-dapp
cd tipping-platform
pnpm i
```
5. Install Dependencies
   
Install required packages for the frontend:
```bash
pnpm add @radix-ui/themes @radix-ui/react-tabs @iota/dapp-kit @iota/iota-sdk
```
7. Configure Network
   
Update src/networkConfig.ts with your Package ID and Tipping Platform ID (obtained after deploying the Move smart contract):
```bash
export const networkConfig = {
  packageId: '0xYourPackageIdHere',
  tippingPlatformId: '0xYourTippingPlatformIdHere',
};
```

5. Add Components
   
Ensure the following components are in src/components/:

- BalanceDisplay.tsx: Displays IOTA and TIP token balances.

- BuyTokens.tsx: Handles purchasing TIP tokens.

- TipCreator.tsx: Allows tipping creators with TIP tokens.

- RedeemTokens.tsx: Facilitates redeeming TIP tokens.

6. Update App.tsx
   
The main application file (src/App.tsx) uses a tabbed interface for navigation. It includes tabs for "Buy," "Tip," "Redeem," and "Balance," styled with a dark theme and blue accents.

8. Add Wallet Utility
   
The src/wallet.ts file manages wallet interactions, including balance fetching for IOTA and TIP tokens. It uses wallet.getBalance() for IOTA and getOwnedObjects for TIP tokens.

10. Run the Application
    
Start the development server:
```bash
pnpm run dev
```
Visit http://localhost:5173 to interact with the dApp.

### Usage
- Connect Wallet: Click the ConnectButton in the top-right corner to connect your IOTA wallet.
  
### Navigate Tabs:
- Buy: Purchase TIP tokens using IOTA.
- Tip: Send TIP tokens to a creator by entering their address and amount.
- Redeem: Redeem TIP tokens back to IOTA.
- Balance: View your IOTA and TIP token balances.

### Project Structure
hp/
├── src/
│   ├── components/
│   │   ├── BalanceDisplay.tsx
│   │   ├── BuyTokens.tsx
│   │   ├── TipCreator.tsx
│   │   └── RedeemTokens.tsx
│   ├── App.tsx
│   ├── networkConfig.ts
│   └── wallet.ts
├── package.json
└── README.md

### Contributing

Feel free to submit issues or pull requests. Ensure all changes are tested on the IOTA testnet.

### License

This project is licensed under the MIT License.
