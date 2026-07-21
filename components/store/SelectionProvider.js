"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { getDesign, DESIGN_PRICE, DESIGN_ORIGINAL } from "@/lib/designs";

const SelectionContext = createContext(null);

const FALLBACK = {
  designId: "moon",
  setDesignId: () => {},
  qty: 1,
  setQty: () => {},
  design: getDesign("moon"),
  price: DESIGN_PRICE,
  original: DESIGN_ORIGINAL,
  save: DESIGN_ORIGINAL - DESIGN_PRICE,
  percent: Math.round(((DESIGN_ORIGINAL - DESIGN_PRICE) / DESIGN_ORIGINAL) * 100),
  order: null,
};

export function useSelection() {
  return useContext(SelectionContext) || FALLBACK;
}

/**
 * Holds the shared product selection (design + quantity) so the main Buy button
 * and the sticky bottom bar always reflect the SAME choice, price and order.
 */
export default function SelectionProvider({ children }) {
  const [designId, setDesignId] = useState("moon");
  const [qty, setQty] = useState(1);

  const value = useMemo(() => {
    const design = getDesign(designId);
    const price = DESIGN_PRICE * qty;
    const original = DESIGN_ORIGINAL * qty;
    return {
      designId,
      setDesignId,
      qty,
      setQty,
      design,
      price,
      original,
      save: original - price,
      percent: Math.round(((original - price) / original) * 100),
      order: {
        title: `Crystal Ball Lamp — ${design.label}`,
        qty,
        amount: price,
        note: `superb.choice ${design.label} x${qty}`,
      },
    };
  }, [designId, qty]);

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}
