/**
 * Feature-detect WebGL before constructing an OGL renderer. OGL's own
 * constructor logs to the console when a context is unavailable, which would
 * produce noisy errors in browsers that intentionally disable WebGL.
 */
let cachedSupport: boolean | null = null;

export function canUseWebGL(): boolean {
  if (typeof document === "undefined") return false;
  if (cachedSupport !== null) return cachedSupport;

  const canvas = document.createElement("canvas");
  try {
    const gl =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");
    cachedSupport = Boolean(gl);
    if (!gl) return false;
    (gl as WebGLRenderingContext).getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    cachedSupport = false;
    return false;
  }
}
