import { CreateProduct } from "~/components/create-product-page";
import { api } from "~/trpc/server";

export const runtime = "edge";

export default async function Dashboard() {
  const allGenres = await api.book.allGenres();
  const allAuthors = await api.book.allAuthors();
  return <CreateProduct authors={allAuthors} genres={allGenres} />;
}
