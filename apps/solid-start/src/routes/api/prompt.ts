import { APIEvent, json } from 'solid-start/api';
import { getClient } from '@contential/prompt';

const client = getClient();

export async function GET({ params }: APIEvent) {
  const result = await client.prompt({
    prompt: 'say hi',
    onUpdate: (data) => {
      console.log(data);
    },
  });

  return json({ test: 'hi' });
}
