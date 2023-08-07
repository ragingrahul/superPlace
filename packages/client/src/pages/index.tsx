import * as React from 'react';
import { useAccount } from 'wagmi';

import Layout from '@/components/layout/Layout';

// import { useReadContract } from '@/hook/useReadContract';
// import { useWriteContract } from '@/hook/useWriteContract';
import { toast } from "react-toastify";

export default function HomePage() {
  const { address } = useAccount();
  // const { data } = useReadContract('getCount');
  // const { triggerTransactions } = useWriteContract();
  const addNotification = () => {
    // https://fkhadra.github.io/react-toastify/promise
    const functionThatReturnPromise = () => new Promise(resolve => setTimeout(resolve, 3000));
    toast.promise(
      functionThatReturnPromise,
      {
        pending: 'Promise is pending',
        success: 'Promise resolved 👌',
        error: 'Promise rejected 🤯'
      }
    )
  };

  return (
    <Layout>
      <div>{address}</div>
      {/* <div>data: {data}</div>
      <button onClick={() => triggerTransactions('increment')}>Click</button>
      <button onClick={() => addNotification()}>Notification</button> */}
    </Layout>
  );
}
