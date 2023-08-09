import { writeContract, waitForTransaction } from '@wagmi/core';
import { useCallback, useState } from 'react';

import contractAddress from "../../../contract/contract-address.json"
import superPlaceABI from "../../../contract/artifacts/contracts/SuperPlace.sol/SuperPlace.json"
// import superPlaceABI from "../../../contract/artifacts/contracts/test/abi.json"

export function useWriteContract() {
  const [isLoading, setIsLoading] = useState(false);

  const triggerDraw = useCallback(
    async (params?: Array<any>) => {
      setIsLoading(true);
      try {
        const { hash } = await writeContract({
          mode: "recklesslyUnprepared",
          address: contractAddress.address,
          // address: "0x1Cb4784fB5E1693118D38AC511C98a4EAC105092",
          // abi: superPlaceABI,
          abi: superPlaceABI.abi,
          functionName: 'draw',
          args: params || [],
        });
        await waitForTransaction({
          hash
        })
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false);
    },
    [setIsLoading]
  );
  return {
    isLoading,
    triggerDraw,
  };
}