import { OrbitControls } from "@react-three/drei";
import React from "react";
import { Canvas } from "@react-three/fiber";

function Box() {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry"></boxBufferGeometry>
      <meshLambertMaterial attach="material" color="red" />
    </mesh>
  );
}

function Viewport() {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <Box />
    </Canvas>
  );
}
export default Viewport;
