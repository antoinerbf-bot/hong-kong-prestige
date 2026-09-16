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
      modulePreload: { polyfill: false },
      rollupOptions: {
        treeshake: {
          moduleSideEffects: (id, external) => {
            if (id.endsWith(".css") || id.includes(".css?")) return true;
            if (id.includes("tw-animate") || id.includes("tailwindcss")) return true;
            if (external) return "no-treeshake";
            return false;
          },
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false,
          unknownGlobalSideEffects: false,
          annotations: true,
        },
        output: {
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

            // Per-icon ESM paths land here as tiny modules; keep them together
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
          hoistTransitiveImports: false,
        },
        onwarn(warning, warn) {
          if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
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
      // Don't prebundle the full lucide barrel — we import per-icon ESM files
      exclude: ["lucide-react"],
    },

    esbuild: {
      legalComments: "none",
      target: "es2022",
      drop: ["debugger"],
      treeShaking: true,
    },

    server: {
      warmup: {
        clientFiles: ["./src/routes/index.tsx", "./src/components/HeroShowcase.tsx"],
      },
    },
  },
});
