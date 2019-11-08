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

export type ApiCallResult<T> = Valid<T>|Invalid;

export type ApiCallGeneratorResult<T> = IterableIterator<ApiCallResult<T>>;

export function createResult<T>(raw: any, errors: string[]): ApiCallResult<T> {
  if (errors.length > 0) {
    return {
      valid: false,
      response: null,
      errors,
      raw,
    };
  }
  return {
    valid: true,
    response: raw as T,
    errors,
    raw,
  };
}
