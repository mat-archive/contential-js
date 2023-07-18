import { getClient as getApiClient } from '../../api';
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
          chatSessionId: options.chatSessionId,
          messageUserId: options.messageUserId,
          text: options.text,
        },
        onUpdate: options.onUpdate,
      });

      return result;
    },
  };
};
