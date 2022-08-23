import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import GeneratedTerrain from "../meshes/GeneratedTerrain";

function Viewport() {
  return (
    <Canvas style={{ background: "#4d4c4c" }}>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight />
      <GeneratedTerrain
        terrainData={{ width: 0, height: 0, depth: 0, sampleSize: 0 }}
      />
    </Canvas>
  );
}
export default Viewport;
