import { z } from 'zod';
import { procedure, router } from '../trpc';

export const playersRouter = router({
  all: procedure.query(async ({ ctx }) => {
    const players = await ctx.prisma.player.findMany({ orderBy: { name: 'asc' } });

    return players;
  }),
  add: procedure
    .input(z.object({ name: z.string().min(1), age: z.number().min(17) }))
    .mutation(async ({ ctx, input }) => {
      const playerData = { name: input.name, age: input.age };

      const player = await ctx.prisma.player.create({ data: playerData });

      return player;
    }),
  update: procedure
    .input(z.object({ id: z.string().uuid(), available: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const player = await ctx.prisma.player.update({
        where: { id: input.id },
        data: { available: input.available }
      });

      return player;
    }),
  delete: procedure.input(z.object({ id: z.string().uuid() })).mutation(async ({ ctx, input }) => {
    const player = await ctx.prisma.player.delete({ where: { id: input.id } });

    return player;
  })
});
