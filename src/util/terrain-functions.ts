import { ComputeHeightValues, GenerateHeightValues } from "./terrain-types";

export function generateHeight(
  hValues: GenerateHeightValues,
  cValues: ComputeHeightValues,
  setField: Function
) {
  for (let i = -hValues.maxArray[0]; i < hValues.maxArray[0] + 1; i++) {
    let x = i * hValues.sampleSize;
    for (let j = -hValues.maxArray[1]; j < hValues.maxArray[1] + 1; j++) {
      let y = j * hValues.sampleSize;
      for (let k = -hValues.maxArray[2]; k < hValues.maxArray[2] + 1; k++) {
        let z = k * hValues.sampleSize;
        setField(
          [2 * hValues.maxArray[0], 2 * hValues.maxArray[1]],
          i + hValues.maxArray[0],
          j + hValues.maxArray[1],
          k + hValues.maxArray[2],

          computeHeightValue(hValues.maxArray, cValues)
        );
      }
    }
  }
}
export function computeHeightValue(
  point: number[],
  heightValues: ComputeHeightValues
) {
  let offsetNoise = 1;
  let noise = 0;

  let frequency = heightValues.noiseScale / 100;
  let amplitude = 1;
  let weight = 1;
  for (let j = 0; j < heightValues.octaves; j++) {
    let n = heightValues.simplex.noise3D(
      (point[0] + offsetNoise) * frequency,
      (point[1] + offsetNoise) * frequency,
      (point[2] + offsetNoise) * frequency
    );
    let v = 1 - Math.abs(n);
    v = v * v * weight;
    weight = Math.max(Math.min(v * heightValues.weightMultiplier, 1), 0);
    noise += v * amplitude;
    amplitude *= heightValues.persistencePerOctave;
    frequency *= heightValues.detailPerOctave;
  }

  let finalVal =
    -(point[1] + heightValues.floorOffset) + noise * heightValues.noiseWeight;

  return -finalVal;
}
