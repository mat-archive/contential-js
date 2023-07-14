export type PromptClientOptions = {
  apiUrl?: string;
  secretKey?: string;
};

export type PromptConfig = {
  secretKey: string;
};

export interface PromptOptions {
  prompt: string;
  onUpdate: PromptOnUpdate;
}

export type PromptOnUpdate = (data: PromptOptionsData) => void;

export interface PromptOptionsData {
  text: string;
}
