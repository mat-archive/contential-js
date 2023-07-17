import { getApiUrl, getKey, isClient, isSecretKey } from './utils';
import { ContentialApiOptions, ContentialApiStreamOptions } from './types';

export class ContentialApi {
  url: string;
  key: string;

  constructor(options?: ContentialApiOptions) {
    this.url = getApiUrl(options?.url);
    this.key = getKey(options?.key);

    if (!this.key) {
      throw new Error('Missing: key');
    }

    if (isClient() && isSecretKey(this.key)) {
      throw new Error(
        'Using secret key on client is not allowed. Please use publishable key instead (pk_...).',
      );
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
          Authorization: `Bearer ${this.key}`,
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
    } catch (error) {
      console.log(error);
    }
  }
}

export const getClient = (options?: ContentialApiOptions) => {
  return new ContentialApi(options);
};
