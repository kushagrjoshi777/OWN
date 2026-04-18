'use client';

import React, { useEffect, useRef } from 'react';
import { Renderer, Geometry, Program, Mesh, Vec2 } from 'ogl';

/* ─────────────────────── SHADER DEFINITIONS ─────────────────────── */

const vertex = `#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
}`;

const fragment = `#version 300 es
precision highp float;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform float uTime;
uniform vec2 uResolution;
uniform float uPixelRatio;

uniform float uScale;
uniform float uRotation;
uniform vec4 uColor1;
uniform vec4 uColor2;
uniform vec4 uColor3;
uniform float uProportion;
uniform float uSoftness;
uniform float uShape;
uniform float uShapeScale;
uniform float uDistortion;
uniform float uSwirl;
uniform float uSwirlIterations;

out vec4 fragColor;

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

vec4 blend_colors(vec4 c1, vec4 c2, vec4 c3, float mixer, float edgesWidth, float edge_blur) {
    vec3 color1 = c1.rgb * c1.a;
    vec3 color2 = c2.rgb * c2.a;
    vec3 color3 = c3.rgb * c3.a;

    float r1 = smoothstep(.0 + .35 * edgesWidth, .7 - .35 * edgesWidth + .5 * edge_blur, mixer);
    float r2 = smoothstep(.3 + .35 * edgesWidth, 1. - .35 * edgesWidth + edge_blur, mixer);

    vec3 blended_color_2 = mix(color1, color2, r1);
    float blended_opacity_2 = mix(c1.a, c2.a, r1);

    vec3 c = mix(blended_color_2, color3, r2);
    float o = mix(blended_opacity_2, c3.a, r2);
    return vec4(c, o);
}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    
    float t = .5 * uTime;
    float noise_scale = .0005 + .006 * uScale;

    uv -= .5;
    uv *= (noise_scale * uResolution);
    uv = rotate(uv, uRotation * .5 * PI);
    uv /= uPixelRatio;
    uv += .5;

    float n1 = noise(uv * 1. + t);
    float n2 = noise(uv * 2. - t);
    float angle = n1 * TWO_PI;
    uv.x += 4. * uDistortion * n2 * cos(angle);
    uv.y += 4. * uDistortion * n2 * sin(angle);

    float iterations_number = ceil(clamp(uSwirlIterations, 1., 30.));
    for (float i = 1.; i <= iterations_number; i++) {
        uv.x += clamp(uSwirl, 0., 2.) / i * cos(t + i * 1.5 * uv.y);
        uv.y += clamp(uSwirl, 0., 2.) / i * cos(t + i * 1. * uv.x);
    }

    float proportion = clamp(uProportion, 0., 1.);
    float shape = 0.;
    float mixer = 0.;
    
    if (uShape < .5) {
      vec2 checks_shape_uv = uv * (.5 + 3.5 * uShapeScale);
      shape = .5 + .5 * sin(checks_shape_uv.x) * cos(checks_shape_uv.y);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else if (uShape < 1.5) {
      vec2 stripes_shape_uv = uv * (.25 + 3. * uShapeScale);
      float f = fract(stripes_shape_uv.y);
      shape = smoothstep(.0, .55, f) * smoothstep(1., .45, f);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else {
      float sh = 1. - uv.y;
      sh -= .5;
      sh /= (noise_scale * uResolution.y);
      sh += .5;
      float shape_scaling = .2 * (1. - uShapeScale);
      shape = smoothstep(.45 - shape_scaling, .55 + shape_scaling, sh + .3 * (proportion - .5));
      mixer = shape;
    }

    // Aesthetic Adjustment: Favoring lightness and softness
    vec4 color_mix = blend_colors(uColor1, uColor2, uColor3, mixer, 1. - clamp(uSoftness, 0., 1.), .01 + .01 * uScale);
    fragColor = vec4(color_mix.rgb, color_mix.a);
}
`;

/* ─────────────────────── UTILITIES ─────────────────────── */

function parseColor(color: string): number[] {
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16) / 255;
    const g = parseInt(color.slice(3, 5), 16) / 255;
    const b = parseInt(color.slice(5, 7), 16) / 255;
    return [r, g, b, 1.0];
  }
  if (color.startsWith('rgba')) {
    const parts = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
    if (parts) {
      return [parseInt(parts[1]) / 255, parseInt(parts[2]) / 255, parseInt(parts[3]) / 255, parseFloat(parts[4])];
    }
  }
  return [0, 0, 0, 1];
}

/* ─────────────────────── COMPONENT ─────────────────────── */

interface LiquidBackgroundProps {
  color1: string;
  color2: string;
  color3: string;
  speed?: number;
  scale?: number;
  rotation?: number;
  swirl?: number;
  distortion?: number;
  softness?: number;
  shapeScale?: number;
  swirlIterations?: number;
}

export default function LiquidBackground({
  color1, color2, color3,
  speed = 15,
  scale = 1,
  rotation = 0,
  swirl = 0.8,
  distortion = 0.25,
  softness = 1.0,
  shapeScale = 0.1,
  swirlIterations = 10,
}: LiquidBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const programRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const glRef = useRef<any>(null);

  // 1. Initialization (One-time)
  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    rendererRef.current = renderer;
    glRef.current = gl;
    containerRef.current.appendChild(gl.canvas);

    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
      uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) },
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2() },
        uPixelRatio: { value: 1.0 },
        uColor1: { value: parseColor(color1) },
        uColor2: { value: parseColor(color2) },
        uColor3: { value: parseColor(color3) },
        uScale: { value: scale },
        uRotation: { value: rotation },
        uProportion: { value: 0.5 },
        uSoftness: { value: softness },
        uShape: { value: 2.0 }, // 2.0 is the "Edge" pattern which look streakier
        uShapeScale: { value: shapeScale },
        uDistortion: { value: distortion },
        uSwirl: { value: swirl },
        uSwirlIterations: { value: swirlIterations },
      },
    });
    programRef.current = program;

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      const dpr = Math.min(window.devicePixelRatio, 2.0);
      renderer.setSize(width, height);
      program.uniforms.uResolution.value.set(width * dpr, height * dpr);
      program.uniforms.uPixelRatio.value = dpr;
    }

    window.addEventListener('resize', resize);
    resize();

    let request: number;
    function update(t: number) {
      request = requestAnimationFrame(update);
      program.uniforms.uTime.value = t * 0.001 * (speed / 100);
      renderer.render({ scene: mesh });
    }
    request = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(request);
      if (containerRef.current) {
        containerRef.current.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []); // Run only once

  // 2. Uniform Updates (Dynamic)
  useEffect(() => {
    if (!programRef.current) return;
    
    // Smoothly update uniforms without restarting the engine
    programRef.current.uniforms.uColor1.value = parseColor(color1);
    programRef.current.uniforms.uColor2.value = parseColor(color2);
    programRef.current.uniforms.uColor3.value = parseColor(color3);
    programRef.current.uniforms.uScale.value = scale;
    programRef.current.uniforms.uRotation.value = rotation;
    programRef.current.uniforms.uSoftness.value = softness;
    programRef.current.uniforms.uShapeScale.value = shapeScale;
    programRef.current.uniforms.uDistortion.value = distortion;
    programRef.current.uniforms.uSwirl.value = swirl;
    programRef.current.uniforms.uSwirlIterations.value = swirlIterations;
  }, [color1, color2, color3, scale, rotation, softness, shapeScale, distortion, swirl, swirlIterations]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden" />
  );
}
