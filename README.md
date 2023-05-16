## 🧊🛤️ phea

React 3D terrain generation using R3F --written in TypeScript.


### 👩‍🍳Frontend Recipe:
  * react three fiber, a React renderer for three.js
  * drei addons for react three fiber
  * glsl-noise, for Simplex nois
  * Mantine for UI components
 
### 🗝️Key Feats:

  * <h3>🧊Marching cubes algorithm implementation</h3> which divides a volume in 3D space into cubes to approximate what faces (if any) should be rendered into a mesh. The algorithm utilizes voxels to determine the density of a particular volume. This is interpreted as whether or not that point is part of the surface of the generated terrain. There exist 2^8 triangle configurations:

![MarchingCubesConfigs](https://github.com/laprinia/phea/assets/51471463/6a201b2c-1abd-4932-9b4e-4837565c6ede)

* <h3>📼Simplex Noise</h3> which has a lower computational complexity and requires fewer multiplications as oposed to . While marching cube renders predefined data using the triangulation table and the edge table, <strong>a 3D noise function is responsible for randomizing the height values for the terrain</strong>.
 > noiseScale, octaves, weightMultiplier, persistencePerOctave, detailPerOctave, noiseWeight are adjustable params for our Simplex noise.

* <h3>🏔️Terracing</h3> happens after computing our random height. The function returns the height clamped on levels, where the height difference between those levels is given by the <strong>terracingLevel</strong>.

```js
-(array[1] + simplexValues.floorOffset) + computedNoise * simplexValues.noiseWeight + (array[1] % simplexValues.terracingLevel)
// where array[1] is the current y-axis value, computedNoise is the random y-axis value
```
After terracing, our terrain looks something like this:

![image](https://github.com/laprinia/phea/assets/51471463/768767e8-9909-4381-beaa-f6cf9d543175)

* <h3>🌈Color Height Map</h3> A .png holds a color gradient which is used to color each fragment in the fragment shader!
![gradient](https://github.com/laprinia/phea/assets/51471463/6f8294ae-7fa9-4acc-93e5-d1ebf824c8c6)

```glsl
uniform sampler2D u_gradient;
vec4 color = texture2D(u_gradient, vec2(0.5, h));
```
* <h3>🍄Visual Smoothing</h3> Because the generated terrain is low-poly, and using more samples to generate a high-poly terrain is very costly, I removed the world normal vector from the Fragment shader height calculation:
```js
    float h = smoothstep(-u_boundsY/2.0, u_boundsY/2.0, worldPos.y * u_colorOffset)
```
The result:

![image](https://github.com/laprinia/phea/assets/51471463/16797a42-1a13-4f62-ba43-6acf0fde1eff)

Another way is to use the [Catmull-Clark algorithm](https://en.wikipedia.org/wiki/Catmull%E2%80%93Clark_subdivision_surface), by using the node package [gl-catmull-clark](https://www.npmjs.com/package/gl-catmull-clark).

* <h3>✨Post Processing</h3> is done using r3f's own postprocessing wrapper. 
```js
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
```
<img width="890" alt="image" src="https://github.com/laprinia/phea/assets/51471463/30b1f3a9-1fdc-4e04-94d1-583ff44a6b85">

* <h3>🏊Floating Effect & Mesh Rotation </h3> is done using the same height vertex shader. We vary the y height again by the given elapsed time. The position of the disturbance is computed by how frequent the noise is.
```js
worldPos =  vec4(position, 1.0);
float noiseFreq = 0.004;
float noiseAmp = 0.7;
vec3 noisePos = vec3(worldPos.x * noiseFreq + u_time/100.0, worldPos.y,worldPos.z* noiseFreq + u_time);
wave = worldPos.y;
worldPos.y += snoise3(noisePos) * noiseAmp;
```
Using the <strong>useFrame()</strong> hook, each frame the mesh is rotated on the y-axis:
```js
terrainRef.current.rotation.y = clock.getElapsedTime() * rotationSpeed;
```
* <h3>🎛️The UI</h3> acts as a way to control the gradient, marching cube algo and simplex noise params as well as regeneration of the whole mesh.

https://github.com/laprinia/phea/assets/51471463/92ed5dc3-ca0d-4b2a-a935-a06492b0195d

### 📸More screenshots:
<img width="908" alt="Screenshot 2023-05-16 at 14 05 29" src="https://github.com/laprinia/phea/assets/51471463/52f124c9-875e-46cd-a577-39a5319e933a">
<img width="890" alt="Screenshot 2023-05-16 at 14 04 39" src="https://github.com/laprinia/phea/assets/51471463/007089a5-f0af-45b7-9837-ef26922c6d77">
<img width="902" alt="Screenshot 2023-05-16 at 14 05 16" src="https://github.com/laprinia/phea/assets/51471463/f052df5c-df7a-495e-8674-43fdb827bc5e">


### 🏞️Final result:

<img width="1285" alt="Screenshot 2023-05-16 at 14 07 46" src="https://github.com/laprinia/phea/assets/51471463/3dcf1d3f-d06a-4a87-8863-0ed712024dee">

https://github.com/laprinia/phea/assets/51471463/b9a00314-ad16-44e9-b378-bb452cd1cff0





