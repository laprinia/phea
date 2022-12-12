import React from "react";
import {
    Bloom,
    BrightnessContrast,
    EffectComposer, Noise, TiltShift,
} from "@react-three/postprocessing";

function PostProcessing() {
  return (
    <EffectComposer multisampling={0}>
        <TiltShift focusArea={0.1} feather={0.2} opacity={0.5}/>
        <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            height={300}
            intensity={0.1}
        />
        <Noise opacity={0.04} />
        <BrightnessContrast  brightness={-0.1} contrast={0.1}/>
    </EffectComposer>
  );
}
export default PostProcessing;
