type HttpOptions = {
  address?: string;
  tls?: {
    validate?: boolean;
  };
};

type HttpHeaders = Record<string, string>;

type HttpOperations = {
  get: (
    _path: string,
    _params: Record<string, string | string[]>,
    _headers: HttpHeaders,
  ) => Promise<string>;
  post: (
    _path: string,
    _body: string | Record<string, string>,
    _headers: HttpHeaders,
  ) => Promise<string>;
};

type Cockpit = {
  http: (_endpoint: string | number, _options?: HttpOptions) => HttpOperations;
};

// indicate that the file is a module
// https://stackoverflow.com/a/59499895
// https://stackoverflow.com/a/42257742
export { };

declare global {
  /* eslint-disable-next-line  */
  var cockpit: Cockpit;
}
