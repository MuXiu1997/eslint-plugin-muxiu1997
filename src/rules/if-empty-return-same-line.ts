import type { TSESTree } from '@typescript-eslint/utils'
import { createEslintRule } from '~/utils'

export const RULE_NAME = 'if-empty-return-same-line'
export type MessageIds = 'missingIfEmptyReturnSameLine'
export type Options = []

export default createEslintRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'layout',
    docs: {
      description: 'Same line empty return after if',
    },
    fixable: 'whitespace',
    schema: [],
    messages: {
      missingIfEmptyReturnSameLine: 'Expected empty `return` to be on the same line as `if`.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      IfStatement(node: TSESTree.IfStatement) {
        if (!node.consequent)
          return
        if (node.consequent.type !== 'ReturnStatement')
          return
        if (node.consequent.argument)
          return
        if (!node.test.loc || !node.consequent.loc)
          return

        const ifLine = node.test.loc.end.line
        const returnLine = node.consequent.loc.start.line
        if (ifLine !== returnLine) {
          context.report({
            node,
            loc: {
              start: node.test.loc.end,
              end: node.consequent.loc.start,
            },
            messageId: 'missingIfEmptyReturnSameLine',
            fix(fixer) {
              return fixer.replaceTextRange([node.test.range[1] + 1, node.consequent.range[0]], ' ')
            },
          })
        }
      },
    }
  },
})
