import { getClient as getChatClient } from '@contential/chat';
import { getClient as getPromptClient } from '@contential/prompt';

const chatClient = getChatClient();
const chat = chatClient.chat;

const promptClient = getPromptClient();
const prompt = promptClient.prompt;

export const contential = {
  chat,
  prompt,
};

export default contential;
