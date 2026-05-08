precision highp float;

uniform float uTime;
uniform vec2 uMouse;
varying vec2 vUv;

float hash(vec2 p) {
  p = fract(p * vec2(127.1, 311.7));
  p += dot(p, p + 19.19);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + 1.0), u.x), u.y);
}

void main() {
  vec2 uv = vUv;
  vec2 p = uv - uMouse;
  float d = length(p);
  float flow = noise(uv * 8.0 + uTime * 0.25) + noise(uv * 18.0 - uTime * 0.15) * 0.35;
  float glow = smoothstep(0.7, 0.0, d) * 0.5;
  vec3 color = mix(vec3(0.1, 0.75, 1.0), vec3(0.95, 0.15, 0.85), flow);
  color = mix(color, vec3(1.0, 0.48, 0.16), smoothstep(0.78, 1.0, flow) * 0.22);
  gl_FragColor = vec4(color * (0.35 + glow), 0.65);
}
