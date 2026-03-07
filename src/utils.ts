import type { RuleListener, RuleContext as TSESLintRuleContext, RuleModule as TSESLintRuleModule } from '@typescript-eslint/utils/ts-eslint'
import type { Rule } from 'eslint'

const blobUrl = 'https://github.com/MuXiu1997/eslint-plugin/blob/main/src/rules/'

export type RuleModule<T extends readonly unknown[]> = Rule.RuleModule & {
  defaultOptions: T
}

export interface RuleWithMetaAndName<
  TOptions extends readonly unknown[],
  TMessageIds extends string,
> extends TSESLintRuleModule<TMessageIds, TOptions> {
  name: string
}

function RuleCreator(urlCreator: (name: string) => string) {
  return function createNamedRule<
    TOptions extends readonly unknown[],
    TMessageIds extends string,
  >({
    name,
    meta,
    ...rule
  }: Readonly<RuleWithMetaAndName<TOptions, TMessageIds>>): RuleModule<TOptions> {
    return createRule({
      name,
      meta: {
        ...meta,
        docs: {
          ...meta.docs,
          url: urlCreator(name),
        },
      } as any,
      ...rule,
    })
  }
}

function createRule<
  TOptions extends readonly unknown[],
  TMessageIds extends string,
>({
  create,
  defaultOptions,
  meta,
}: Readonly<RuleWithMetaAndName<TOptions, TMessageIds>>): RuleModule<TOptions> {
  return {
    create: ((context: TSESLintRuleContext<TMessageIds, TOptions>): RuleListener => {
      const optionsWithDefault = context.options.map((options: any, index: number) => ({
        ...defaultOptions?.[index] || {},
        ...options || {},
      })) as unknown as TOptions
      return (create as any)(context, optionsWithDefault)
    }) as any,
    defaultOptions: defaultOptions as TOptions,
    meta: meta as any,
  }
}

export const createEslintRule = RuleCreator(
  ruleName => `${blobUrl}${ruleName}.md`,
) as any as <TOptions extends readonly unknown[], TMessageIds extends string>(
  args: Readonly<RuleWithMetaAndName<TOptions, TMessageIds>>,
) => RuleModule<TOptions>
