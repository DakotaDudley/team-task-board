import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
 test: {
  environment: "jsdom",
  globals: true,
  setupFiles: [fileURLToPath(new URL("./src/test/setup.ts", import.meta.url))],
  include: ["src/test/**/*.test.ts", "src/test/**/*.test.tsx"],  // ← add this
  coverage: {
    provider: "v8",
    reporter: ["text", "html"],
    include: ["src/logic/**", "src/api/**"],
    },
  },
});