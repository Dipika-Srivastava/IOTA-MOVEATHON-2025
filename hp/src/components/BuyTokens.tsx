import { useState } from 'react';
import { useNetworkVariable } from '../networkConfig';
import { useIotaWallet } from '../wallet';
import { useSignAndExecuteTransaction } from '@iota/dapp-kit';

const BuyTokens = () => {
  const [amount, setAmount] = useState('');
  const [buyField, setBuyField] = useState(false);
  const packageId = useNetworkVariable('packageId');
  const tippingPlatformId = useNetworkVariable('tippingPlatformId');
  const { getCoinObjects, getBalance, isLoading, queryError } = useIotaWallet();
  const signAndExecuteTransactionBlock = useSignAndExecuteTransaction();

  const handleBuy = async () => {
    try {
      if (isLoading) {
        alert('Please wait, data is still loading');
        return;
      }
      if (queryError) {
        alert('Failed to fetch data from IOTA node. Please try again later.');
        return;
      }

      const requestedAmount = parseInt(amount);
      if (isNaN(requestedAmount) || requestedAmount <= 0) {
        alert('Please enter a valid amount');
        return;
      }

      const coins = await getCoinObjects('0x2::iota::IOTA');
      const totalBalance = await getBalance('0x2::iota::IOTA');
      if (coins.length === 0) {
        alert(`No IOTA coin objects found. Available balance: ${totalBalance}`);
        return;
      }

      const coin = coins.find((c) => c.balance >= requestedAmount);
      if (!coin) {
        alert(`Insufficient IOTA balance. Available: ${totalBalance}, Requested: ${requestedAmount}`);
        return;
      }

      const transaction = {
        kind: 'ProgrammableTransaction',
        transactions: [
          {
            MoveCall: {
              package: packageId,
              module: 'tipping',
              function: 'buy_tokens',
              type_arguments: [],
              arguments: [tippingPlatformId, coin.coinObjectId],
            },
          },
        ],
      };
      await signAndExecuteTransactionBlock(transaction);
      setAmount('');
      setBuyField(false);
      alert('Transaction Successful');
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <div>
      <button onClick={() => setBuyField(true)}>Buy Tokens</button>
      {buyField && (
        <div>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter IOTA amount"
          />
          <button onClick={handleBuy}>Submit</button>
          <button onClick={() => setBuyField(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default BuyTokens;