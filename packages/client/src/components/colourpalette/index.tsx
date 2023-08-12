import { Dispatch, SetStateAction } from "react";

type ColorOptions = {
  red: string;
  orange: string;
  yellow: string;
  green: string;
  blue: string;
  purple: string;
  white: string;
  black: string;
};
type Props={
  colorOptions:ColorOptions,
  coordinates:{x:number,y:number},
  setSelectedColor:Dispatch<SetStateAction<string>>,
  placePixel: (row: number, col: number) => void;
}

const ColorPalette = ({colorOptions,setSelectedColor,coordinates,placePixel}:Props) => {
  return (
    // <div className="relative inline-block text-lg group">
    <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 bg-white border-2 border-gray-900 rounded-lg">
      <p className="text-center mb-2 rounded-lg py-2 text-white border-2 border-black bg-red-600 hover:cursor-pointer hover:bg-red-500"
        onClick={()=>placePixel(coordinates.x,coordinates.y)}
      >
        {`Place (${coordinates.x+","+coordinates.y})`}
      </p>
      <nav>
        {
          Object.entries(colorOptions).map(([colorName, colorCode]) => (
            <button
              key={colorName}
              style={{ backgroundColor: colorCode }}
              onClick={() => setSelectedColor(colorCode)}
              className='w-16 h-12 border-black border-2 mx-1 hover:opacity-75 hover:cursor-pointer'
            >
            </button>
          ))
        }
      </nav>
    </span>
    
    // </div>
  )
}

export default ColorPalette;