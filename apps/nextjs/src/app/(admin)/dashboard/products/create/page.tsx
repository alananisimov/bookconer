import { ProductEditForm } from "~/app/(admin)/_components/create-product";
import { api } from "~/trpc/server";

export default async function Dashboard() {
  const allGenres = await api.book.allGenres();
  const allAuthors = await api.book.allAuthors();
  return <ProductEditForm authors={allAuthors} genres={allGenres} />;
}
