import { trpc } from '@/utils/trpc';

export default function Home() {
  const hello = trpc.hello.useQuery({ text: 'client' });
  if (!hello.data) {
    return <div className="text-xl font-medium">Loading...</div>;
  }
  return (
    <div>
      <p className="text-xl font-medium">{hello.data.greeting}</p>
    </div>
  );
}
