import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import "./App.css";
import { Button, Card, Elevation } from "@blueprintjs/core";

function Box() {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry"></boxBufferGeometry>
      <meshLambertMaterial attach="material" color="red" />
    </mesh>
  );
}
function App() {
  // @ts-ignore
  return (
    <div className="bp4-dark">
      <p>ThreeJS setup</p>
      <Card interactive={true} elevation={Elevation.TWO}>
        <h5>
          <a>Blueprint</a>
        </h5>
      </Card>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <Box />
      </Canvas>
    </div>
  );
}

export default App;
