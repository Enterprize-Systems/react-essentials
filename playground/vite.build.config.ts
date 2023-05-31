import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
    plugins: [
        checker({ typescript: { tsconfigPath: 'tsconfig.build.json' } }),
        eslint(),
        react(),
        dts({ insertTypesEntry: true, tsConfigFilePath: 'tsconfig.build.json' })
    ]
});
