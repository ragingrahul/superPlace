import { useState } from 'react';
import Canvas from '../canvas';
import WorldID from '../worldcoin';
import { usePrepareContractWrite } from 'wagmi';
import { useContractWrite } from 'wagmi';
import { useAccount } from 'wagmi';
import { BigNumber } from 'ethers'
import { decode } from '@/lib/wld'
import { ISuccessResult } from '@worldcoin/idkit';

import superPlaceAddress from '../../../../contract/contract-address.json'
import superPlaceAbi from '../../../../contract/artifacts/contracts/SuperPlace.sol/SuperPlace.json'

const DraggableBox = () => {
  const { address } = useAccount()

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [proof, setProof] = useState<ISuccessResult | null>(null)

  const { config } = usePrepareContractWrite({
		address: superPlaceAddress.address as `0x${string}`,
		abi: superPlaceAbi.abi,
		enabled: proof != null && address != null,
		functionName: 'place',
		args: [{
			signal: address!,
			root: proof?.merkle_root ? decode<BigNumber>('uint256', proof?.merkle_root ?? '') : BigNumber.from(0) as any,
			nullifierHash: proof?.nullifier_hash ? decode<BigNumber>('uint256', proof?.nullifier_hash ?? '') : BigNumber.from(0),
			proof: proof?.proof
				? decode<[BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber]>(
						'uint256[8]',
						proof?.proof ?? ''
				  )
				: [
						BigNumber.from(0),
						BigNumber.from(0),
						BigNumber.from(0),
						BigNumber.from(0),
						BigNumber.from(0),
						BigNumber.from(0),
						BigNumber.from(0),
						BigNumber.from(0),
				  ],
          x: 1, //x
          y: 1, //y
          color: 1  //color
    }] as any,
	})

	const { write } = useContractWrite(config)

  const handleMouseDown = (e:any) => {
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e:any) => {
      setPosition({
        x: e.clientX - startX,
        y: e.clientY - startY,
      });
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleWheel = (e:any) => {
    e.preventDefault();
    const newScale = Math.max(0.1, Math.min(scale + e.deltaY * -0.001, 3));
    setScale(newScale);
  };

  return (
    <div>
      <div
        className="relative"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        }}
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
      >
        <Canvas />
      </div>
      <div className='z-50 flex items-center justify-center h-36'>
        {
          proof ?
          <div><button onClick={write}>sent tx</button></div>
          : <WorldID onSuccess={setProof}/>
        }
      </div>
    </div>
  );
};

export default DraggableBox;
