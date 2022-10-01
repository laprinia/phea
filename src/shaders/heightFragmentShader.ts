const heightFragmentShader = `
uniform sampler2D u_gradient;
uniform float u_yMin;
uniform float u_yMax;
varying vec4 vPos;
void main() {
    float v = vPos.y-u_yMin/u_yMax-u_yMin;
    vec3 color = texture2D(u_gradient, vec2(0, v)).rgb;
    gl_FragColor = vec4(vPos.y,1);
}
`;
export default heightFragmentShader;
