import globals from 'globals'
import pluginReactConfig from 'eslint-plugin-react/configs/recommended'

import path from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '.pnpm/@eslint+eslintrc@3.0.2/node_modules/@eslint/eslintrc'
import pluginJs from '.pnpm/@eslint+js@9.0.0/node_modules/@eslint/js'

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: pluginJs.configs.recommended })

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'script' } },
  { languageOptions: { globals: globals.browser } },
  ...compat.extends('standard'),
  pluginReactConfig
]
