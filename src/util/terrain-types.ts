import SimplexNoise from "simplex-noise";

export type TerrainData = {
  width: number;
  height: number;
  depth: number;
  sampleSize: number;
};
export type GenerateHeightValues = {
  sampleSize: number;
  maxArray: number[];
};
export type ComputeHeightValues = {
  noiseScale: number;
  octaves: number;
  simplex: SimplexNoise;
  weightMultiplier: number;
  persistencePerOctave: number;
  detailPerOctave: number;
  floorOffset: number;
  noiseWeight: number;
};
