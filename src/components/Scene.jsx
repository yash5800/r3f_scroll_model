import React, { useEffect, useRef } from 'react'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; 
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Watch } from './Watch';
import { useFrame } from '@react-three/fiber';

gsap.registerPlugin(ScrollTrigger);

const Scene = ({progress}) => {
  const poss = useRef(null)
  useFrame(() => {
    poss.current.lookAt(0,0,0)
  })

  useEffect(() => {
     const updateCam = ()=>{
        const positions = [
        [2,3,5],
        [5,1.7,4.9],
        [2.27,0.65,-5.29],
        [0,3,5.82]
        ]

       if(progress >=1){
        gsap.to(poss.current.position,{
          x: 0,
          y: 3,
          z: 5.82,
          duration: 0.3,
        })       }
       else{
        
        const num_seg = 1/3;
        const index = Math.floor(progress/num_seg);

        const percengate = (progress%num_seg)/num_seg;
         
        const [startx, starty, startz] = positions[index]
        const [endx, endy, endz] = positions[index +1 ]
        const x = startx + (endx - startx) * percengate;
        const y = starty + (endy - starty) * percengate;
        const z = startz + (endz - startz) * percengate;

        gsap.to(poss.current.position,{
          x: x,
          y: y,
          z: z,
          duration: 0.3,
        })
       }
     }

     updateCam()
  },[progress])

  return (
    <>
      <PerspectiveCamera ref={poss} makeDefault 
      position={
        [2,3,5]
      } 
      fov={45} near={.1} far={10000} />
      <Environment preset='city' />
      <Watch />
    </>
  )
}

export default Scene