import {
  Bloom,
  BrightnessContrast,
  DepthOfField,
  HueSaturation,
  Noise,
} from "@react-three/postprocessing";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { Canvas, extend } from "react-three-fiber";
import { Effects } from "@react-three/drei";
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
extend({ GlitchPass, BloomPass });

function PostProcessing() {
  return (
    <Effects disableGamma>
      <BloomPass attachArray="passes" />
      <glitchPass attachArray="passes" />
    </Effects>
  );
}
export default PostProcessing;
