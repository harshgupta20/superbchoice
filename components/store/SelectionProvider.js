"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { getDesign, codPrice } from "@/lib/designs";

const SelectionContext = createContext(null);

const D = getDesign("moon");
const FALLBACK = {
  designId: "moon",
  setDesignId: () => {},
  qty: 1,
  setQty: () => {},
  design: D,
  unitPrice: D.price,
  unitCod: codPrice(D),
  price: D.price,
  original: D.original,
  codTotal: codPrice(D),
  save: D.original - D.price,
  percent: Math.round(((D.original - D.price) / D.original) * 100),
  order: null,
};

export function useSelection() {
  return useContext(SelectionContext) || FALLBACK;
}

/**
 * Holds the shared product selection (design + quantity) so the main Buy button
 * and the sticky bottom bar always reflect the SAME choice, price and order.
 * Pricing is per-design (e.g. Lord Shiva costs more than Moon).
 */
export default function SelectionProvider({ children }) {
  const [designId, setDesignId] = useState("moon");
  const [qty, setQty] = useState(1);

  const value = useMemo(() => {
    const design = getDesign(designId);
    const unitPrice = design.price;
    const unitCod = codPrice(design);
    const price = unitPrice * qty;
    const original = design.original * qty;
    const codTotal = unitCod * qty;
    return {
      designId,
      setDesignId,
      qty,
      setQty,
      design,
      unitPrice,
      unitCod,
      price,
      original,
      codTotal,
      save: original - price,
      percent: Math.round(((original - price) / original) * 100),
      order: {
        title: `Crystal Ball Lamp — ${design.label}`,
        qty,
        note: `superb.choice ${design.label} x${qty}`,
        unitPrice,
        unitCod,
      },
    };
  }, [designId, qty]);

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}
