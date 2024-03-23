import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";

import {state} from "../store";


const cameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);

  useFrame((state, delta) => {  
  // console.log(" USE-FRAME 💲💲💲💲💲💲💲💲💲💲💲💲💲💲💲💲💲💲💲 => ", state, delta)
  const isBreakPoint = window.innerWidth <=  1260;
  const isMobile = window.innerWidth <= 600;

    let targetPosition = [-0.4, 0, 2];

    if (snap.intro) {
      if (isBreakPoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }

    easing.damp3(state.camera.position, targetPosition, 0.25, delta)

  // Damped spring physics to move camera rig based on pointer X position.
  // The rig will move 2.5 times slower than the pointer X movement.
  // The movement is also slightly delayed compared to the pointer movement.
  easing.dampE(
    group.current.position,
    [
      state.pointer.x / 10, // Spring will move towards this value, Pointer X position is the target value
      -state.pointer.x / 10, // Negative value to simulate a delay in the movement, Target value of the delayed movement
      0
    ],
    0.28, // Spring constant (how much the spring resists movement)
    delta // Delta time (amount of time that has passed since last frame)
  )

  })

  return (
    <group ref={group}>
      {children}
    </group>
  );
};

export default cameraRig;
