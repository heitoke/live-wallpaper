import { defineConfig } from 'electron-vite';
import { resolve, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { globSync } from 'glob';


const listPreloads = Object.fromEntries(globSync('src/preloads/*.ts').map(file => {
    return [
        relative('src/preloads', file.slice(0, file.length - extname(file).length)),
        fileURLToPath(new URL(file, import.meta.url))
    ];
}));

const listPages = Object.fromEntries(globSync('renderer/*.html').map(file => {
    return [
        relative('renderer', file.slice(0, file.length - extname(file).length)),
        fileURLToPath(new URL(file, import.meta.url))
    ];
}));


export default defineConfig({
    main: {
        resolve: {
            alias: {
                '~': '/src'
            }
        },
        build: {
            outDir: 'dist',
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'src/index.ts')
                }
            }
        }
    },
    preload: {
        build: {
            outDir: 'dist/preloads',
            rollupOptions: {
                input: listPreloads,
                output: {
                    format: 'cjs',
                    entryFileNames() {
                        return '[name].js';
                    }
                }
            }
        }
    },
    renderer: {
        root: 'renderer',
        resolve: {
            alias: {
                '@': ''
            }
        },
        build: {
            outDir: 'dist/web',
            rollupOptions: {
                input: listPages,
                output: {
                    dir: 'dist/web'
                }
            }
        },
        esbuild: {
            jsx: 'automatic',
            jsxImportSource: 'hywer',
        }
    }
});