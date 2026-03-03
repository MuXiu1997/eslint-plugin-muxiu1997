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
        if (!node.consequent.loc)
          return

        const sourceCode = context.sourceCode
        const closeParen = sourceCode.getTokenAfter(node.test)!
        const betweenStart = closeParen.range[1]
        const betweenEnd = node.consequent.range[0]
        const commentsBetween = sourceCode
          .getTokensBetween(closeParen, node.consequent, { includeComments: true })
          .filter(token => token.type === 'Block' || token.type === 'Line')
        const ifLine = closeParen.loc.end.line
        const returnLine = node.consequent.loc.start.line
        if (ifLine === returnLine) {
          context.report({
            node,
            loc: {
              start: closeParen.loc.end,
              end: node.consequent.loc.start,
            },
            messageId: 'missingIfNonEmptyReturnNewLine',
            fix(fixer) {
              if (commentsBetween.length === 0)
                return fixer.replaceTextRange([betweenStart, betweenEnd], '\n')

              const preservedComments = commentsBetween
                .map(comment => sourceCode.text.slice(comment.range[0], comment.range[1]))
                .join(' ')
              return fixer.replaceTextRange([betweenStart, betweenEnd], ` ${preservedComments}\n`)
            },
          })
        }
      },
    }
  },
})
