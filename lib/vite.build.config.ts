// @ts-ignore
import path from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
    build: {
        sourcemap: true,
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'Enterprize React Essentials',
            formats: ['es', 'umd'],
            fileName: 'react-essentials'
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDom'
                }
            }
        }
    },
    plugins: [
        checker({ typescript: { tsconfigPath: 'tsconfig.build.json' } }),
        eslint(),
        react(),
        dts({ insertTypesEntry: true, tsConfigFilePath: 'tsconfig.build.json' })
    ]
});
