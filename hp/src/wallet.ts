import { useCallback } from 'react';
import { useCurrentAccount, useIotaClientQuery, WalletProvider } from '@iota/dapp-kit';

// Ensure this hook is used within a WalletProvider context in your app
export const useIotaWallet = () => {
  const account = useCurrentAccount();

  // Fetch owned objects using the IOTA client query
  const { data: ownedObjects, error: queryError, isLoading } = useIotaClientQuery(
    'getOwnedObjects',
    {
      owner: account?.address || '',
    },
    {
      enabled: !!account, // Only fetch if an account is connected
      staleTime: 60_000,  // Cache data for 60 seconds
    }
  );

  // Fetch coin objects for a specific coin type
  const getCoinObjects = useCallback(
    async (coinType: string) => {
      if (!account) {
        throw new Error('No account connected');
      }

      if (queryError) {
        console.error('Query error:', queryError);
        throw new Error('Failed to fetch owned objects');
      }

      if (!ownedObjects || !ownedObjects.data) {
        console.log('No owned objects returned for address:', account.address);
        return [];
      }

      // Debug: Log the full response for inspection
      console.log('Full Owned Objects Response:', JSON.stringify(ownedObjects.data, null, 2));

      try {
        const coins = ownedObjects.data
          .filter((object) => {
            // Debug: Log each object for detailed inspection
            console.log('Processing Object:', JSON.stringify(object, null, 2));

            // Flexible type checking to handle various response structures
            const objectType = object.data?.type || object.data?.coinType || object.data?.structTag?.type;
            const isCoin = objectType === `0x2::coin::Coin<${coinType}>` || objectType === coinType;

            if (isCoin) {
              console.log('Matched Coin Object:', JSON.stringify(object, null, 2));
            }
            return isCoin;
          })
          .map((object) => ({
            coinObjectId: object.data?.objectId || object.objectId,
            balance: parseInt(object.data?.balance || object.data?.amount || '0', 10),
          }));

        console.log('Filtered Coin Objects:', JSON.stringify(coins, null, 2));
        return coins;
      } catch (error) {
        console.error('Error filtering coin objects:', error);
        throw error;
      }
    },
    [account, ownedObjects, queryError]
  );

  // Calculate total balance for a specific coin type
  const getBalance = useCallback(
    async (coinType: string) => {
      try {
        const coins = await getCoinObjects(coinType);
        const total = coins.reduce((acc, coin) => acc + coin.balance, 0);
        console.log(`Total Balance for ${coinType}:`, total);
        return total;
      } catch (error) {
        console.error('Error calculating balance:', error);
        return 0;
      }
    },
    [getCoinObjects]
  );

  return { getCoinObjects, getBalance, isLoading, queryError };
};