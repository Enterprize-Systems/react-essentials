import path from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        sourcemap: true,
        minify: 'esbuild',
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
        checker({ typescript: { tsconfigPath: 'tsconfig.json' } }),
        react(),
        dts({ insertTypesEntry: true, tsConfigFilePath: 'tsconfig.json' })
    ]
});
