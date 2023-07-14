import { getClient as getApiClient } from '@contential/api';
import { PromptClientOptions, PromptOptions } from './types';

export const getClient = (options?: PromptClientOptions) => {
  const apiClient = getApiClient({
    url: options?.apiUrl,
    secretKey: options?.secretKey,
  });

  return {
    prompt: async (options: PromptOptions) => {
      const result = await apiClient.stream<{ text: string }>({
        path: '/prompt',
        data: { prompt: options.prompt },
        onUpdate: options.onUpdate,
      });

      return result;
    },
  };
};

export const testApi = 'testApi';
