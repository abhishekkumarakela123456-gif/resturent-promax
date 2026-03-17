import { api } from '../../../../lib/api';

export default async function MenuPage({ params }: { params: { tenant: string } }) {
  const restaurant = await api.get(`/public/restaurant/${params.tenant}`);
  const items = await api.get('/menu', { headers: { 'x-restaurant-id': restaurant.data.restaurant._id, authorization: `Bearer ${process.env.SERVICE_TOKEN || ''}` } });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">Menu</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {items.data.map((i: any) => (
          <div key={i._id} className="rounded bg-white p-4 shadow">
            <h3>{i.name}</h3>
            <p>{i.category}</p>
            <p>₹{i.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
