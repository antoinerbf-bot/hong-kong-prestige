import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ContactBar } from "./ContactBar";
import { CartDrawer } from "./CartDrawer";
import { CartProvider } from "@/lib/cart";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 pt-16 sm:pt-20">{children}</main>
        <Footer />
        <ContactBar />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
