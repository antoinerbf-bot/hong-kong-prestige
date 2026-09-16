// Vite production builds already use Rollup.
// This config turns on explicit, aggressive tree-shaking options.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    build: {
      target: "es2022",
      cssCodeSplit: true,
      cssMinify: true,
      minify: "esbuild",
      reportCompressedSize: true,
      assetsInlineLimit: 2048,
      sourcemap: false,
      chunkSizeWarningLimit: 600,

      /**
       * modulePreload polyfill off → less runtime helper if not needed.
       * Rollup still emits native modulepreload links.
       */
      modulePreload: {
        polyfill: false,
      },

      rollupOptions: {
        /**
         * Tree-shaking (Rollup)
         * @see https://rollupjs.org/configuration-options/#treeshake
         */
        treeshake: {
          // Assume pure modules unless package.json says otherwise
          moduleSideEffects: (id, external) => {
            // Keep CSS / style side effects
            if (id.endsWith(".css") || id.includes(".css?")) return true;
            if (id.includes("tw-animate") || id.includes("tailwindcss")) return true;
            // External packages: trust their sideEffects field
            if (external) return "no-treeshake";
            // App source: safe to drop unused exports
            return false;
          },
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false,
          unknownGlobalSideEffects: false,
          // Correctness for annotations like /*#__PURE__*/
          annotations: true,
        },

        output: {
          // Prefer const / arrow after treeshake (smaller + clearer)
          generatedCode: {
            constBindings: true,
            objectShorthand: true,
            arrowFunctions: true,
          },

          manualChunks(id: string) {
            if (!id.includes("node_modules")) return;

            if (
              id.includes("/react/") ||
              id.includes("/react-dom/") ||
              id.includes("/scheduler/")
            ) {
              return "vendor-react";
            }

            if (id.includes("@tanstack/")) {
              return "vendor-tanstack";
            }

            // lucide: only imported icons survive treeshake; group remainder
            if (id.includes("lucide-react")) {
              return "vendor-icons";
            }

            return "vendor";
          },

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

          // Don't hoist pure re-exports in a way that blocks treeshake
          hoistTransitiveImports: false,
        },

        onwarn(warning, warn) {
          // "use client" / similar directives — noise only
          if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
          // Circular deps still useful to see
          if (warning.code === "CIRCULAR_DEPENDENCY") {
            warn(warning);
            return;
          }
          warn(warning);
        },
      },
    },

    optimizeDeps: {
      include: [
        "react",
        "react-dom",
        "@tanstack/react-router",
        "clsx",
        "tailwind-merge",
      ],
    },

    esbuild: {
      legalComments: "none",
      target: "es2022",
      drop: ["debugger"],
      // Help esbuild mark pure calls when possible
      treeShaking: true,
    },

    server: {
      warmup: {
        clientFiles: [
          "./src/routes/index.tsx",
          "./src/components/HeroShowcase.tsx",
        ],
      },
    },
  },
});
