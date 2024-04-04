import { authRouter } from "./router/auth";
import { bookRouter } from "./router/book";
import { orderRouter } from "./router/order";
import { postRouter } from "./router/post";
import { reviewRouter } from "./router/review";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  book: bookRouter,
  review: reviewRouter,
  order: orderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
