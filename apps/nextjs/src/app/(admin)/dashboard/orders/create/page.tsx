import { CreateOrderPage } from "~/components/create-order-page";
import { api } from "~/trpc/server";

export const runtime = "edge";
export default async function CreateOrder() {
  const books = await api.book.all();
  return <CreateOrderPage books={books} />;
}
