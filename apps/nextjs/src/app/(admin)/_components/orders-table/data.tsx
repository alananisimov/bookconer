import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

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

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
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
