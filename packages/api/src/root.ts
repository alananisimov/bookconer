import { analyticsRouter } from "./router/analytics";
import { bookRouter } from "./router/book";
import { orderRouter } from "./router/order";
import { reviewRouter } from "./router/review";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  book: bookRouter,
  review: reviewRouter,
  order: orderRouter,
  analytics: analyticsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
