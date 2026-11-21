"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { scrollToId } from "./scroll";

export type OrderPrefill = {
  occasion?: string;
  size?: string;
  flavour?: string;
  message?: string;
  style?: string;
  nonce: number;
};

type OrderCtx = {
  prefill: OrderPrefill | null;
  requestOrder: (p: Omit<OrderPrefill, "nonce">, target?: string) => void;
};

const Ctx = createContext<OrderCtx | null>(null);

let counter = 0;

export function OrderProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefill] = useState<OrderPrefill | null>(null);

  const requestOrder = useCallback((p: Omit<OrderPrefill, "nonce">, target = "order") => {
    counter += 1;
    setPrefill({ ...p, nonce: counter });
    scrollToId(target);
  }, []);

  const value = useMemo(() => ({ prefill, requestOrder }), [prefill, requestOrder]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useOrder() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useOrder must be used inside <OrderProvider>");
  return ctx;
}
