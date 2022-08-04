import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";

function Box() {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry"></boxBufferGeometry>
      <meshLambertMaterial attach="material" color="white" />
    </mesh>
  );
}

function Viewport() {
  return (
    <Canvas style={{ background: "#4d4c4c" }}>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <Box />
    </Canvas>
  );
}
export default Viewport;
