import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { getClient } from '@contential/prompt';

const client = getClient();

type Data = {
  prompt: string;
};

export const config = {
  runtime: 'edge',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  await client.prompt({
    prompt: 'say hi',
    onUpdate: (data) => {
      console.log(data);
    },
  });

  return NextResponse.json({ test: 'hi' });
}
