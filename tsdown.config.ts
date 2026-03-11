import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts', './src/configs/preset.ts'],
  format: ['esm', 'cjs'],
  target: 'node18',
  clean: true,
  dts: true,
  publint: 'ci-only',
  attw: 'ci-only',
  cjsDefault: false,
  external: [/^@typescript-eslint\//],
  alias: {
    '~': './src',
  },
})
