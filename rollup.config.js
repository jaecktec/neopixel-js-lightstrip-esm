import html from 'rollup-plugin-html';
import scss from 'rollup-plugin-scss'
import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import {writeFileSync} from 'fs';

export default [
    {
        input: 'src/main.js',
        external: ['mustache'],
        plugins: [
            resolve(),
            html({
                include: 'src/*.html'
            }),
            scss({
                output: true,
                output: (styles, styleNodes) => {
                    writeFileSync('dist/bundle.css', styles)
                },
                failOnError: true,
            })
        ],
        output: [
            {file: pkg.module, format: 'es'}
        ]
    }
];
