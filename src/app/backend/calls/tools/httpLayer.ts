type Headers = Record<string, string>;

export type HttpResponse = {
  status: number;
  statusText: string;
  text: string;
};

const fetchResponse = async (
  ...args: Parameters<typeof fetch>
): Promise<HttpResponse> => {
  const response = await fetch(...args);
  return {
    status: response.status,
    statusText: response.statusText,
    text: await response.text(),
  };
};

export const httpLayer =
  process.env.REACT_APP_PCS_WEB_UI_ENVIRONMENT === "cockpit"
    ? {
        get: async (path: string, headers: Headers) => {
          try {
            const http = cockpit.http("/var/run/pcsd.socket");
            const result = await http.get(path, {}, headers);
            return {
              status: 200,
              statusText: "OK",
              text: result,
            };
          } catch (e) {
            const exception = e as {
              message: string;
              status: number;
              reason: string;
            };
            return {
              status: exception.status,
              statusText: exception.reason,
              text: exception.message,
            };
          }
        },
        // TODO
        post: async (path: string, body: string, headers: Headers) => {
          try {
            const http = cockpit.http("/var/run/pcsd.socket");
            const result = await http.post(path, body, headers);
            return {
              status: 200,
              statusText: "OK",
              text: result,
            };
          } catch (e) {
            const exception = e as {
              message: string;
              status: number;
              reason: string;
            };
            return {
              status: exception.status,
              statusText: exception.reason,
              text: exception.message,
            };
          }
        },
      }
    : {
        get: async (path: string, headers: Headers) =>
          fetchResponse(path, {headers}),
        post: async (path: string, body: string, headers: Headers) =>
          fetchResponse(path, {method: "post", headers, body}),
      };
