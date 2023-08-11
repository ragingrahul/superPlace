import React, { ReactNode,useState,Dispatch, SetStateAction } from 'react';
type Props = {
  handleCellClick: (row: number, col: number) => void,
  gridColors:string[][],
  setCoordinates:Dispatch<SetStateAction<{x:number,y:number}>>
}
const Canvas = ({handleCellClick,gridColors,setCoordinates}:Props) => {
  const gridRows = 100;
  const gridCols = 200;

  const generateGridCells = () => {
    const cellSize = 4;
    const gridCells = [];

    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        const cellColor = gridColors[row][col];
        gridCells.push(
          <div
            key={`${row}-${col}`}
            className='cursor-pointer transition duration-300'
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              backgroundColor: cellColor,
            }}
            onClick={() => {
              setCoordinates({x:row,y:col})
              handleCellClick(row, col)
            }}
          ></div>
        );
      }
    }

    return gridCells;
  };

  return (
    <div className='flex items-center flex-col'>
      <div className='flex flex-wrap w-[800px]' >
        {generateGridCells()}
      </div>
    </div>
  );
};

export default Canvas;
