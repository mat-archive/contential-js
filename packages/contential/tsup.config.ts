import type { Options } from 'tsup';

const options: Options = {
  entryPoints: ['src/index.ts', 'src/chat/index.ts', 'src/prompt/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
};

export default options;
