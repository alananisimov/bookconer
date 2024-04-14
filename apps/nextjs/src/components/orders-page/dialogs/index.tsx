import { useRouter } from "next/navigation";

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
import { DropdownMenuShortcut } from "@acme/ui/dropdown-menu";
import { toast } from "@acme/ui/toast";

import { api } from "~/trpc/react";

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
