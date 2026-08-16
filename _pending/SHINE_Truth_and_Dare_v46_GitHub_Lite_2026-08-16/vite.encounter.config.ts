import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

const encounterRoot = fileURLToPath(new URL("./app/encounter", import.meta.url));
const encounterOutput = fileURLToPath(new URL("./public/v40", import.meta.url));

export default defineConfig({
  root: encounterRoot,
  base: "./",
  plugins: [react()],
  build: {
    outDir: encounterOutput,
    emptyOutDir: false,
    sourcemap: false,
  },
});
