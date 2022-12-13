const glsl = require("babel-plugin-glsl/macro");
const heightFragmentShader = glsl`
precision mediump float;

uniform sampler2D u_gradient;
uniform float u_boundsY;
uniform float u_colorOffset;
varying vec4 worldPos;
varying vec3 worldNormal;
varying float wave;
void main() {
    float h = smoothstep(-u_boundsY/2.0, u_boundsY/2.0, worldPos.y * u_colorOffset);

    vec4 color = texture2D(u_gradient, vec2(0.5, h));
    gl_FragColor = color-vec4(0.025,0.025,0.025,0);
}
`;
export default heightFragmentShader;
