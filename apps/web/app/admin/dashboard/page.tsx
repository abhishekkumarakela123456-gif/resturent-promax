import AdminShell from '../../../components/AdminShell';

export default function Page() {
  return (
    <AdminShell title="dashboard">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded bg-white p-4 shadow">Orders Today</div>
        <div className="rounded bg-white p-4 shadow">Revenue</div>
        <div className="rounded bg-white p-4 shadow">Reservations</div>
      </div>
    </AdminShell>
  );
}
