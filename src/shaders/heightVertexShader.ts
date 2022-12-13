const glsl = require("babel-plugin-glsl/macro");
const heightVertexShader = glsl`
precision mediump float;

varying vec4 worldPos;
varying vec3 worldNormal;
varying float wave;
uniform float u_time;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d.glsl);

void main() {
worldPos =  vec4(position, 1.0);
float noiseFreq = 0.004;
float noiseAmp = 0.7;
vec3 noisePos = vec3(worldPos.x * noiseFreq + u_time/100.0, worldPos.y,worldPos.z* noiseFreq + u_time);
wave = worldPos.y;
worldPos.y += snoise3(noisePos) * noiseAmp ;

worldNormal = normal;
gl_Position = projectionMatrix * modelViewMatrix * worldPos;
}`;

export default heightVertexShader;
