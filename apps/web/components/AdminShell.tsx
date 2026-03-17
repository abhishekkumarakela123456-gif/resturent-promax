import Link from 'next/link';

const links = [
  'dashboard',
  'menu',
  'orders',
  'reservations',
  'offers',
  'analytics',
  'settings',
  'payments',
  'notifications',
  'qr',
  'invoices'
];

export default function AdminShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 p-6 text-white">
        <h2 className="text-xl font-bold">Restaurant Admin</h2>
        <nav className="mt-4 space-y-2">
          {links.map((l) => (
            <Link key={l} className="block rounded px-2 py-1 hover:bg-gray-700" href={`/admin/${l}`}>
              {l}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <h1 className="mb-6 text-2xl font-semibold capitalize">{title}</h1>
        {children}
      </main>
    </div>
  );
}
