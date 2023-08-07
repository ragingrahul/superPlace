import { writeContract } from '@wagmi/core';
import { useCallback, useState } from 'react';

import DeployedContract from '../../../contracts/contractInfo.json';
import CounterAbi from '../../../contracts/out/Counter.sol/Counter.json';

export function useWriteContract() {
  const [isLoading, setIsLoading] = useState(false);

  const triggerTransactions = useCallback(
    async (functionName: string, params?: Array<any>) => {
      setIsLoading(true);
      const { hash } = await writeContract({
        address: DeployedContract.deployedTo as `0x${string}`,
        abi: CounterAbi.abi,
        functionName: functionName,
        args: params || [],
      });
      setIsLoading(false);
    },
    [setIsLoading]
  );

  return {
    isLoading,
    triggerTransactions,
  };
}
