import SimplexNoise from "simplex-noise";
import { SimplexValues } from "./types";

export const getHeightValues = (
  array: number[],
  simplex: SimplexNoise,
  simplexValues: SimplexValues
) => {
  let offsetNoise = 1;
  let computedNoise = 0;

  let frequency = simplexValues.noiseScale / 100;
  let amplitude = 1;
  let weight = 1;
  for (let l = 0; l < simplexValues.octaves; l++) {
    let n = simplex.noise3D(
      (array[0] + offsetNoise) * frequency,
      (array[1] + offsetNoise) * frequency,
      (array[2] + offsetNoise) * frequency
    );
    let v = 1 - Math.abs(n);
    v = v * v * weight;
    weight = Math.max(Math.min(v * simplexValues.weightMultiplier, 1), 0);
    computedNoise += v * amplitude;
    amplitude *= simplexValues.persistencePerOctave;
    frequency *= simplexValues.detailPerOctave;
  }

  return (
    -(array[1] + simplexValues.floorOffset) +
    computedNoise * simplexValues.noiseWeight +
    (array[1] % simplexValues.terracingLevel)
  );
};
export const setHeightValues = (
  maxArray: number[],
  sampleSize: number,
  simplex: SimplexNoise,
  simplexValues: SimplexValues,
  setField: Function
) => {
  for (let i = -maxArray[0]; i < maxArray[0] + 1; i++) {
    let x = i * sampleSize;
    for (let j = -maxArray[1]; j < maxArray[1] + 1; j++) {
      let y = j * sampleSize;
      for (let k = -maxArray[2]; k < maxArray[2] + 1; k++) {
        let z = k * sampleSize;
        let computedHeight = getHeightValues([x, y, z], simplex, simplexValues);
        setField(
          [maxArray[0] * 2, maxArray[1] * 2, maxArray[2] * 2],
          i + maxArray[0],
          j + maxArray[1],
          k + maxArray[2],
          -computedHeight
        );
      }
    }
  }
};
