import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        checker({ typescript: { tsconfigPath: 'tsconfig.json' } }),
        react(),
        dts({ insertTypesEntry: true, tsConfigFilePath: 'tsconfig.json' })
    ]
});
