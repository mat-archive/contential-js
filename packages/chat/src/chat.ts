import { getClient as getApiClient } from '@contential/api';
import { ChatClientOptions, ChatOptions, ChatOptionsData } from './types';

export const getClient = (options?: ChatClientOptions) => {
  const apiClient = getApiClient({
    url: options?.apiUrl,
    key: options?.key,
  });

  return {
    chat: async (options: ChatOptions) => {
      const result = await apiClient.stream<ChatOptionsData>({
        path: '/chat',
        data: {
          chatSessionId: 'chat_5f91a6469d83c5158645cf86b2acfbda92382dce',
          messageUserId: 'user_123',
          text: options.text,
        },
        onUpdate: options.onUpdate,
      });

      return result;
    },
  };
};

export const testApi = 'testApi';
