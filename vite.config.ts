import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api2.casablanca.ai", // Ziel-API
        changeOrigin: true,
        secure: false,
        
      },
    },
  },
});
