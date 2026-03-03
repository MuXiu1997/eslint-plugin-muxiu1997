import { run } from '~/rules/_test'
import rule, { RULE_NAME } from '~/rules/if-empty-return-same-line'

run({
  name: RULE_NAME,
  rule,
  valid: [
    // Empty return is already on the same line.
    'if (true) return',
    // Empty return with a comparison condition is already on the same line.
    'if (a === b) return',
    // Block statements are out of scope for this rule.
    'if (true) { return }',
    // Non-empty return on a new line is handled by another rule.
    `if (true)\n  return value`,
    // Non-return consequents are not checked by this rule.
    `if (true)\n  console.log('hello')`,
    // Empty return stays valid after a multi-line condition when placed inline.
    `if (\n  a\n  && b\n) return`,
    // Nested if with an inline empty return remains valid.
    'if (a) if (b) return',
    // If-else branch with inline empty return remains valid.
    `if (a) return\nelse\n  return value`,
    // Empty return with semicolon on the same line remains valid.
    'if (ready) return;',
    // Inline comment before empty return on the same line remains valid.
    'if (ready) /* keep */ return',
    // Empty return remains valid with extra same-line spaces.
    'if (ready)   return',
    // Empty returns in an else-if chain remain valid when both are inline.
    `if (a) return\nelse if (b) return`,
    // Non-empty return with tab indentation is still out of scope for this rule.
    `if (ready)\n\treturn value`,
    // Empty return with an inline block comment remains valid.
    'if (ready) /* keep this comment */ return',
  ],
  invalid: [
    // Empty return on the next line should be collapsed to the same line.
    {
      code: 'if (true)\n  return',
      output: 'if (true) return',
      errors: [{ messageId: 'missingIfEmptyReturnSameLine' }],
    },
    // Empty return with a comparison condition should be collapsed to the same line.
    {
      code: 'if (a === b)\n  return',
      output: 'if (a === b) return',
      errors: [{ messageId: 'missingIfEmptyReturnSameLine' }],
    },
    // Empty return after a multi-line condition should be collapsed to the same line.
    {
      code: `if (\n  a\n  && b\n)\n  return`,
      output: `if (\n  a\n  && b\n) return`,
      errors: [{ messageId: 'missingIfEmptyReturnSameLine' }],
    },
    // Empty return with extra indentation should still be collapsed.
    {
      code: 'if (true)\n    return',
      output: 'if (true) return',
      errors: [{ messageId: 'missingIfEmptyReturnSameLine' }],
    },
    // Empty return with semicolon should be collapsed while preserving semicolon.
    {
      code: 'if (ready)\n  return;',
      output: 'if (ready) return;',
      errors: [{ messageId: 'missingIfEmptyReturnSameLine' }],
    },
    // Inner empty return in a nested if should be collapsed to the same line.
    {
      code: `if (a)\n  if (b)\n    return`,
      output: `if (a)\n  if (b) return`,
      errors: [{ messageId: 'missingIfEmptyReturnSameLine' }],
    },
    // Multiple empty returns in one snippet should all be fixed.
    {
      code: `if (a)\n  return\nif (b)\n  return`,
      output: `if (a) return\nif (b) return`,
      errors: [
        { messageId: 'missingIfEmptyReturnSameLine' },
        { messageId: 'missingIfEmptyReturnSameLine' },
      ],
    },
    // Empty return with tab indentation should be collapsed to the same line.
    {
      code: 'if (ready)\n\treturn',
      output: 'if (ready) return',
      errors: [{ messageId: 'missingIfEmptyReturnSameLine' }],
    },
    // Empty return with tab indentation and semicolon should be collapsed.
    {
      code: 'if (ready)\n\treturn;',
      output: 'if (ready) return;',
      errors: [{ messageId: 'missingIfEmptyReturnSameLine' }],
    },
    // Empty returns in an else-if chain should both be collapsed.
    {
      code: `if (a)\n  return\nelse if (b)\n  return`,
      output: `if (a) return\nelse if (b) return`,
      errors: [
        { messageId: 'missingIfEmptyReturnSameLine' },
        { messageId: 'missingIfEmptyReturnSameLine' },
      ],
    },
    // Fix should keep an inline block comment instead of removing it.
    {
      code: `if (ready) /* keep this comment */\n  return`,
      output: 'if (ready) /* keep this comment */ return',
      errors: [{ messageId: 'missingIfEmptyReturnSameLine' }],
    },
    // Fix should avoid unsafe changes when a line comment would swallow return.
    {
      code: `if (ready) // keep this comment\n  return`,
      output: null,
      errors: [{ messageId: 'missingIfEmptyReturnSameLine' }],
    },
  ],
})
