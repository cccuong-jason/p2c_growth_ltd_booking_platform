import React, { useRef, useEffect, useMemo } from 'react';

interface RippleGridProps {
  gridSize?: number;
  gridThickness?: number;
  fadeDistance?: number;
  vignetteStrength?: number;
  glowIntensity?: number;
  opacity?: number;
  gridRotation?: number;
  mouseInteractionRadius?: number;
  rippleIntensity?: number;
  rainbowMode?: boolean;
  gridColor?: string;
  className?: string;
}

const RippleGrid: React.FC<RippleGridProps> = ({
  gridSize = 0.05,
  gridThickness = 0.015,
  fadeDistance = 1.5,
  vignetteStrength = 0.5,
  glowIntensity = 0.1,
  opacity = 1.0,
  gridRotation = 0,
  mouseInteractionRadius = 0.8,
  rippleIntensity = 0.05,
  rainbowMode = false,
  gridColor = "#ffffff",
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  // Convert hex color to RGB for the shader
  const rgbColor = useMemo(() => {
    const hex = gridColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    return [r, g, b];
  }, [gridColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_gridSize;
      uniform float u_gridThickness;
      uniform float u_fadeDistance;
      uniform float u_vignetteStrength;
      uniform float u_glowIntensity;
      uniform float u_opacity;
      uniform float u_gridRotation;
      uniform float u_mouseInteractionRadius;
      uniform float u_rippleIntensity;
      uniform bool u_rainbowMode;
      uniform vec3 u_gridColor;

      vec2 rotate(vec2 v, float a) {
        float s = sin(a);
        float c = cos(a);
        mat2 m = mat2(c, -s, s, c);
        return m * v;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 mouse = u_mouse;
        
        // Aspect ratio correction
        float aspect = u_resolution.x / u_resolution.y;
        uv.x *= aspect;
        mouse.x *= aspect;

        // Ripple effect calculation
        float dist = distance(uv, mouse);
        float ripple = sin(dist * 20.0 - u_time * 2.0) * u_rippleIntensity;
        float interaction = smoothstep(u_mouseInteractionRadius, 0.0, dist);
        
        vec2 gridUv = rotate(uv + ripple * interaction, u_gridRotation);
        
        // Grid pattern
        vec2 grid = abs(fract(gridUv / u_gridSize - 0.5) - 0.5) / (u_gridThickness / u_gridSize);
        float line = min(grid.x, grid.y);
        float gridPattern = 1.0 - smoothstep(0.0, 1.0, line);

        // Glow and Fade
        float glow = exp(-line * 4.0) * u_glowIntensity;
        float fade = smoothstep(u_fadeDistance, 0.0, length(uv - vec2(0.5 * aspect, 0.5)));
        
        // Vignette
        float vignette = 1.0 - length(gl_FragCoord.xy / u_resolution.xy - 0.5) * u_vignetteStrength;
        
        // Color
        vec3 color = u_gridColor;
        if (u_rainbowMode) {
          color = 0.5 + 0.5 * cos(u_time + uv.xyx + vec3(0, 2, 4));
        }

        float finalAlpha = (gridPattern + glow) * fade * vignette * u_opacity;
        gl_FragColor = vec4(color * finalAlpha, finalAlpha);
      }
    `;

    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vertexShaderSource));
    gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource));
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      time: gl.getUniformLocation(program, 'u_time'),
      mouse: gl.getUniformLocation(program, 'u_mouse'),
      gridSize: gl.getUniformLocation(program, 'u_gridSize'),
      gridThickness: gl.getUniformLocation(program, 'u_gridThickness'),
      fadeDistance: gl.getUniformLocation(program, 'u_fadeDistance'),
      vignetteStrength: gl.getUniformLocation(program, 'u_vignetteStrength'),
      glowIntensity: gl.getUniformLocation(program, 'u_glowIntensity'),
      opacity: gl.getUniformLocation(program, 'u_opacity'),
      gridRotation: gl.getUniformLocation(program, 'u_gridRotation'),
      mouseInteractionRadius: gl.getUniformLocation(program, 'u_mouseInteractionRadius'),
      rippleIntensity: gl.getUniformLocation(program, 'u_rippleIntensity'),
      rainbowMode: gl.getUniformLocation(program, 'u_rainbowMode'),
      gridColor: gl.getUniformLocation(program, 'u_gridColor'),
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.parentElement.clientHeight * window.devicePixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1.0 - (e.clientY - rect.top) / rect.height
      };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    let animationFrameId: number;
    const render = (time: number) => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.time, time * 0.001);
      gl.uniform2f(uniforms.mouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uniforms.gridSize, gridSize);
      gl.uniform1f(uniforms.gridThickness, gridThickness);
      gl.uniform1f(uniforms.fadeDistance, fadeDistance);
      gl.uniform1f(uniforms.vignetteStrength, vignetteStrength);
      gl.uniform1f(uniforms.glowIntensity, glowIntensity);
      gl.uniform1f(uniforms.opacity, opacity);
      gl.uniform1f(uniforms.gridRotation, (gridRotation * Math.PI) / 180);
      gl.uniform1f(uniforms.mouseInteractionRadius, mouseInteractionRadius);
      gl.uniform1f(uniforms.rippleIntensity, rippleIntensity);
      gl.uniform1i(uniforms.rainbowMode, rainbowMode ? 1 : 0);
      gl.uniform3fv(uniforms.gridColor, rgbColor);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gridSize, gridThickness, fadeDistance, vignetteStrength, glowIntensity, opacity, gridRotation, mouseInteractionRadius, rippleIntensity, rainbowMode, rgbColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block ${className}`}
      style={{ background: 'transparent' }}
    />
  );
};

export default RippleGrid;
