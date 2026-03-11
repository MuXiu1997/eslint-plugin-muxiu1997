import plugin from '~/index'

const preset = {
  plugins: {
    muxiu1997: plugin,
  },
  rules: {
    'muxiu1997/if-empty-return-same-line': 'error',
    'muxiu1997/if-non-empty-return-new-line': 'error',
    'antfu/if-newline': 'off',
  },
} as const

export default preset
