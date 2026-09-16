// @lovable.dev/vite-tanstack-config already includes core plugins.
// Extra build/runtime opts go under `vite: { ... }` only.
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
      rollupOptions: {
        output: {
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
    },

    esbuild: {
      legalComments: "none",
      target: "es2022",
      // console/debugger stripped only in production builds by Vite when
      // drop is set; apply via build.esbuild in practice through this field.
      drop: ["debugger"],
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
