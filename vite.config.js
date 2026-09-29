import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// The Base44 plugin only runs inside the Base44 platform build (where
// VITE_BASE44_APP_ID is provided). Standalone builds (VS Code, Vercel, GitHub)
// get a plain Vite + React setup with no platform runtime injected.
const isOnBase44 = Boolean(process.env.VITE_BASE44_APP_ID);

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    ...(isOnBase44
      ? [
          base44({
            // Support for legacy code that imports the base44 SDK with @/integrations, @/entities, etc.
            // can be removed if the code has been updated to use the new SDK imports from @base44/sdk
            legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
            hmrNotifier: true,
            navigationNotifier: true,
            analyticsTracker: true,
            visualEditAgent: true
          }),
        ]
      : []),
    react(),
  ]
});