import { router } from '../trpc';

import { playersRouter } from './players';

export const appRouter = router({
  players: playersRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
