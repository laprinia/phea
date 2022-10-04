const heightFragmentShader = `
uniform sampler2D u_gradient;
uniform float u_boundsY;
uniform float u_colorOffset;
varying vec4 worldPos;
varying vec3 worldNormal;
void main() {
    float h = smoothstep(-u_boundsY/2.0, u_boundsY/2.0, worldPos.y + worldNormal.y * u_colorOffset);
    vec4 color = texture2D(u_gradient, vec2(0.5, h));
    gl_FragColor = color;
}
`;
export default heightFragmentShader;