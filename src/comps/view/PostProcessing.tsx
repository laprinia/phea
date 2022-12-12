import React from "react";
import {
    EffectComposer,
    Bloom,
    Noise, DepthOfField, ToneMapping, TiltShift, BrightnessContrast,
} from "@react-three/postprocessing";

function PostProcessing() {
  return (
    <EffectComposer multisampling={0}>
        <TiltShift/>
        <ToneMapping/>
        <BrightnessContrast/>
        <DepthOfField
            focusDistance={0}
            focalLength={0.5}
            bokehScale={1}
            height={480}
        />
        <Bloom
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            height={300}
            intensity={0.1}
        />
        <Noise opacity={0.045} />
    </EffectComposer>
  );
}
export default PostProcessing;
