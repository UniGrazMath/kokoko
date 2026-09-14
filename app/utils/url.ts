/** Prefix an absolute site path with the deployment base URL
 *  (`/` locally, `/kokoko/` on GitHub Pages). */
export function withBase(path: string): string {
  return useRuntimeConfig().app.baseURL.replace(/\/$/, '') + path
}
