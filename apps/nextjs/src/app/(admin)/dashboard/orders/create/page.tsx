import { CreateOrderPage } from "~/app/(admin)/_components/create-order";
import { api } from "~/trpc/server";

export const runtime = "edge";
export default async function CreateOrder() {
  const books = await api.book.all();
  return <CreateOrderPage books={books} />;
}
