/**
 * Package file volume analysis
 */
import visualizer from 'rollup-plugin-visualizer'

export function registerVisualizer() {
  return visualizer({
    filename: './node_modules/.cache/visualizer/stats.html',
    open: true,
    gzipSize: true,
    brotliSize: true,
  })
}
