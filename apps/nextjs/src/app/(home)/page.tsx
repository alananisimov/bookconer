import Typography from "@acme/ui/typography";

import { BooksList } from "~/app/(home)/_components/books";
import FilterSidebar, { FilterDrawer } from "~/app/(home)/_components/filters";
import Header from "~/app/(home)/_components/header";
import { api } from "~/trpc/server";

export const runtime = "edge";

export default async function Home() {
  const books = api.book.all();
  const minAndMax = await api.book.minAndMaxPrice();
  return (
    <div className="flex flex-col">
      <Header />
      <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-4 lg:grid-cols-5">
        <FilterSidebar minAndMax={minAndMax} />
        <div className="relative flex h-full min-h-[50vh] flex-col gap-y-4 rounded-xl p-4 md:col-span-3 lg:col-span-4">
          <Typography variant={"h1"} className="inline-flex justify-between">
            Наши книги
            <FilterDrawer minAndMax={minAndMax} />
          </Typography>
          <BooksList books={books} />
        </div>
      </main>
    </div>
  );
}
