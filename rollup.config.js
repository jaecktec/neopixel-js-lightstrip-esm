import html from 'rollup-plugin-html';
import scss from 'rollup-plugin-scss'
import pkg from './package.json';
import {writeFileSync} from 'fs';

export default [
    {
        input: 'src/main.js',
        external: ['https://unpkg.com/mustache@latest/mustache.mjs'],
        plugins: [
            html({
                include: '**/*.html'
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
