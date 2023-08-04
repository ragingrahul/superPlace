"use client"

import Image from 'next/image'
import { useEffect, useRef } from 'react'

export default function Home() {
  const canvas=useRef(null)
  const context=useRef(null)

  const colour=()=>{
    context.current=canvas.current.getContext('2d')
    for(var i=0;i<100;i++){
      for(var j=0;j<100;j++){
        if(i<100 && j<50){
          context.current.fillStyle="red";
          context.current.fillRect(i,j,1,1)
        }else{
          context.current.fillStyle="blue";
          context.current.fillRect(i,j,1,1)
        }
      }
    }
  }

  useEffect(()=>{
    canvas.current=document.getElementById('canvas')
  })
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Hello
      <button onClick={colour}>
        Colour
      </button>
      <canvas width='100' height='100' id='canvas'></canvas>
    </main>
  )
}
