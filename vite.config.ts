import {defineConfig} from 'vite'
import {resolve} from 'path'
import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy'
import svgLoader from 'vite-svg-loader'
import dts from 'vite-plugin-dts'

export default defineConfig({
    plugins: [
        dts({ outDir: '/Users/navdeepghai/navdeep/bond-erp/apps/bond_erp/bond_erp/public/js/file_manager/lib/types', entryRoot: 'src' }),
        vue(),
        svgLoader(),
        copy({
            targets: [
                {src: 'src/locales/*', dest: '/Users/navdeepghai/navdeep/bond-erp/apps/bond_erp/bond_erp/public/js/file_manager/lib/locales'},
                {src: 'src/features.js', dest: '/Users/navdeepghai/navdeep/bond-erp/apps/bond_erp/bond_erp/public/js/file_manager/lib'},
            ],
            hook: "writeBundle",
        })
    ],
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler', // or 'modern'
            },
        },
    },
    build: {
        outDir: "/Users/navdeepghai/navdeep/bond-erp/apps/bond_erp/bond_erp/public/js/file_manager/lib/",
        lib: {
            entry: resolve(__dirname, 'src/index.js'),
            formats: ['es', 'cjs'],
            name: 'VueFinder',
            // the proper extensions will be added
            fileName: 'vuefinder',
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: [
                'vue',
                'mitt',
                'vanilla-lazyload',
                'dragselect',
                'cropperjs/dist/cropper.css',
                'cropperjs',
                '@uppy/core',
                '@uppy/xhr-upload',
            ],
            output: {
                exports: 'named',
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: 'Vue'
                }
            }
        }
    },
});


