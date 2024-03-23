import React, { useRef, useState } from "react";
import { useSnapshot } from "valtio";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";

import { state } from "../store";
import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";
import Shirt from "./Shirt";
import { fadeAnimation } from "../config/motion";

const CanvasModel = () => {
  const meshRef = useRef();
  const snap = useSnapshot(state);
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <>
      {!snap.intro && (
        <div className="" >
          <AnimatePresence >
            <motion.div
              key={Date.now() + 2}
              style={{width: '100vw', height: '90vh'}}
              {...fadeAnimation}
            >
              <Canvas 
              shadows 
              camera={{ position: [0, 0, 5], fov: 30 }}
              gl={{ preserveDrawingBuffer: true }}
              className="w-full h-full max-w-full transition-all ease-in"
              >
                {/* <meshStandardMaterial color="hotpink" /> */}
                <ambientLight intensity={1} />
                <Environment preset={"city"} />

                <CameraRig>
                <Backdrop />
                <Center>
                  <Shirt />
                </Center>
                </CameraRig>
              </Canvas>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default CanvasModel;
