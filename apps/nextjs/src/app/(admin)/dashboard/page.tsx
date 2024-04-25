import AdminPage from "~/components/admin-page";
import { api } from "~/trpc/server";

export const runtime = "edge";

export default async function Dashboard() {
  const stats = api.analytics.stats();
  const totalSales = api.analytics.totalSales();
  const views = api.analytics.views();
  const usersCount = api.analytics.usersCount();
  return (
    <AdminPage
      viewsData={views}
      totalSalesData={totalSales}
      usersCountData={usersCount}
      statsData={stats}
    />
  );
}
