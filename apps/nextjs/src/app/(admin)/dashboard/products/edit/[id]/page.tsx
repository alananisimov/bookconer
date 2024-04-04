import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@acme/ui/alert";

import { EditPage } from "~/app/(admin)/_components/edit-product";
import { api } from "~/trpc/server";

function NoBooks({ id }: { id: string }) {
  return (
    <div className="flex items-center justify-center">
      <Alert variant="default" className="h-fit max-w-sm">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>We have no books with id - {id}</AlertDescription>
      </Alert>
    </div>
  );
}

export default async function Dashboard({
  params,
}: {
  params: { id: string };
}) {
  const book = await api.book.byId({ id: parseInt(params.id, 10) });
  const authors = await api.book.allAuthors();
  const genres = await api.book.allGenres();
  if (!book) return <NoBooks id={params.id} />;
  return <EditPage book={book} authors={authors} genres={genres} />;
}
