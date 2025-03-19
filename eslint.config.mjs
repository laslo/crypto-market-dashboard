import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import { defineConfig } from "eslint/config";
import jsxA11Y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    extends: compat.extends(
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:jsx-a11y/recommended",
      "plugin:prettier/recommended",
    ),

    plugins: {
      "react-hooks": fixupPluginRules(reactHooks),
      "simple-import-sort": simpleImportSort,
      "jsx-a11y": jsxA11Y,
      "@typescript-eslint": typescriptEslint,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "object-curly-spacing": ["error", "always"],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "prettier/prettier": ["error", { printWidth: 120 }],
    },
  },
]);
