precision highp float;

uniform float uTime;
uniform float uProgress;
uniform vec2 uResolution;
uniform vec2 uMouse;

varying vec2 vUv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  mat2 rot = mat2(0.78, -0.62, 0.62, 0.78);

  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p = rot * p * 2.03 + 13.17;
    amplitude *= 0.5;
  }

  return value;
}

vec3 palette(float t) {
  vec3 cyan = vec3(0.16, 0.88, 1.0);
  vec3 blue = vec3(0.12, 0.32, 1.0);
  vec3 violet = vec3(0.54, 0.20, 1.0);
  vec3 magenta = vec3(1.0, 0.18, 0.74);
  vec3 orange = vec3(1.0, 0.48, 0.18);

  vec3 a = mix(cyan, blue, smoothstep(0.0, 0.32, t));
  vec3 b = mix(violet, magenta, smoothstep(0.24, 0.72, t));
  vec3 c = mix(a, b, smoothstep(0.18, 0.82, sin(t * 6.2831) * 0.5 + 0.5));
  return mix(c, orange, smoothstep(0.82, 1.0, t) * 0.42);
}

float plasmaField(vec2 uv, float channelOffset) {
  vec2 p = uv;
  float t = uTime * 0.13 + channelOffset;

  float radius = length(p);
  float angle = atan(p.y, p.x);
  float vortex = 1.0 / max(radius, 0.12);

  angle += vortex * 0.42 + t * 0.85;
  p = vec2(cos(angle), sin(angle)) * radius;

  vec2 warpA = vec2(
    fbm(p * 2.35 + vec2(t * 0.8, -t * 0.24)),
    fbm(p * 2.15 + vec2(-t * 0.28, t * 0.76))
  );

  vec2 warpB = vec2(
    fbm(p * 4.6 + warpA * 1.7 - t),
    fbm(p * 4.2 - warpA * 1.4 + t * 0.7)
  );

  p += (warpA - 0.5) * 0.28 + (warpB - 0.5) * 0.12;

  float fluid = fbm(p * 5.8 + warpB * 2.4 + t);
  float filament = sin(angle * 7.0 + fluid * 7.5 + t * 4.0) * 0.5 + 0.5;
  return mix(fluid, filament, 0.34);
}

void main() {
  vec2 uv = vUv * 2.0 - 1.0;
  uv.x *= uResolution.x / max(uResolution.y, 1.0);

  vec2 mouse = (uMouse - 0.5) * vec2(0.08, -0.08);
  uv += mouse;

  float radius = length(uv);
  float angle = atan(uv.y, uv.x);
  float time = uTime * 0.22;

  float lens = smoothstep(1.08, 0.0, radius);
  vec2 refracted = uv;
  refracted += normalize(uv + 0.0001) * sin(radius * 18.0 - time * 4.0) * 0.018 * lens;
  refracted = mat2(cos(time * 0.08), -sin(time * 0.08), sin(time * 0.08), cos(time * 0.08)) * refracted;

  float chroma = 0.012 + 0.012 * smoothstep(0.24, 0.56, radius);
  float rField = plasmaField(refracted + normalize(refracted + 0.001) * chroma, 0.03);
  float gField = plasmaField(refracted, 0.0);
  float bField = plasmaField(refracted - normalize(refracted + 0.001) * chroma, -0.03);
  float field = (rField + gField + bField) / 3.0;

  float ringCore = smoothstep(0.28, 0.43, radius) * smoothstep(0.88, 0.48, radius);
  float ringGlow = exp(-pow((radius - 0.44) * 4.1, 2.0));
  float outerBloom = exp(-pow((radius - 0.62) * 2.5, 2.0)) * 0.38;
  float innerFeather = smoothstep(0.24, 0.39, radius);
  float voidMask = smoothstep(0.42, 0.27, radius);

  vec3 plasma = vec3(rField, gField, bField);
  plasma *= palette(fract(field + angle * 0.085 + time * 0.12));
  plasma += palette(fract(angle / 6.2831 + field * 0.55 + time * 0.09)) * ringGlow * 0.86;
  plasma += vec3(0.9, 0.98, 1.0) * pow(ringGlow, 4.0) * 0.36;
  plasma += vec3(0.14, 0.38, 1.0) * outerBloom;
  plasma *= ringCore + outerBloom + 0.04;
  plasma *= innerFeather;

  float accretion = smoothstep(0.0, 0.9, sin(angle * 2.0 + time * 2.5 + field * 5.0) * 0.5 + 0.5);
  plasma += palette(fract(field + 0.25)) * accretion * ringCore * 0.26;

  vec3 voidColor = vec3(0.0);
  vec3 color = mix(plasma, voidColor, voidMask);

  float vignette = smoothstep(1.56, 0.22, radius);
  color *= vignette;

  float grain = hash(vUv * uResolution.xy + uTime * 32.0) - 0.5;
  color += grain * 0.026;

  float intro = smoothstep(0.0, 0.16, uProgress);
  color *= intro * 0.78;

  gl_FragColor = vec4(color, 1.0);
}
