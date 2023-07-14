export interface ContentialApiOptions {
  key?: string;
  url?: string;
}

export interface ContentialApiStreamOptions<ResponseData> {
  path: string;
  data?: unknown;
  onUpdate: (data: ResponseData) => void;
}
