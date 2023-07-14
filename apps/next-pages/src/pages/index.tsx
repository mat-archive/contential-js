import { getClient } from '@contential/prompt';

const client = getClient({
  apiUrl: 'http://localhost:5000',
  secretKey: 'sk_test_70da9aae1d2c0f289a74be4d8e248d0ae8fea914e1d0facefa',
});

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
