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

import superPlaceAddress from '../../../../contract/opgoerli-receiver-address.json'
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

  const placePixel = (row: number, col: number) => {
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
        <Canvas gridColors={gridColors} setCoordinates={setCoordinates} placePixel={placePixel}/>
      </div>
      <div className='z-50 flex items-center justify-center h-36'>
        {
           proof ?
          <div>
            <div><ColorPalette colorOptions={colorOptions} coordinates={coordinates} placePixel={placePixel} setSelectedColor={setSelectedColor}/></div>
            <div onClick={()=>console.log(proof,decode<[BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber]>(
						'uint256[8]',
						proof?.proof ?? ''
				  ))}>Here</div>
            {/* <div><button onClick={write}>sent tx</button></div> */}
          </div>
           : <WorldID onSuccess={setProof}/>
        }
      </div>
    </div>
  );
};

export default DraggableBox;

//[{"signal":0x2160D41c9D711Ca3fA7777211148538eeb431970,"root":0x29fbbf8dddda6b937a7441fd38dcbab2323f97b496bd85e5c8edda5ca9cbe696,"nullifierHash":0x11d1b2016f3a8f1fe8fecd01b0f88eda06547cd7a25a853a21bdbd3e744f4827,"proof":[0x1c3cb3fb58d529b85c54a15f06cb8782711b37c964a98806a43d975a47aeb46a,0x1ef34b860a98a92d11d12fbd6e2b5dcbde601cc29dcbd1fdd5bb966505803ccf,0x080d9a326648bb59830335887861571c90ed61618b8270154da9b74d32621119,0x1ad859011d5523661bc1b2cec3336c3497f40f56167b8a1ea0025f5e75e8600f,0x1c325f65167d1a7a551645a1dcaee4a3b8eb3b519710e913e5034dfd310614a9,0x1ef47a815d120b3988d1fbe460645fdb36894f32d6d37f2d8b7b7aa6f0f2463a,0x0a0576a233fb01a4b36973e3ad84a330052518012cdb32b5eb9b4855141b4445,0x233489c9053ba07c04f707266533d22947b3f3f0efb83281117de10c090a3dba],"x":50,"y":50,"color":"#0000FF"}]
//["0x2160D41c9D711Ca3fA7777211148538eeb431970",0x29fbbf8dddda6b937a7441fd38dcbab2323f97b496bd85e5c8edda5ca9cbe696,0x11d1b2016f3a8f1fe8fecd01b0f88eda06547cd7a25a853a21bdbd3e744f4827,[0x1c3cb3fb58d529b85c54a15f06cb8782711b37c964a98806a43d975a47aeb46a,0x1ef34b860a98a92d11d12fbd6e2b5dcbde601cc29dcbd1fdd5bb966505803ccf,0x080d9a326648bb59830335887861571c90ed61618b8270154da9b74d32621119,0x1ad859011d5523661bc1b2cec3336c3497f40f56167b8a1ea0025f5e75e8600f,0x1c325f65167d1a7a551645a1dcaee4a3b8eb3b519710e913e5034dfd310614a9,0x1ef47a815d120b3988d1fbe460645fdb36894f32d6d37f2d8b7b7aa6f0f2463a,0x0a0576a233fb01a4b36973e3ad84a330052518012cdb32b5eb9b4855141b4445,0x233489c9053ba07c04f707266533d22947b3f3f0efb83281117de10c090a3dba],50,50,"#0000FF"]

// WORLD_ID=0x515f06B36E6D3b707eAecBdeD18d8B384944c87f
// APP_ID=app_staging_f9f6947352fe2f25b2a7b800845dcf57
// ACTION_ID=draw