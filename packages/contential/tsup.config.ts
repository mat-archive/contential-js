import type { Options } from 'tsup';

const options: Options = {
  entryPoints: ['src/index.ts', 'src/chat.ts', 'src/prompt.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  outDir: 'dist',
};

export default options;
