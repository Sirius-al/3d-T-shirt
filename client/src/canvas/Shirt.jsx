import React from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Decal, useTexture } from "@react-three/drei";

import { state } from "../store";
import { useSnapshot } from "valtio";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_baked.glb");

  console.log(nodes);
  console.log("\n");
  console.log(materials);

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) => {
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
  })

  const stateStr = JSON.stringify(state);

  return (
    <group
      key={stateStr}
    >
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        {snap.isLogoTexture &&
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            mapAnisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
          /* 
              The `position` prop specifies the position of the decal in 3D space.
              In this case, we want to place the logo on the shirt, so we set it to a
              location on the shirt's front, slightly above the base of the neck.
          */

          /* 
              The `rotation` prop specifies the rotation of the decal in 3D space.
              In this case, we don't want to rotate the logo, so we set it to [0, 0, 0],
              which means no rotation at all.
            */

          /* 
              The `scale` prop specifies the scale of the decal in 3D space.
              In this case, we want the logo to be small, so we set it to 0.15, which
              is 15% of its original size.
            */

          /*
              The `map` prop specifies the texture that the decal should use.
              In this case, we set it to `logoTexture`, which is a texture that we
              loaded from the user's uploaded image.
            */

          /*
              The `map-anisotropy` prop specifies the level of anisotropic filtering
              that should be applied to the decal's texture. Anisotropic filtering is
              a technique that is used to improve the quality of textures when they
              are viewed from oblique angles.

              We set it to 16, which is a common value that provides good results
              for most images.
            */

          /*
              The `depthTest` prop specifies whether the decal should be rendered
              based on its depth in 3D space. In this case, we want to render the logo
              on top of the shirt, so we disable depth testing.
            */

          /*
              The `depthWrite` prop specifies whether the decal should write to
              the depth buffer. In this case, we want the logo to be visible even if
              it is behind the shirt, so we enable depth writing.

              Disabling depth writing prevents the logo from being occluded by the
              shirt.
            */
        }
        {snap.isFullTexture &&
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />}
      </mesh>
    </group>
  );
};

export default Shirt;
