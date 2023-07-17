export type ChatClientOptions = {
  apiUrl?: string;
  key?: string;
};

export type ChatConfig = {
  key: string;
};

export interface ChatOptions {
  chatSessionId: string;
  messageUserId: string;
  text: string;
  onUpdate: ChatOnUpdate;
}

export type ChatOnUpdate = (data: ChatOptionsData) => void;

export interface ChatOptionsData {
  messages: Message[];
}

export interface Message {
  id: string;
  created: string;
  userId: string;
  projectId: string;
  chatSessionId: string;
  environment: string;
  type: MessageType;
  messageUserId: string;
  messageUserName?: string;
  text: string;
  metadata?: any;
}

export const MESSAGE_TYPES = ['ASSISTANT', 'SYSTEM', 'USER'] as const;

export type MessageType = (typeof MESSAGE_TYPES)[number];
