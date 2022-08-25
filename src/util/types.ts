export type TerrainData = {
  width: number;
  height: number;
  depth: number;
  sampleSize: number;
};

export type SimplexValues = {
  noiseScale: number;
  octaves: number;
  weightMultiplier: number;
  persistencePerOctave: number;
  detailPerOctave: number;
  floorOffset: number;
  noiseWeight: number;
};
export type MarchingResult = {
  terrainVertices: Float32Array;
  counterIndex: number;
};
