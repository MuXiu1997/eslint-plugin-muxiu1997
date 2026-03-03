import ifEmptyReturnSameLine from '~/rules/if-empty-return-same-line'
import ifNonEmptyReturnNewLine from '~/rules/if-non-empty-return-new-line'

export default {
  rules: {
    'if-empty-return-same-line': ifEmptyReturnSameLine,
    'if-non-empty-return-new-line': ifNonEmptyReturnNewLine,
  },
}
