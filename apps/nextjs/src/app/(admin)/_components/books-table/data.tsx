import { Archive, Power, PowerOff } from "lucide-react";

export const statuses = [
  {
    value: "active",
    label: "Активен",
    icon: Power,
  },
  {
    value: "disabled",
    label: "Отключен",
    icon: PowerOff,
  },
  {
    value: "archived",
    label: "В Архиве",
    icon: Archive,
  },
];

export const columns = [
  {
    label: "Дата создания",
    value: "createdAt",
  },
  {
    label: "Жанр",
    value: "genre",
  },
  {
    label: "Цена",
    value: "price",
  },
  {
    label: "Статус",
    value: "status",
  },
  {
    label: "Автор",
    value: "author",
  },
  {
    label: "Кол-во",
    value: "amount",
  },
  {
    label: "Название",
    value: "title",
  },
] as const;
