import { run } from '~/rules/_test'
import rule, { RULE_NAME } from '~/rules/if-non-empty-return-new-line'

run({
  name: RULE_NAME,
  rule,
  valid: [
    `if (true)\n  return value`,
    `if (true)\n  console.log('hello')`,
    `if (true) { console.log('hello') }`,
    'if (true) return',
  ],
  invalid: [
    {
      code: 'if (true) return value',
      output: 'if (true) \nreturn value',
      errors: [{ messageId: 'missingIfNonEmptyReturnNewLine' }],
    },
    {
      code: `if (true) console.log('hello')`,
      output: `if (true) \nconsole.log('hello')`,
      errors: [{ messageId: 'missingIfNonEmptyReturnNewLine' }],
    },
  ],
})
