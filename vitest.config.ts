/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    // ... Specify options here.
    environment: "jsdom",
    globals: true, // 👈 makes expect, describe, it global (no need to import)
    setupFiles: "tests/setup.ts",
  },
});
