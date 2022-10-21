const glsl = require("babel-plugin-glsl/macro");
const heightFragmentShader = glsl`
uniform sampler2D u_gradient;
uniform float u_boundsY;
uniform float u_colorOffset;
varying vec4 worldPos;
varying vec3 worldNormal;
varying float vWave;
void main() {
    float wave = vWave * 0.2;
    float h = smoothstep(-u_boundsY/2.0, u_boundsY/2.0, worldPos.y + worldNormal.y * u_colorOffset);

    vec4 color = texture2D(u_gradient, vec2(0.5, h));
    gl_FragColor = color;
}
`;
export default heightFragmentShader;
