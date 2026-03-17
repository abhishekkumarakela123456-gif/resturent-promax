export const generateInvoiceHtml = (order, setting) => {
  const rows = order.items
    .map((item) => `<tr><td>${item.name}</td><td>${item.quantity}</td><td>${item.price}</td></tr>`)
    .join('');

  return `
    <h1>Invoice #${order.orderNumber}</h1>
    <p>${setting?.invoice?.legalName || 'Restaurant'}</p>
    <table border="1" cellpadding="8" cellspacing="0">
      <tr><th>Item</th><th>Qty</th><th>Price</th></tr>
      ${rows}
    </table>
    <p>Subtotal: ${order.subtotal}</p>
    <p>Tax: ${order.tax}</p>
    <h2>Total: ${order.total}</h2>
  `;
};
