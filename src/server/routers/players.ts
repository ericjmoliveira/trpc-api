import { z } from 'zod';
import { procedure, router } from '../trpc';
import { randomUUID } from 'node:crypto';

let players = [
  { id: randomUUID(), name: 'Lionel Messi', age: 35, available: true },
  { id: randomUUID(), name: 'Cristiano Ronaldo', age: 38, available: true },
  { id: randomUUID(), name: 'Neymar', age: 31, available: true },
  { id: randomUUID(), name: 'Kylian Mbappé', age: 24, available: true },
  { id: randomUUID(), name: 'Erling Haaland', age: 22, available: true },
  { id: randomUUID(), name: 'Vinicius Junior', age: 22, available: true }
];

export const playersRouter = router({
  all: procedure.query(() => players),
  add: procedure
    .input(z.object({ name: z.string().min(1), age: z.number().min(17) }))
    .mutation(({ input }) => {
      const newPlayer = { id: randomUUID(), name: input.name, age: input.age, available: true };

      players.push(newPlayer);

      return newPlayer;
    }),
  update: procedure.input(z.object({ id: z.string().uuid() })).mutation(({ input }) => {
    players.forEach((player) => {
      if (player.id === input.id) {
        player.available = !player.available;
      }
    });

    return true;
  }),
  delete: procedure.input(z.object({ id: z.string().uuid() })).mutation(({ input }) => {
    const newData = players.filter((player) => player.id !== input.id);

    players = newData;

    return true;
  })
});
