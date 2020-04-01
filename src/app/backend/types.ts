export type ApiParams = [string, string][];
/* eslint-disable @typescript-eslint/no-explicit-any */
export type ApiCall = (url: string, params?: ApiParams) => any;
