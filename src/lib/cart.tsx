import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getService } from "./services";

export type CartItem = {
  serviceSlug: string;
  tierIndex: number;
  qty: number;
};

type Ctx = {
  items: CartItem[];
  count: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (serviceSlug: string, tierIndex?: number) => void;
  remove: (serviceSlug: string, tierIndex: number) => void;
  clear: () => void;
};

const STORAGE = "hkcb-cart";
const CartContext = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const add = useCallback((serviceSlug: string, tierIndex = 0) => {
    if (!getService(serviceSlug)) return;
    setItems((prev) => {
      const i = prev.findIndex(
        (x) => x.serviceSlug === serviceSlug && x.tierIndex === tierIndex,
      );
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i]!, qty: next[i]!.qty + 1 };
        return next;
      }
      return [...prev, { serviceSlug, tierIndex, qty: 1 }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((serviceSlug: string, tierIndex: number) => {
    setItems((prev) =>
      prev.filter((x) => !(x.serviceSlug === serviceSlug && x.tierIndex === tierIndex)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = useMemo(() => items.reduce((n, x) => n + x.qty, 0), [items]);

  const value = useMemo(
    () => ({ items, count, open, setOpen, add, remove, clear }),
    [items, count, open, add, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
