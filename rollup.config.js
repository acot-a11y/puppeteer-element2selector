import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'bridge.js',
  output: {
    file: 'lib/bridge.js',
    name: 'finder',
    format: 'iife',
  },
  plugins: [resolve(), commonjs()],
};
