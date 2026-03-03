import { run } from '~/rules/_test'
import rule, { RULE_NAME } from '~/rules/if-empty-return-same-line'

run({
  name: RULE_NAME,
  rule,
  valid: [
    'if (true) return',
    'if (a === b) return',
    'if (true) { return }',
    `if (true)\n  return value`,
    `if (true)\n  console.log('hello')`,
  ],
  invalid: [
    {
      code: 'if (true)\n  return',
      output: 'if (true) return',
      errors: [{ messageId: 'missingIfEmptyReturnSameLine' }],
    },
    {
      code: 'if (a === b)\n  return',
      output: 'if (a === b) return',
      errors: [{ messageId: 'missingIfEmptyReturnSameLine' }],
    },
  ],
})
