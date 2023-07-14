import { getClient } from '@contential/prompt';

const client = getClient();

export default function Home() {
  const test = () => {
    client.prompt({
      prompt: 'say hi',
      onUpdate: ({ text }) => {
        console.log(text);
      },
    });
  };

  return (
    <main className="flex w-screen h-screen items-center justify-center">
      <div
        className="text-4xl font-bold select-none cursor-pointer"
        onClick={() => test()}
      >
        Test
      </div>
    </main>
  );
}
