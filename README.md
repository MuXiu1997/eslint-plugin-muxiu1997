<h1 align="center">@muxiu1997/eslint-plugin</h1>
<div align="center">
<a href="https://github.com/MuXiu1997/eslint-plugin/actions/workflows/release.yml"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/MuXiu1997/eslint-plugin/release.yml?branch=main&style=flat-square&label=CI"></a>
<a href="https://www.npmjs.com/package/@muxiu1997/eslint-plugin"><img alt="npm version" src="https://img.shields.io/npm/v/@muxiu1997/eslint-plugin?style=flat-square&color=orange"></a>
<a href="LICENSE"><img alt="LICENSE" src="https://img.shields.io/github/license/MuXiu1997/eslint-plugin?style=flat-square"></a>
</div>
<br/>
<div align="center">MuXiu1997's personal ESLint rules.</div>

---

## 📦 Install

```bash
npm install -D @muxiu1997/eslint-plugin
```

## 📖 Usage

### Manual setup

Register the plugin and enable rules in your `eslint.config.js`:

```js
import muxiu1997 from '@muxiu1997/eslint-plugin'

export default [
  {
    plugins: {
      muxiu1997,
    },
    rules: {
      'muxiu1997/if-empty-return-same-line': 'error',
      'muxiu1997/if-non-empty-return-new-line': 'error',
    },
  },
]
```

### Preset (with `@antfu/eslint-config`)

If you use [`@antfu/eslint-config`](https://github.com/antfu/eslint-config), the `/preset` subpath bundles the plugin, all rules, and turns off the conflicting `antfu/if-newline` rule:

```js
import antfu from '@antfu/eslint-config'
import muxiu1997Preset from '@muxiu1997/eslint-plugin/preset'

export default antfu({ ... }).append(muxiu1997Preset)
```

## 📏 Rules

### `muxiu1997/if-empty-return-same-line`

Enforces that an empty `return` (guard clause) stays on the **same line** as the `if`.

```js
// ✅ Correct
if (condition) return

// ❌ Incorrect
if (condition)
  return
```

> 🔧 Auto-fixable.

---

### `muxiu1997/if-non-empty-return-new-line`

Enforces that a non-empty statement after a braceless `if` is on a **new line**.

```js
// ✅ Correct
if (condition)
  doSomething()

// ❌ Incorrect
if (condition) doSomething()
```

> 🔧 Auto-fixable.

## 🛠 Development

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/)

### Setup

```bash
git clone https://github.com/MuXiu1997/eslint-plugin.git
cd eslint-plugin
pnpm install
```

### Scripts

- `pnpm run build` — Build the plugin.
- `pnpm run dev` — Build in watch mode.
- `pnpm run lint` — Lint and auto-fix.
- `pnpm run test` — Run tests.
- `pnpm run typecheck` — Type-check without emitting.

## 📜 License

This project is licensed under the [MIT License](LICENSE).
