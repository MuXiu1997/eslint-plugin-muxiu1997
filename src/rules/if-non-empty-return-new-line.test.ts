import { run } from '~/rules/_test'
import rule, { RULE_NAME } from '~/rules/if-non-empty-return-new-line'

run({
  name: RULE_NAME,
  rule,
  valid: [
    // Non-empty return is already on a new line.
    `if (true)\n  return value`,
    // Non-return consequent is already on a new line.
    `if (true)\n  console.log('hello')`,
    // Block statements are out of scope for this rule.
    `if (true) { console.log('hello') }`,
    // Empty return on the same line is intentionally allowed.
    'if (true) return',
    // Multi-line condition followed by a new-line consequent is valid.
    `if (\n  a\n  && b\n)\n  return value`,
    // Nested if is valid when the outer consequent already starts on a new line.
    `if (a)\n  if (b) return`,
    // If-else form is valid when the non-empty return is on a new line.
    `if (a)\n  return value\nelse\n  return`,
    // Empty return with semicolon on the same line is intentionally allowed.
    'if (ready) return;',
    // Comment between if and consequent is valid when consequent starts on a new line.
    `if (ready) // keep\n  return value`,
    // Non-empty return with tab indentation on a new line is valid.
    `if (ready)\n\treturn value`,
    // Throw statement on a new line is valid.
    `if (ready)\n  throw new Error('x')`,
    // Parenthesized expression statement on a new line is valid.
    `if (ready)\n  (doWork())`,
    // Else-if chain is valid when both non-empty returns start on new lines.
    `if (a)\n  return value\nelse if (b)\n  return other`,
    // Inline block comment is valid when the consequent is already on a new line.
    `if (ready) /* keep this comment */\n  return value`,
  ],
  invalid: [
    // Non-empty return on the same line should move to a new line.
    {
      code: 'if (true) return value',
      output: 'if (true)\nreturn value',
      errors: [{ messageId: 'missingIfNonEmptyReturnNewLine' }],
    },
    // Non-return consequent on the same line should move to a new line.
    {
      code: `if (true) console.log('hello')`,
      output: `if (true)\nconsole.log('hello')`,
      errors: [{ messageId: 'missingIfNonEmptyReturnNewLine' }],
    },
    // Consequent after a multi-line condition should start on a new line.
    {
      code: `if (\n  a\n  && b\n) return value`,
      output: `if (\n  a\n  && b\n)\nreturn value`,
      errors: [{ messageId: 'missingIfNonEmptyReturnNewLine' }],
    },
    // Nested if used as a same-line consequent should move to a new line.
    {
      code: 'if (a) if (b) return',
      output: 'if (a)\nif (b) return',
      errors: [{ messageId: 'missingIfNonEmptyReturnNewLine' }],
    },
    // Non-empty return with semicolon should move to a new line.
    {
      code: 'if (ready) return value;',
      output: 'if (ready)\nreturn value;',
      errors: [{ messageId: 'missingIfNonEmptyReturnNewLine' }],
    },
    // Multiple same-line non-empty consequents should all be fixed.
    {
      code: `if (a) return value\nif (b) console.log('x')`,
      output: `if (a)\nreturn value\nif (b)\nconsole.log('x')`,
      errors: [
        { messageId: 'missingIfNonEmptyReturnNewLine' },
        { messageId: 'missingIfNonEmptyReturnNewLine' },
      ],
    },
    // Non-empty return with a tab separator on the same line should move.
    {
      code: 'if (ready)\treturn value',
      output: 'if (ready)\nreturn value',
      errors: [{ messageId: 'missingIfNonEmptyReturnNewLine' }],
    },
    // Throw statement on the same line should move to a new line.
    {
      code: `if (ready) throw new Error('x')`,
      output: `if (ready)\nthrow new Error('x')`,
      errors: [{ messageId: 'missingIfNonEmptyReturnNewLine' }],
    },
    // Parenthesized expression statement on the same line should move.
    {
      code: `if (ready) (doWork())`,
      output: `if (ready)\n(doWork())`,
      errors: [{ messageId: 'missingIfNonEmptyReturnNewLine' }],
    },
    // Else-if chain with same-line non-empty returns should both be fixed.
    {
      code: `if (a) return value\nelse if (b) return other`,
      output: `if (a)\nreturn value\nelse if (b)\nreturn other`,
      errors: [
        { messageId: 'missingIfNonEmptyReturnNewLine' },
        { messageId: 'missingIfNonEmptyReturnNewLine' },
      ],
    },
    // Fix should keep an inline block comment before moving return to a new line.
    {
      code: `if (ready) /* keep this comment */ return value`,
      output: `if (ready) /* keep this comment */\nreturn value`,
      errors: [{ messageId: 'missingIfNonEmptyReturnNewLine' }],
    },
    // Fix should keep an inline block comment before moving an expression statement.
    {
      code: `if (ready) /* keep this comment */ doWork()`,
      output: `if (ready) /* keep this comment */\ndoWork()`,
      errors: [{ messageId: 'missingIfNonEmptyReturnNewLine' }],
    },
  ],
})
