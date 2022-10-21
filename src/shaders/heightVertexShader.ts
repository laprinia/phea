const glsl = require("babel-plugin-glsl/macro");
const heightVertexShader = glsl`
varying vec4 worldPos;
varying vec3 worldNormal;
varying float vWave;
uniform float u_time;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d.glsl);

void main() {
worldPos =  vec4(position, 1.0);
float noiseFreq = 2.0;
float noiseAmp = 0.4;
vec3 noisePos = vec3(worldPos.x ,worldPos.y,worldPos.z* noiseFreq + u_time);
worldPos.y +=snoise3(noisePos) * noiseAmp;
vWave= worldPos.y;
worldNormal = normal;
gl_Position = projectionMatrix * modelViewMatrix * worldPos;
}`;

export default heightVertexShader;
