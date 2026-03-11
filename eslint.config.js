import antfu from '@antfu/eslint-config'
import muxiu1997Preset from '@muxiu1997/eslint-plugin/preset'

export default antfu(
  {
    type: 'lib',
    formatters: true,
    typescript: true,
  },
  muxiu1997Preset,
  {
    ignores: ['README.md'],
  },
)
