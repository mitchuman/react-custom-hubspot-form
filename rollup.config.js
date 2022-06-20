import pkg from './package.json'
import external from 'rollup-plugin-peer-deps-external'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

export default {
	input: 'src/index.jsx',
	output: [
		{ file: pkg.module, format: 'esm', }
	],
	plugins: [
		external(),
		babel({
			presets: [
				['@babel/preset-react', { runtime: 'automatic' }],
			],
		}),
		terser(),
	],
	external: ['react', 'react-dom']
}
