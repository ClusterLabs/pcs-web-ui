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

export const httpLayer = {
  get: async (path: string, headers: Headers) => fetchResponse(path, {headers}),
  post: async (path: string, body: string, headers: Headers) =>
    fetchResponse(path, {method: "post", headers, body}),
};
