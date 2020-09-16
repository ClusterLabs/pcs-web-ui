import { ApiBadStatus, ApiNotExpectedJson } from "./errors";

type ApiParams = [string, string][];

const ajaxHeaders = {
  "X-Requested-With": "XMLHttpRequest",
};

const checkResponse = async (response: Response) => {
  if (!response.ok) {
    throw new ApiBadStatus(
      response.status,
      response.statusText,
      await response.text(),
    );
  }
  return response;
};

const httpParams = (params: ApiParams): string =>
  params
    .map(p => `${encodeURIComponent(p[0])}=${encodeURIComponent(p[1])}`)
    .join("&");

const getUrl = (path: string, params: ApiParams): string =>
  (params.length > 0 ? `${path}?${httpParams(params)}` : path);

// TODO duplicities

export const getJson = async (url: string, params: ApiParams = []) => {
  const response = await checkResponse(
    await fetch(getUrl(url, params), { headers: ajaxHeaders }),
  );

  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    throw new ApiNotExpectedJson(text);
  }

  return data;
};

export const getForText = async (url: string, params: ApiParams = []) => {
  const response = await checkResponse(
    await fetch(getUrl(url, params), { headers: ajaxHeaders }),
  );

  return response.text();
};

export const postForText = async (url: string, params: ApiParams = []) => {
  const response = await checkResponse(
    await fetch(url, {
      method: "post",
      headers: {
        ...ajaxHeaders,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: httpParams(params),
    }),
  );
  return response.text();
};

export const postForJson = async (url: string, params: ApiParams = []) => {
  const text = await postForText(url, params);
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new ApiNotExpectedJson(text);
  }
};

export const postJsonForText = async (
  url: string,
  payload: Record<string, unknown> | string | [] | null,
) => {
  const response = await checkResponse(
    await fetch(url, {
      method: "post",
      headers: {
        ...ajaxHeaders,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }),
  );
  return response.text();
};

export const postJsonForJson = async (
  url: string,
  payload: Record<string, unknown> | string | [] | null,
) => {
  const text = await postJsonForText(url, payload);
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new ApiNotExpectedJson(text);
  }
};
