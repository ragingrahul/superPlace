import { useAccount } from 'wagmi';

import Layout from '@/components/layout/Layout';

import { toast } from "react-toastify";
import WorldID from '@/components/worldcoin';

export default function HomePage() {
  const { address } = useAccount();
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
      <div className='flex-col'>
        <WorldID />

        <button onClick={() => addNotification()}>Test Toast</button>
      </div>
    </Layout>
  );
}
