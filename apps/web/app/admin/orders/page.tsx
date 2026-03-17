import AdminShell from '../../../components/AdminShell';

export default function Page() {
  return (
    <AdminShell title="orders">
      <p className="rounded bg-white p-4 shadow">Manage orders with tenant-scoped APIs.</p>
    </AdminShell>
  );
}
