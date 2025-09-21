import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      // Disable "any" rule so it won't block builds
      "@typescript-eslint/no-explicit-any": "off",

      // (Optional) You could also allow "require" style imports if needed
      // "@typescript-eslint/no-var-requires": "off",
    },
  },
];

export default eslintConfig;
