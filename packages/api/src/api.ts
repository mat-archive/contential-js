import { ContentialApiOptions, ContentialApiStreamOptions } from './types';

export class ContentialApi {
  url: string;
  secretKey: string;

  constructor(options?: ContentialApiOptions) {
    this.url =
      options?.url ||
      process.env.CONTENTIAL_API_URL ||
      'https://api.contential.ai';
    this.secretKey =
      options?.secretKey || process.env.CONTENTIAL_SECRET_KEY || '';

    if (!this.secretKey) {
      throw new Error('Missing: secretKey');
    }
  }

  async stream<ResponseData>({
    path,
    data,
    onUpdate,
  }: ContentialApiStreamOptions<ResponseData>) {
    try {
      const url = `${this.url}${path}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.secretKey}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const body = response.body;

      if (!body) {
        return;
      }

      const start = Date.now();
      const reader = body.getReader();
      const decoder = new TextDecoder();
      let isDone = false;

      while (!isDone) {
        try {
          const { value, done } = await reader.read();
          const chunkValue = decoder.decode(value);
          const dataString = chunkValue.split('data: ')[1] || chunkValue;

          try {
            const data = JSON.parse(dataString) as ResponseData;

            onUpdate(data);
          } catch (error) {
            // do nothing
          }

          if (chunkValue.includes('[DONE]')) {
            const end = Date.now();
            const totalTime = end - start;
          }

          isDone = done;
        } catch (error) {
          isDone = true;
          console.log(error);
        }
      }

      return {};
    } catch (error) {
      console.log(error);
    }
  }
}

export const getClient = (options?: ContentialApiOptions) => {
  return new ContentialApi(options);
};
