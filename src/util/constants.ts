import { SimplexValues, TerrainData } from "./types";

export const ISO_LEVEL = 0;

export const DEFAULT_GRADIENT = [
  "#6fa4f5",
  "#a0b0bc",
  "#2d5870",
  "#3e4d4c",
  "#182b23",
  "#0f1c17",
  "#14241f",
];
//position of each gradient color, from the terrain's peaks (0) to its floor (1)
export const GRADIENT_STOPS = [0.06, 0.14, 0.33, 0.5, 0.68, 0.76, 0.87];

export const DEFAULT_TERRAIN: TerrainData = {
  width: 100,
  height: 100,
  depth: 100,
  sampleSize: 1,
};

export const DEFAULT_ROTATION_SPEED = 3;
//radians per second for each unit on the rotation speed slider
export const ROTATION_SPEED_SCALE = 0.2 / 3;

export const DEFAULT_SIMPLEX: SimplexValues = {
  noiseScale: 0.94,
  octaves: 6,
  weightMultiplier: 1.8,
  persistencePerOctave: 0.5,
  detailPerOctave: 2,
  floorOffset: 3.92,
  noiseWeight: 9.1,
  terracingLevel: 2,
};
