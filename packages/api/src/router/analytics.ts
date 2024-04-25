import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";

import { env } from "../../env";
import { adminProcedure } from "../trpc";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export interface ApiLoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    createdAt: string;
  };
}
export interface ApiStatsResponse {
  pageviews: { value: number; change: number };
  visitors: { value: number; change: number };
  visits: { value: number; change: number };
  bounces: { value: number; change: number };
  totaltime: { value: number; change: number };
}

export interface ApiViewsResponse {
  pageviews: { x: string; y: number }[];
  sessions: { x: string; y: number }[];
}
async function getToken() {
  const login = await fetch(env.UMAMI_API_CLIENT_ENDPOINT + "/auth/login", {
    cache: "force-cache",
    method: "POST",
    body: JSON.stringify({
      username: env.UMAMI_API_CLIENT_USER_LOGIN,
      password: env.UMAMI_API_CLIENT_USER_PASSWORD,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!login.ok) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: login.statusText,
    });
  }
  const { token }: ApiLoginResponse = await login.json();
  return token;
}

export const analyticsRouter = {
  stats: adminProcedure.query(async () => {
    const token = await getToken();
    const now = new Date();
    const startAt = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1,
    ).getTime();
    const endAt = now.getTime();
    const websiteId = "cec54e79-2f43-4821-b0bf-40f9550325dd";
    const statsUrl = `${env.UMAMI_API_CLIENT_ENDPOINT}/websites/${websiteId}/stats?startAt=${startAt}&endAt=${endAt}`;
    const stats = await fetch(statsUrl, {
      next: { revalidate: 30 },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!stats.ok) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: stats.statusText,
      });
    }
    const data: ApiStatsResponse = await stats.json();
    return data;
  }),
  views: adminProcedure.query(async () => {
    const token = await getToken();
    const now = new Date();
    const startAt = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1,
    ).getTime();
    const endAt = now.getTime();
    const websiteId = "cec54e79-2f43-4821-b0bf-40f9550325dd";
    const viewsUrl = `${env.UMAMI_API_CLIENT_ENDPOINT}/websites/${websiteId}/pageviews?startAt=${startAt}&endAt=${endAt}&unit=day&timezone=Europe%2FMoscow`;
    const views = await fetch(viewsUrl, {
      next: { revalidate: 30 },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!views.ok) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: views.statusText,
      });
    }
    const data: ApiViewsResponse = await views.json();
    return data;
  }),
  totalSales: adminProcedure.query(async ({ ctx }) => {
    const orders = await ctx.db.query.order.findMany({
      with: {
        orderedBooks: {
          with: {
            book: {
              columns: {
                price: true,
              },
            },
          },
          columns: {},
        },
      },
      columns: {},
    });
    const totalSales = orders.reduce((total, order) => {
      const orderTotal = order.orderedBooks.reduce((orderSum, orderedBook) => {
        return orderSum + orderedBook.book.price;
      }, 0);
      return total + orderTotal;
    }, 0);

    return totalSales;
  }),
  usersCount: adminProcedure.query(async ({ ctx }) => {
    return (await ctx.db.query.users.findMany()).length;
  }),
} satisfies TRPCRouterRecord;
