import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Use React 17's automatic JSX runtime
      jsxRuntime: "automatic",
    }),
  ],
});
