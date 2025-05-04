import { getFullnodeUrl } from "@iota/iota-sdk/client";
import { createNetworkConfig } from "@iota/dapp-kit";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    testnet: {
      url: getFullnodeUrl("testnet"),
      variables: {
        packageId: '0x0d7c481bff6a1b36518cc4a4b8db0ef66dd021587618a170f23b557e6c540310',
        tippingPlatformId: '0xf92976a33e4b2330039ca6ceec79403ed0278279711e040efdb62da4e43afb99',
      },
    },
  });

export { useNetworkVariable, useNetworkVariables, networkConfig };