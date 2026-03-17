'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { RestaurantPayload } from '../types';

export default function TenantHome({ data }: { data: RestaurantPayload }) {
  const primary = data.settings?.theme?.primary || '#ef4444';

  return (
    <main className="min-h-screen">
      <section className="p-10 text-white" style={{ background: primary }}>
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-bold">
          {data.restaurant.name}
        </motion.h1>
        <p>{data.restaurant.tagline || 'Delicious food, delivered fast.'}</p>
        <div className="mt-6 flex gap-4">
          <Link href={`/${data.restaurant.subdomain}/menu`} className="rounded bg-white px-4 py-2 text-black">Order Now</Link>
          <Link href={`/${data.restaurant.subdomain}/order`} className="rounded border px-4 py-2">Book Table</Link>
        </div>
      </section>

      <section className="p-8">
        <h2 className="text-2xl font-semibold">Featured Dishes</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {data.featured.map((i) => (
            <article key={i._id} className="rounded bg-white p-4 shadow">
              <h3 className="font-semibold">{i.name}</h3>
              <p>₹{i.price}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
