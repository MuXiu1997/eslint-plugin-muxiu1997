import type { TSESTree } from '@typescript-eslint/utils'
import { createEslintRule } from '~/utils'

export const RULE_NAME = 'if-non-empty-return-new-line'
export type MessageIds = 'missingIfNonEmptyReturnNewLine'
export type Options = []

export default createEslintRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: 'layout',
    docs: {
      description: 'New line after if',
    },
    fixable: 'whitespace',
    schema: [],
    messages: {
      missingIfNonEmptyReturnNewLine: 'Expected non-empty statement after `if` to be on a new line.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      IfStatement(node: TSESTree.IfStatement) {
        if (!node.consequent)
          return
        if (node.consequent.type === 'ReturnStatement' && !node.consequent.argument)
          return
        if (node.consequent.type === 'BlockStatement')
          return
        if (!node.test.loc || !node.consequent.loc)
          return

        const ifLine = node.test.loc.end.line
        const returnLine = node.consequent.loc.start.line
        if (ifLine === returnLine) {
          context.report({
            node,
            loc: {
              start: node.test.loc.end,
              end: node.consequent.loc.start,
            },
            messageId: 'missingIfNonEmptyReturnNewLine',
            fix(fixer) {
              return fixer.replaceTextRange([node.consequent.range[0], node.consequent.range[0]], '\n')
            },
          })
        }
      },
    }
  },
})
