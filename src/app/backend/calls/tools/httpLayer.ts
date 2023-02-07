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

const fetchCockpitResponse = async (
  cockpit: Cockpit,
  {
    path,
    headers,
    body,
  }: {
    path: string;
    headers: Headers;
    body?: string;
  },
) => {
  try {
    const http = cockpit.http(
      process.env.REACT_APP_PCS_WEB_UI_COCKPIT_ENDPOINT
        ?? "/var/run/pcsd.socket",
    );
    const result = await (body === undefined
      ? http.get(path, {}, headers)
      : http.post(path, body, headers));
    return {
      status: 200,
      statusText: "OK",
      text: result,
    };
  } catch (e) {
    const exception = e as
      | {
          message: string;
          status: number;
          reason: string;
        }
      | {
          message: string;
          problem: string;
        };

    if ("status" in exception) {
      return {
        status: exception.status,
        statusText: exception.reason,
        text: exception.message,
      };
    }
    return {
      status: 500,
      statusText: exception.problem,
      text: exception.message,
    };
  }
};

export const httpLayer =
  process.env.REACT_APP_PCS_WEB_UI_ENVIRONMENT === "cockpit"
    ? {
        get: async (path: string, headers: Headers) =>
          fetchCockpitResponse(cockpit, {path, headers}),
        post: async (path: string, body: string, headers: Headers) =>
          fetchCockpitResponse(cockpit, {path, headers, body}),
      }
    : {
        get: async (path: string, headers: Headers) =>
          fetchResponse(path, {headers}),
        post: async (path: string, body: string, headers: Headers) =>
          fetchResponse(path, {method: "post", headers, body}),
      };
