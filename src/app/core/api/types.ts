export type ApiParams = Record<string, string>;
export type ApiCall = (url: string, params?: ApiParams) => any;
