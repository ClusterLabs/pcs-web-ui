/* eslint-disable @typescript-eslint/no-explicit-any */
interface Valid<T> {
  valid: true;
  errors: string[];
  raw: any;
  response: T;
}

interface Invalid {
  valid: false;
  errors: string[];
  raw: any;
  response: null;
}

type ApiCallResult<T> = Valid<T> | Invalid;
export type ApiCall<R, P extends Array<any> = any[]> = (
  ...args: P
) => Promise<ApiCallResult<R>>;
export type ApiResponse<T> = T extends ApiCall<infer R> ? R : never;
export type ApiResult<T> = T extends ApiCall<infer R>
  ? ApiCallResult<R>
  : never;

export const createResultInvalid = (raw: any, errors: string[]): Invalid => ({
  valid: false,
  response: null,
  errors,
  raw,
});

export function createResult<T>(raw: any, errors: string[]): ApiCallResult<T> {
  if (errors.length > 0) {
    return createResultInvalid(raw, errors);
  }
  return {
    valid: true,
    response: raw as T,
    errors,
    raw,
  };
}
