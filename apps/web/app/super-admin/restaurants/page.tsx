'use client';

import { useState } from 'react';
import { api } from '../../../lib/api';

export default function RestaurantsPage() {
  const [name, setName] = useState('');

  const create = async () => {
    await api.post('/super/restaurants', {
      name,
      slug: name.toLowerCase().replaceAll(' ', '-'),
      subdomain: name.toLowerCase().replaceAll(' ', '-'),
      adminName: 'Owner',
      adminEmail: `${Date.now()}@example.com`,
      adminPassword: 'ChangeMe123!'
    });
    alert('Restaurant created');
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Create Restaurant Tenant</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} className="mt-4 rounded border p-2" placeholder="Restaurant name" />
      <button onClick={create} className="ml-3 rounded bg-black px-4 py-2 text-white">Create</button>
    </main>
  );
}
