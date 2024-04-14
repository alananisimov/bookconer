import { useState } from "react";

import { Button } from "@acme/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@acme/ui/dialog";
import { FormControl, FormLabel } from "@acme/ui/form";
import { Input } from "@acme/ui/input";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type CreateNewAuthorDialogProps = {
  action: (newAuthor: string) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};
export function CreateNewAuthorDialog({
  action,
  open,
  setOpen,
}: CreateNewAuthorDialogProps) {
  const [name, setName] = useState("");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <div className="flex items-center gap-4">
              <Input
                onChange={(v) => setName(v.target.value)}
                value={name}
                placeholder="Б.Акунин"
                className="w-full"
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

type CreateNewGenreDialogProps = CreateNewAuthorDialogProps;

export function CreateNewGenreDialog({
  action,
  open,
  setOpen,
}: CreateNewGenreDialogProps) {
  const [genre, setGenre] = useState("");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <div className="flex items-center gap-4">
              <Input
                onChange={(v) => setGenre(v.target.value)}
                value={genre}
                placeholder="Фэнтези"
                className="w-full"
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
