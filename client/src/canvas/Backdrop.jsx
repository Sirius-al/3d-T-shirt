import React, { useRef } from "react";
import { easing } from "maath";
import { useFrame } from '@react-three/fiber';
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";


const Backdrop = () => {
  return (
    <AccumulativeShadows
      position={[0, 0, -0.14]}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      // castShadow
      // mapSize={1024}
      // fallback={null}
    >
      <RandomizedLight 
        amount={4}
        radius={9}
        intensity={1}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight 
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;
