'use client';

import { useState } from 'react';
import { api } from '../../../../lib/api';

export default function OrderPage({ params }: { params: { tenant: string } }) {
  const [tableNumber, setTableNumber] = useState('');
  const [message, setMessage] = useState('');

  const submit = async () => {
    const restaurant = await api.get(`/public/restaurant/${params.tenant}`);
    await api.post(
      '/orders',
      {
        tableNumber,
        items: [{ name: 'Sample Dish', quantity: 1, price: 199 }],
        paymentMethod: 'cod'
      },
      { headers: { 'x-restaurant-id': restaurant.data.restaurant._id, authorization: `Bearer ${localStorage.getItem('token') || ''}` } }
    );
    setMessage('Order placed successfully');
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Scan & Order</h1>
      <input className="mt-4 rounded border p-2" placeholder="Table number" value={tableNumber} onChange={(e) => setTableNumber(e.target.value)} />
      <button onClick={submit} className="ml-2 rounded bg-red-500 px-4 py-2 text-white">Place Order</button>
      {message && <p className="mt-3 text-green-700">{message}</p>}
    </main>
  );
}
