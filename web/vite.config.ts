import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@domain": path.resolve(__dirname, "./src/core/domains"),
      "@infra": path.resolve(__dirname, "./src/core/infra"),
      "@application": path.resolve(__dirname, "./src/core/application"),
      "@templates": path.resolve(__dirname, "./src/templates"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
});
