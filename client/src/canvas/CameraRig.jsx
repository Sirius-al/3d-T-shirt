import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";

import state from "../store";


const cameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);

  return (
    <group ref={group}>
      {children}
    </group>
  );
};

export default cameraRig;
