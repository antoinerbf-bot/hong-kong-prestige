// @lovable.dev/vite-tanstack-config already includes core plugins.
// Extra build/runtime opts go under `vite: { ... }` only.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    build: {
      // Modern browsers → smaller transforms, less polyfill noise
      target: "es2022",
      cssCodeSplit: true,
      cssMinify: true,
      minify: "esbuild",
      // Report compressed sizes in build log
      reportCompressedSize: true,
      // Inline only tiny assets; keep images as files
      assetsInlineLimit: 2048,
      sourcemap: false,
      // Raise warning threshold slightly after vendor split
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          /**
           * Stable, cache-friendly chunks.
           * Keep React separate so route chunks stay small and long-cacheable.
           */
          manualChunks(id: string) {
            if (!id.includes("node_modules")) return;

            // Core runtime — changes rarely
            if (
              id.includes("/react/") ||
              id.includes("/react-dom/") ||
              id.includes("/scheduler/")
            ) {
              return "vendor-react";
            }

            // Router / Start — app shell
            if (id.includes("@tanstack/")) {
              return "vendor-tanstack";
            }

            // Icons — tree-shaken but still group remaining icons
            if (id.includes("lucide-react")) {
              return "vendor-icons";
            }

            // Everything else from node_modules
            return "vendor";
          },
          // Predictable hashed names for long-term caching
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name ?? "asset";
            if (/\.css$/i.test(name)) return "assets/css/[name]-[hash][extname]";
            if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(name)) {
              return "assets/img/[name]-[hash][extname]";
            }
            if (/\.(woff2?|ttf|otf)$/i.test(name)) {
              return "assets/fonts/[name]-[hash][extname]";
            }
            return "assets/[name]-[hash][extname]";
          },
        },
        // Don't fail build on unresolved optional peer warnings
        onwarn(warning, warn) {
          if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
          warn(warning);
        },
      },
    },

    // Pre-bundle less in dev; keep server stable
    optimizeDeps: {
      include: ["react", "react-dom", "@tanstack/react-router", "clsx", "tailwind-merge"],
      exclude: [],
    },

    esbuild: {
      // Strip debug in production builds
      drop: process.env.NODE_ENV === "production" ? ["console", "debugger"] : [],
      legalComments: "none",
      target: "es2022",
    },

    // Avoid shipping huge local JPGs if something re-imports them
    server: {
      warmup: {
        clientFiles: ["./src/routes/index.tsx", "./src/components/HeroShowcase.tsx"],
      },
    },
  },
});
