import { EditProduct } from "~/app/(admin)/_components/create-product";
import { api } from "~/trpc/server";

export const runtime = "edge";

export default async function Dashboard() {
  const allGenres = await api.book.allGenres();
  const allAuthors = await api.book.allAuthors();
  return <EditProduct authors={allAuthors} genres={allGenres} />;
}
