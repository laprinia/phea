const heightVertexShader = `
varying vec4 worldPos;
varying vec3 worldNormal;
void main() {
worldPos =  vec4(position, 1.0);
worldNormal = normal;
gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

export default heightVertexShader;
