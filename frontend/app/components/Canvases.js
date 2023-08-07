"use client"

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

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

export default function Home() {
    const canvas = useRef(null)
    const context = useRef(null)
    const activePixel=useRef(null);
    const [scale,setScale]=useState(16)
    const [clicked,setClicked]=useState({x:0,y:0})

    const colour = () => {
        context.current = canvas.current.getContext('2d')
        for (var i = 0; i < 200; i++) {
            for (var j = 0; j < 200; j++) {
                if (i < 200 && j < 100) {
                    context.current.fillStyle = "red";
                    context.current.fillRect(i, j, 1, 1)
                } else {
                    context.current.fillStyle = "blue";
                    context.current.fillRect(i, j, 1, 1)
                }
            }
        }
    }

    const cancasClicked = (e) => {
        let clickedX =Math.floor(e.pageX/scale);
        let clickedY =Math.floor(e.pageY/scale);
        setClicked(
            {
                x: clickedX,
                y: clickedY
            }
        )

        activePixel.value = `${clickedX}:${clickedY}`
        console.log(activePixel)
    }

    const changePixel =(color)=>{
        
    }

    useEffect(() => {
        canvas.current = document.getElementById('canvas')
        colour()
    })
    return (
        <main className="">
            {/* <button onClick={colour}>
                Colour
            </button> */}
            <canvas width='200' height='200' id='canvas' onClick={cancasClicked}></canvas>
            {clicked.x && <div style={{top : `${clicked.y*scale}px`,left: `${clicked.x*scale}px`, position: `absolute`,"z-index": `99`, border: `1px solid #000`, width : `14px`,height: `14px`,"box-shadow": `0 0 8px 4px #fff`}}></div>}
            {clicked.x && 
                <div>
                    <p>Last changed by:<strong>{{activePixelENS}}</strong></p>
                    <nav>
                        {
                            Object.entries(colorOptions).map(([colorName,colorCode])=>(
                                <button
                                    key={colorName}
                                    style={{ backgroundColor: colorCode }}
                                    onClick={changePixel(colorCode)}
                                >

                                </button>
                            ))
                        }
                    </nav>
                </div>
            }
        </main>
    )
}