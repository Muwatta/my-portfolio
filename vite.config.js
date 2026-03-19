import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    // Split vendor chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          router: ["react-router-dom"],
          motion: ["framer-motion"],
          icons: ["react-icons"],
        },
      },
    },
    // Warn if any chunk exceeds 500kb
    chunkSizeWarningLimit: 500,
    // Minify output
    minify: "esbuild",
    // Generate source maps for error tracking (optional — remove if you want)
    sourcemap: false,
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion", "react-router-dom"],
  },
});
