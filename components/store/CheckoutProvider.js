"use client";

import { createContext, useCallback, useContext, useState } from "react";
import Checkout from "./Checkout";

const CheckoutContext = createContext(null);

export function useCheckout() {
  return useContext(CheckoutContext) || { open: () => {} };
}

/**
 * Mounts a single Checkout sheet and exposes `open(order)` to descendants.
 * order = { title, qty, amount, note }
 */
export default function CheckoutProvider({ children }) {
  const [order, setOrder] = useState(null);
  const open = useCallback((o) => setOrder(o), []);
  const close = useCallback(() => setOrder(null), []);

  return (
    <CheckoutContext.Provider value={{ open }}>
      {children}
      <Checkout order={order} onClose={close} />
    </CheckoutContext.Provider>
  );
}
