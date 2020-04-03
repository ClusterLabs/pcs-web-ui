/* eslint-disable max-classes-per-file */
const captureStackTraceAlternative = (error: Error, message: string): void => {
  Object.defineProperty(error, "stack", {
    // enumerable: true,
    writable: true,
    configurable: true,
    // prettier-ignore
    value: (new Error(message)).stack,
  });
};

export class ApiBadStatus extends Error {
  statusCode: number;
  text: string;
  body: string;

  constructor(statusCode: number, text: string, body: string) {
    super(
      `Server returned the http status error ${statusCode} (${text}): ${body}`,
    );

    if (Object.prototype.hasOwnProperty.call(Error, "captureStackTrace")) {
      // V8
      Error.captureStackTrace(this, ApiBadStatus);
    } else {
      // e.g. Firefox
      captureStackTraceAlternative(this, body);
    }
    this.name = "ApiBadStatus";
    this.statusCode = statusCode;
    this.text = text;
    this.body = body;
  }
}

export class ApiNotExpectedJson extends Error {
  text: string;

  constructor(text: string) {
    super("Not expected json in server response");
    if (Object.prototype.hasOwnProperty.call(Error, "captureStackTrace")) {
      // V8
      Error.captureStackTrace(this, ApiNotExpectedJson);
    } else {
      // e.g. Firefox
      captureStackTraceAlternative(this, text);
    }
    this.name = "ApiNotExpectedJson";
    this.text = text;
  }
}

export function isUnauthorizedError<T extends Error>(error: T) {
  return error instanceof ApiBadStatus && error.statusCode === 401;
}

export function failMessage<T extends Error>(error: T): string {
  if (error instanceof ApiBadStatus) {
    // prettier-ignore
    return (
      `Server returned http status error ${error.statusCode} (${error.text})`
    );
  }
  if (error instanceof ApiNotExpectedJson) {
    return `Data returned from server is not in JSON format: '${error.text}'`;
  }
  return error.message;
}
