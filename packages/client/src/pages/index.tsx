import * as React from 'react';

import Layout from '@/components/layout/Layout';
import DraggableBox from '@/components/drag';

export default function HomePage() {
  return (
    <Layout>
      <div className="flex relative justify-center items-center remaining-height bg-gray-200">
        <DraggableBox />
      </div>
    </Layout>
  );
}
