export const roles = [
  {
    label: "Юзер",
    value: "user",
  },
  {
    label: "Модератор",
    value: "moderator",
  },
  {
    label: "Админ",
    value: "admin",
  },
] as const;

export const DEPLOY_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000";
export const VERCEL_ENV = process.env.VERCEL_ENV;
export const REVALIDATE_TIME = 300;
export const SITE_URL = "https://bookconer.site";
