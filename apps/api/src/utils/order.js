import { v4 as uuidv4 } from 'uuid';

export const orderNumber = () => `ORD-${uuidv4().slice(0, 8).toUpperCase()}`;

export const calculateOrderTotals = (items, taxPercent) => {
  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.price, 0);
  const tax = Number(((subtotal * taxPercent) / 100).toFixed(2));
  return { subtotal, tax, total: subtotal + tax };
};
