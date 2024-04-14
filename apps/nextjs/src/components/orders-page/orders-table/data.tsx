import {
  CheckCircledIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const statuses = [
  {
    value: "pending",
    label: "В процессе",
    icon: StopwatchIcon,
  },
  {
    value: "succeeded",
    label: "Завершено",
    icon: CheckCircledIcon,
  },
  {
    value: "failed",
    label: "Ошибка",
    icon: CrossCircledIcon,
  },
];

export const columns = [
  {
    label: "Дата создания",
    value: "createdAt",
  },
  {
    label: "Статус",
    value: "status",
  },
  {
    label: "Общая цена",
    value: "totalPrice",
  },
  {
    label: "Книги",
    value: "orderedBooks",
  },
] as const;
