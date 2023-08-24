import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss'

export default [
    {
        input: './src/MMM-StatusPageIo.ts',
        plugins: [
            typescript(),
            resolve(),
            commonjs(),
            scss({
                fileName: 'MMM-StatusPageIo.css'
            })
        ],
        output: {
            file: './MMM-StatusPageIo.js',
            format: 'iife',
        },
    }, {
        input: './src/node_helper.ts',
        plugins: [
            typescript()
        ],
        output: {
            file: './node_helper.js',
            format: 'umd',
        },
    },
]