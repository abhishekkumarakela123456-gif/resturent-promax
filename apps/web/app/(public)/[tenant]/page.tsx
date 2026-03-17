import TenantHome from '../../../components/TenantHome';
import { api } from '../../../lib/api';
import { RestaurantPayload } from '../../../types';

export default async function TenantPage({ params }: { params: { tenant: string } }) {
  const { data } = await api.get<RestaurantPayload>(`/public/restaurant/${params.tenant}`);
  return <TenantHome data={data} />;
}
