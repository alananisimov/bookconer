import Typography from "@acme/ui/typography";

import { BooksList } from "~/components/index-page/books/books";
import FilterSidebar, {
  FilterDrawer,
} from "~/components/index-page/layout/filters";
import { api } from "~/trpc/server";

export const runtime = "edge";

export default async function Home() {
  const books = api.book.all();
  const minAndMax = await api.book.minAndMaxPrice();
  return (
    <main className="grid flex-1 gap-4 overflow-auto p-2 sm:p-4 md:grid-cols-4 lg:grid-cols-5">
      <FilterSidebar minAndMax={minAndMax} />
      <div className="relative flex h-full flex-col gap-y-4 rounded-xl p-4 md:col-span-3 lg:col-span-4">
        <Typography variant={"h1"} className="inline-flex justify-between">
          Наши книги
          <FilterDrawer minAndMax={minAndMax} />
        </Typography>
        <BooksList books={books} />
      </div>
    </main>
  );
}
