import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import * as THREE from "three";
import GeneratedTerrain from "../meshes/GeneratedTerrain";
import PostProcessing from "./PostProcessing";

function Viewport() {
  return (
    <Canvas
      style={{ background: "#515151" }}
      gl={{ antialias: true }}
    >
      <PostProcessing />
      <PerspectiveCamera makeDefault position={[70, 45, 25]} />
      <OrbitControls position={[15, 20, 20]} />
      <ambientLight intensity={0.2} position={[0, 45, 25]} />
      <directionalLight position={[0, 45, 25]} intensity={0.4} />
      <GeneratedTerrain
        terrainData={{ width: 100, height: 100, depth: 100, sampleSize: 1 }}
      />
    </Canvas>
  );
}
export default Viewport;
