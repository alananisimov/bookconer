import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@acme/ui/alert-dialog";
import { Button } from "@acme/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/dialog";
import { DropdownMenuShortcut } from "@acme/ui/dropdown-menu";
import { FormControl, FormLabel } from "@acme/ui/form";
import { Input } from "@acme/ui/input";
import { toast } from "@acme/ui/toast";

import { api } from "~/trpc/react";

export function ArchiveBookDialog({ bookId }: { bookId: number }) {
  const utils = api.useUtils();
  const archivateBook = api.book.updateStatus.useMutation({
    onSuccess: async () => {
      await utils.book.invalidate();
      toast.success("Книга успешно архивирована");
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be an admin in to archivate a book"
          : "Не удалось архивировать книгу",
      );
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="secondary" type="button">
          Архивировать
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            Вы обновите статус книги. Это повлияет на ее выдачу в поиске.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              archivateBook.mutate({ status: "archived", id: bookId })
            }
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
// TODO
// export function DeleteBooksDialog({ bookIds }: { bookIds: number[] }) {
//   const utils = api.useUtils();
//   const router = useRouter();
//   const deleteBook = api.book.delete.useMutation({
//     onSuccess: async () => {
//       toast.success("Книга успешно удалена");
//       router.refresh();
//       await utils.book.invalidate();
//     },
//     onError: (err) => {
//       toast.error(
//         err?.data?.code === "UNAUTHORIZED"
//           ? "You must be an admin in to delete a book"
//           : "Не удалось удалить книгу",
//       );
//     },
//   });
//   return (
//     <AlertDialog>
//       <AlertDialogTrigger asChild>
//         <button
//           type="button"
//           className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-red-600 outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
//         >
//           Удалить
//         </button>
//       </AlertDialogTrigger>
//       <AlertDialogContent>
//         <AlertDialogHeader>
//           <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
//           <AlertDialogDescription>
//             Вы удалите книгу. Это дейтвие будет нельзя отменить.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter>
//           <AlertDialogCancel>Отменить</AlertDialogCancel>
//           <AlertDialogAction onClick={() => deleteBook.mutate(bookId)}>
//             Продолжить
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }
export function DeleteBookDialog({ bookId }: { bookId: number }) {
  const utils = api.useUtils();
  const router = useRouter();
  const deleteBook = api.book.delete.useMutation({
    onSuccess: async () => {
      toast.success("Книга успешно удалена");
      router.refresh();
      await utils.book.invalidate();
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be an admin in to delete a book"
          : "Не удалось удалить книгу",
      );
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-red-600 outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
        >
          Удалить
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            Вы удалите книгу. Это дейтвие будет нельзя отменить.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteBook.mutate(bookId)}>
            Продолжить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export function DeleteOrderDialog({ orderId }: { orderId: number }) {
  const utils = api.useUtils();
  const router = useRouter();
  const deleteOrder = api.order.delete.useMutation({
    onSuccess: async () => {
      toast.success("Заказ успешно удален");
      router.refresh();
      await utils.book.invalidate();
    },
    onError: (err) => {
      toast.error(
        err?.data?.code === "UNAUTHORIZED"
          ? "You must be an admin in to delete a book"
          : "Не удалось удалить заказ",
      );
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-red-600 outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          Удалить
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
          <AlertDialogDescription>
            Вы удалите книгу. Это дейтвие будет нельзя отменить.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отменить</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteOrder.mutate({ id: orderId })}
          >
            Продолжить
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function CreateNewAuthorDialog({
  action,
}: {
  action: (newAuthor: string) => void;
}) {
  const [name, setName] = useState("");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative flex w-full cursor-pointer select-none flex-row items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          <div className="flex items-start gap-1 text-muted-foreground">
            <Plus className="size-5" />
            <div className="grid gap-0.5">
              <p>Добавить свой</p>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Добавить автора</DialogTitle>
          <DialogDescription>
            Напишите имя автора, а потом нажмите &quot;Добавить&quot;
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <FormLabel>Имя</FormLabel>
          <FormControl>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                onChange={(v) => setName(v.target.value)}
                value={name}
                placeholder="Б.Акунин"
                className="col-span-3"
              />
            </div>
          </FormControl>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={() => action(name)}>
              Добавить
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export function CreateNewGenreDialog({
  action,
}: {
  action: (newGenre: string) => void;
}) {
  const [genre, setGenre] = useState("");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative flex w-full cursor-pointer select-none flex-row items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          <div className="flex items-start gap-1 text-muted-foreground">
            <Plus className="size-5" />
            <div className="grid gap-0.5">
              <p>Добавить свой</p>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Добавить жанр</DialogTitle>
          <DialogDescription>
            Напишите название жанра, а потом нажмите &quot;Добавить&quot;
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <FormLabel>Жанр</FormLabel>
          <FormControl>
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                onChange={(v) => setGenre(v.target.value)}
                value={genre}
                placeholder="Фэнтези"
                className="col-span-3"
              />
            </div>
          </FormControl>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={() => action(genre)}>
              Добавить
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
