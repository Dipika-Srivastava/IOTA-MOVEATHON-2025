import { Flex, Text } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { useNetworkVariable } from '../networkConfig';
import { useIotaWallet } from '../wallet';

const BalanceDisplay = () => {
  const [iotaBalance, setIotaBalance] = useState('0');
  const [tipTokenBalance, setTipTokenBalance] = useState('0');
  const [error, setError] = useState<string | null>(null);
  const packageId = useNetworkVariable('packageId');
  const { getBalance, isLoading, queryError } = useIotaWallet();

  useEffect(() => {
    (async () => {
      if (isLoading) return;
      if (queryError) {
        setError('Failed to fetch data from IOTA node');
        return;
      }

      try {
        const iotaBalance = await getBalance('0x2::iota::IOTA');
        setIotaBalance(iotaBalance.toString());

        const tipTokenType = `${packageId}::tipping::TIPPING`;
        const tipTokenBalance = await getBalance(tipTokenType);
        setTipTokenBalance(tipTokenBalance.toString());
      } catch (err) {
        setError('Failed to fetch balances');
        console.error('Failed to fetch balances:', err);
      }
    })();
  }, [getBalance, isLoading, queryError, packageId]);

  return (
    <Flex direction="column" align="center">
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text color="red">{error}</Text>
      ) : (
        <>
          <Text>IOTA Balance: {iotaBalance}</Text>
          <Text>TIP Token Balance: {tipTokenBalance}</Text>
        </>
      )}
    </Flex>
  );
};

export default BalanceDisplay;