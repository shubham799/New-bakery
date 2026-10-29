// Shared order state: items added in Scenes 3, 5 and 6 show up in Scene 7.
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { itemById, formatPrice, formatTotal, brand } from '../data/content';

const OrderContext = createContext(null);

const lineKey = (itemId, filling) => `${itemId}|${filling ?? ''}`;

export function OrderProvider({ children }) {
  const [lines, setLines] = useState([]); // [{ key, itemId, qty, filling }]
  const [toast, setToast] = useState(null);
  const toastTimer = useRef();

  const notify = useCallback((message) => {
    clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message });
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const add = useCallback(
    (itemId, { qty = 1, filling = null, silent = false } = {}) => {
      setLines((prev) => {
        const key = lineKey(itemId, filling);
        const existing = prev.find((l) => l.key === key);
        if (existing) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l));
        return [...prev, { key, itemId, qty, filling }];
      });
      if (!silent) {
        const item = itemById[itemId];
        const pickLater = item.requiresFilling && !filling ? ' — choose a filling there' : '';
        notify(`Added ${lineLabel({ itemId, filling })} to your box${pickLater}`);
      }
    },
    [notify],
  );

  const setQty = useCallback((key, qty) => {
    setLines((prev) =>
      qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l)),
    );
  }, []);

  const qtyFor = useCallback(
    (itemId, filling = null) => lines.find((l) => l.key === lineKey(itemId, filling))?.qty ?? 0,
    [lines],
  );

  const changeQty = useCallback(
    (itemId, delta, filling = null) => {
      const key = lineKey(itemId, filling);
      setLines((prev) => {
        const existing = prev.find((l) => l.key === key);
        if (!existing) return delta > 0 ? [...prev, { key, itemId, qty: delta, filling }] : prev;
        const qty = existing.qty + delta;
        return qty <= 0 ? prev.filter((l) => l.key !== key) : prev.map((l) => (l.key === key ? { ...l, qty } : l));
      });
    },
    [],
  );

  // Bomboloni added without a filling get one chosen later in the box.
  const setFilling = useCallback((key, filling) => {
    setLines((prev) => {
      const line = prev.find((l) => l.key === key);
      if (!line) return prev;
      const nextKey = lineKey(line.itemId, filling);
      const merged = prev.find((l) => l.key === nextKey);
      if (merged) {
        return prev.filter((l) => l.key !== key).map((l) => (l.key === nextKey ? { ...l, qty: l.qty + line.qty } : l));
      }
      return prev.map((l) => (l.key === key ? { ...l, key: nextKey, filling } : l));
    });
  }, []);

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + itemById[l.itemId].price * l.qty, 0),
    [lines],
  );
  const count = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);
  const missingFilling = lines.some((l) => itemById[l.itemId].requiresFilling && !l.filling);

  const value = useMemo(
    () => ({ lines, add, setQty, changeQty, qtyFor, setFilling, subtotal, count, missingFilling, toast, notify }),
    [lines, add, setQty, changeQty, qtyFor, setFilling, subtotal, count, missingFilling, toast, notify],
  );
  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
  return useContext(OrderContext);
}

export function lineLabel(line) {
  const item = itemById[line.itemId];
  const prefix = item.groupId === 'bomboloni' ? 'BOMBOLONI — ' : '';
  return `${prefix}${item.name}${line.filling ? ` (${line.filling})` : ''}`;
}

// WhatsApp message: each item with quantity and price, subtotal, fulfilment,
// date and note. No online payment.
export function buildOrderMessage({ lines, subtotal, fulfilment, date, note }) {
  const rows = lines.map((line) => {
    const item = itemById[line.itemId];
    const each = formatPrice(item.priceStyle, item.price);
    return `• ${line.qty} × ${lineLabel(line)} [${item.sectionTitle}] — ${each} each = ${formatTotal(item.price * line.qty)}`;
  });
  const when = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : 'Please suggest a date';
  const parts = [
    `Hello ${brand.name}! I'd like to place a pre-order:`,
    '',
    ...rows,
    '',
    fulfilment === 'delivery'
      ? `Subtotal (delivery charges extra): ${formatTotal(subtotal)}`
      : `Subtotal: ${formatTotal(subtotal)}`,
    `Fulfilment: ${fulfilment === 'delivery' ? `DELIVERY (via RAPIDO / PORTER)` : 'SELF PICK-UP'}`,
    `Date: ${when}`,
  ];
  if (note?.trim()) parts.push(`Note: ${note.trim()}`);
  return parts.join('\n');
}

export function whatsappHref(text) {
  return `https://wa.me/${brand.phoneIntl}?text=${encodeURIComponent(text)}`;
}
