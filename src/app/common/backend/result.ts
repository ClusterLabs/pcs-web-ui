interface Valid<T> {
  valid: true;
  errors: string[];
  raw: any;
  response: T;
}

export interface Invalid {
  valid: false;
  errors: string[];
  raw: any;
  response: null;
}

export type ApiCallResult<T> = Valid<T>|Invalid;

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
