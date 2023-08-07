"use client"

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function Canvas() {
  const canvasRef = useRef(null)
  const activePixel=useRef(null)
  const context = useRef(null)
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 })
  const [clicked,setClicked]=useState({x:0,y:0})

  // const updateCanvasDimensions = () => {
  //   setCanvasDimensions({
  //     width: window.innerWidth,
  //     height: window.innerHeight,
  //   });
  // };
  const colour = () => {
    context.current = canvasRef.current.getContext('2d')
    for (var i = 0; i < 1000; i++) {
      for (var j = 0; j < 1000; j++) {
        if (i < 1000 && j < 500) {
          context.current.fillStyle = "red";
          context.current.fillRect(i, j, 1, 1)
        }else if(j>501){
          context.current.fillStyle = "green";
          context.current.fillRect(i, j, 1, 1)
        } 
        else {
          context.current.fillStyle = "blue";
          context.current.fillRect(i, j, 1, 1)
        }
      }
    }
    console.log("done")
  }

  useEffect(() => {
    canvasRef.current = document.getElementById('canvas')
    //colour()
  })
   // Update canvas dimensions when it changes
//    useEffect(() => {
//     const canvas = canvasRef.current;
//     canvas.width = canvasDimensions.width;
//     canvas.height = canvasDimensions.height;
// }, [canvasDimensions]);

// // Add event listener to update dimensions on window resize
// useEffect(() => {
//     updateCanvasDimensions(); // Initial sizing
//     window.addEventListener('resize', updateCanvasDimensions);
//     return () => {
//         window.removeEventListener('resize', updateCanvasDimensions);
//     };
// }, []);

const canvasClicked=(e)=>{
  let clickedX=e.pageX;
  let clickedY=e.pageX;
  setClicked(
    {
      x:clickedX,
      y:clickedY
    }
  )

  activePixel.value=`${clickedX}:${clickedY}`
  console.log(activePixel)
}

  return (
    <main className="flex w-full h-screen flex-col border-blue-950 border-2">
     

      <button onClick={colour}>
        Colour
      </button>
      <TransformWrapper
        initialScale={.1}
        minScale={.1}
        initialPositionX={0}
        initialPositionY={0}
        centerZoomedOut={true}
      >
        <TransformComponent>
          <div className='h-[1000px] w-[1000px]'>
            <canvas ref={canvasRef} id='canvas' onClick={canvasClicked} />
            {clicked.x && <div style={{top : `${clicked.y}px`,left: `${clicked.x}px`, position: `absolute`,"z-index": `99`, border: `1px solid #000`, width : `1px`,height: `1px`}}>{clicked.x}</div>}
          </div>
        </TransformComponent>
      </TransformWrapper>
    </main>
  )
}