import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const plugins = [react()];
  
  // Only add componentTagger if it doesn't cause issues
  try {
    if (mode === "development") {
      const { componentTagger } = require("lovable-tagger");
      plugins.push(componentTagger());
    }
  } catch (e) {
    console.warn("Component tagger not available, skipping...");
  }

  return {
    server: {
      host: "localhost",
      port: 8081,
      strictPort: false,
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      exclude: ["lovable-tagger"],
    },
  };
});
