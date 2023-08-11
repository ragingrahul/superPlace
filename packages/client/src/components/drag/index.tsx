import { useState } from 'react';
import Canvas from '../canvas';
import WorldID from '../worldcoin';
import ColorPalette from '../colourpalette';
import { usePrepareContractWrite } from 'wagmi';
import { useContractWrite } from 'wagmi';
import { useAccount } from 'wagmi';
import { BigNumber } from 'ethers'
import { decode } from '@/lib/wld'
import { ISuccessResult } from '@worldcoin/idkit';

import superPlaceAddress from '../../../../contract/contract-address.json'
import superPlaceAbi from '../../../../contract/artifacts/contracts/SuperPlace.sol/SuperPlace.json'

const colorOptions = {
  red: '#FF0000',
  orange: '#FFA500',
  yellow: '#FFFF00',
  green: '#00FF00',
  blue: '#0000FF',
  purple: '#800080',
  white: '#FFFFFF',
  black: '#000000'
}

const DraggableBox = () => {
  const { address } = useAccount()

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [proof, setProof] = useState<ISuccessResult | null>(null)
  const [selectedColor,setSelectedColor]=useState<string>("#FF0000")
  const [coordinates,setCoordinates]=useState<{x:number,y:number}>({x:0,y:0})
  const [gridColors, setGridColors] = useState<string[][]>(Array.from({ length: 100 }, () => new Array(200).fill('white')));

  const handleCellClick = (row: number, col: number) => {
    const updatedColors = [...gridColors];
    updatedColors[row][col] = selectedColor;
    setGridColors(updatedColors);
    console.log(row,col)
  };

  const { config } = usePrepareContractWrite({
		address: superPlaceAddress.address as `0x${string}`,
		abi: superPlaceAbi.abi,
		enabled: proof != null && address != null,
		functionName: 'draw',
		args: [
			address!,
			proof?.merkle_root ? decode<BigNumber>('uint256', proof?.merkle_root ?? '') : BigNumber.from(0) as any,
			proof?.nullifier_hash ? decode<BigNumber>('uint256', proof?.nullifier_hash ?? '') : BigNumber.from(0),
			proof?.proof
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
          1, //x
          1, //y
          1  //color
		],
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
        <Canvas gridColors={gridColors} handleCellClick={handleCellClick} setCoordinates={setCoordinates}/>
      </div>
      <div className='z-50 flex items-center justify-center h-36'>
        {
         proof ?
          <div><ColorPalette colorOptions={colorOptions} coordinates={coordinates} setSelectedColor={setSelectedColor}/></div>
          : <WorldID onSuccess={setProof}/>
        }
      </div>
    </div>
  );
};

export default DraggableBox;
