// import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/query-core';
import { readContract } from '@wagmi/core';

import DeployedContract from '../../../contracts/contractInfo.json';
// import { useAccount } from 'wagmi';
import CounterAbi from '../../../contracts/out/Counter.sol/Counter.json';

export function getReadContractKey(functionName: string, params?: Array<any>) {
  return ['readContract', functionName, params];
}

export function useReadContract(functionName: string, params?: Array<any>) {
  const {
    isLoading,
    isError: hasError,
    data: data,
  } = useQuery({
    queryKey: getReadContractKey(functionName, params),
    queryFn: () => {
      if (!functionName) return null;
      return fetchContractData(functionName, params);
    },
    refetchInterval: 7500,
  });

  return { isLoading, hasError, data };
}

export function getCachedReadContract(
  queryClient: QueryClient,
  functionName: string,
  params?: Array<any>
) {
  return queryClient.getQueryData(getReadContractKey(functionName, params));
}

async function fetchContractData(
  functionName: string,
  params?: Array<any>
): Promise<any> {
  const data = await readContract({
    address: DeployedContract.deployedTo as `0x${string}`,
    abi: CounterAbi.abi,
    functionName: functionName,
    args: params || [],
  });
  return String(data);
}
