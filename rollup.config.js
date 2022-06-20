import pkg from './package.json'
import babel from '@rollup/plugin-babel'
import { terser } from "rollup-plugin-terser"

export default {
	input: 'src/index.jsx',
	output: [
		{
			file: pkg.main,
			format: 'esm',
			exports: 'named',
			sourcemap: true,
			strict: false
		}
	],
	plugins: [
		babel({
			presets: ['@babel/preset-react'],
		}),
		terser(),
	],
	external: ['react', 'react-dom']
}
