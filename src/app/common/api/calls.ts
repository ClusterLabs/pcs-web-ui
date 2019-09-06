import { ApiNotExpectedJson, ApiBadStatus } from "./errors";
import { ApiParams } from "./types";

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

const httpParams = (params: ApiParams): string => (
  Object.keys(params)
    .map(key => (
      `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    ))
    .join("&")
);

const getUrl = (path: string, params: ApiParams): string => (
  Object.keys(params).length > 0 ? `${path}?${httpParams(params)}` : path
);

export const getJson = async (url: string, params: ApiParams = {}) => {
  const response = await checkResponse(
    await fetch(getUrl(url, params), { headers: ajaxHeaders }),
  );

  const text = await response.text();
  let data;
  try {
    // var - to be visible outside the try block
    data = JSON.parse(text);
  } catch (e) {
    throw new ApiNotExpectedJson(text);
  }

  return data;
};

export const getForText = async (url: string, params: ApiParams = {}) => {
  const response = await checkResponse(
    await fetch(getUrl(url, params), { headers: ajaxHeaders }),
  );

  return await response.text();
};

export const postForText = async (
  url: string,
  params: ApiParams = {},
) => {
  const response = await checkResponse(await fetch(url, {
    method: "post",
    headers: {
      ...ajaxHeaders,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: httpParams(params),
  }));
  return await response.text();
};
