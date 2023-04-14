import { z } from 'zod';
import { useForm } from 'react-hook-form';

import { trpc } from '@/utils/trpc';

const formSchema = z.object({ name: z.string().min(1), age: z.string().min(1) });

type FormData = z.infer<typeof formSchema>;

export default function Home() {
  const allPlayers = trpc.players.all.useQuery();
  const addPlayer = trpc.players.add.useMutation({ onSuccess: () => allPlayers.refetch() });
  const updatePlayer = trpc.players.update.useMutation({ onSuccess: () => allPlayers.refetch() });
  const deletePlayer = trpc.players.delete.useMutation({ onSuccess: () => allPlayers.refetch() });

  const { register, handleSubmit, setValue } = useForm<FormData>();

  if (!allPlayers.data) {
    return <div className="text-xl font-medium">Loading...</div>;
  }

  const handleAdd = (data: FormData) => {
    addPlayer.mutate({ name: data.name, age: Number(data.age) });
    setValue('name', '');
    setValue('age', '17');
  };

  const handleUpdate = (id: string) => {
    updatePlayer.mutate({ id });
  };

  const handleDelete = (id: string) => {
    deletePlayer.mutate({ id });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Players</h2>
      <form onSubmit={handleSubmit(handleAdd)} className="mb-4">
        <input
          type="text"
          {...register('name')}
          placeholder="Player name"
          className="px-4 py-2 text-black"
        />
        <input
          type="number"
          defaultValue={17}
          min={17}
          {...register('age')}
          placeholder="Player age"
          className="px-4 py-2 text-black"
        />
        <button className="px-4 py-2 bg-red-500">Add</button>
      </form>
      <ul className="mb-4">
        {allPlayers.data.map((player) => (
          <li key={player.id} className="font-medium">
            {player.name} | {player.age} years old | Available: {player.available ? 'Yes' : 'No'} |{' '}
            <button onClick={() => handleUpdate(player.id)} className="underline">
              Update
            </button>{' '}
            |{' '}
            <button onClick={() => handleDelete(player.id)} className="underline">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
