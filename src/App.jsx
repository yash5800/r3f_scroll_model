import { useState, useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; 
import Scene from "./components/Scene";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef(null);
  const sceneRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    gsap.timeline({
      scrollTrigger:{
        trigger: mainRef.current,
        start:"top top",
        end:"bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          setProgress(self.progress);
        }
      }
    })
    .set(sceneRef.current, { x: 0, y: 0 })
    .to(sceneRef.current,{
      ease: "none",
      x:'-25vw',
      y:'100vh'
    })
    .to(sceneRef.current,{
      ease: "none",
      x:'25vw',
      y:'200vh'
    })
    .to(sceneRef.current,{
      ease: "none",
      x:'-25vw',
      y:'300vh'
    })
  },[])

  return (
    <main ref={mainRef} className="overflow-x-hidden">
        <section className="relative grid place-items-center h-[100vh]">
          <p className="text-white text-center absolute top-[5%] mx-4 w-fit text-8xl font-bold">
            Apple Watch
          </p>
          <p className="text-white text-center absolute bottom-[5%] mx-4 w-fit text-8xl font-bold">
            Ultra 2
          </p>

          <div ref={sceneRef}  className="h-[100vh] w-[100vw] text-white ">
             <Canvas>
               <Scene progress={progress} />
             </Canvas>
          </div>
        </section>

        <section className=" relative flex items-center justify-evenly h-[100vh]">
          <p className="w-[50%] border-0 border-red-700"></p>

          <p className="text-white w-[50%] text-center px-4 text-4xl font-semibold">
            Effortlessly scroll, zoom, and navigate with the re-engineered
            Digital Crown, now more precise than ever.
          </p>
        </section>

        <section className=" relative flex items-center justify-evenly h-[100vh]">
          <p className="text-white order-1 w-[50%] text-center px-4 text-4xl font-semibold">
            Built for adventure, the rugged straps are as tough as you are,
            ready for any challenge.
          </p>
          <p className="w-[50%] order-2"></p>
        </section>

        <section className=" relative flex items-center justify-evenly h-[100vh]">
          <p className="w-[50%] border-0 border-red-700"></p>

          <p className="text-white w-[50%] text-center px-4 text-4xl font-semibold">
            The brightest display ever on an Apple Watch, so you can see it
            clearly even under the harshest sun.
          </p>
        </section>
    </main>
  );
}

export default App;