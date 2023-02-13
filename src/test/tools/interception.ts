import * as playwright from "playwright";

type ParsedQuery = Record<string, string | string[]>;

const parse = (queryString: string) => {
  const query: ParsedQuery = {};
  for (const [key, value] of new URLSearchParams(queryString)) {
    query[key] =
      key in query ? ([] as string[]).concat(query[key], value) : value;
  }
  return query;
};

const parseUrl = (rawUrl: string) => {
  const hashStart = rawUrl.indexOf("#");
  const url = hashStart === -1 ? rawUrl : rawUrl.slice(0, hashStart);

  const queryStart = url.indexOf("?");
  return queryStart === -1
    ? {url, query: {}}
    : {
        url: url.slice(0, queryStart),
        query: parse(url.slice(queryStart)),
      };
};

export type RequestData = {
  body?: ParsedQuery | null;
  query?: ParsedQuery | null;
  payload?: ReturnType<typeof JSON.parse> | null;
};
type Handler = (_route: playwright.Route, _request: playwright.Request) => void;
type RouteUrl = string | RegExp;
export type RouteResponse =
  | {handler: Handler}
  | {text: string}
  | {json: ReturnType<typeof JSON.parse>}
  | {status: [number, string] | number};

export type Route = {url: RouteUrl} & RequestData & RouteResponse;

type RequestCheck = {
  request: playwright.Request;
  route: Route;
};

const isAppLoadingUrl = (url: string) =>
  /\/images\/favicon\.png/.exec(url)
  || (/\/ui\//.exec(url) && !/\/ui\/(login|logout)/.exec(url))
  || /\/base1\/cockpit\.js/.exec(url)
  || /\/static\//.exec(url);

const isRegExp = (candidate: unknown): candidate is RegExp =>
  candidate instanceof RegExp
  || Object.prototype.toString.call(candidate) === "[object RegExp]";

const urlMatch = (routeUrl: RouteUrl, realUrl: string) => {
  const {url: querylessUrl} = parseUrl(realUrl);
  if (isRegExp(routeUrl)) {
    return routeUrl.test(querylessUrl);
  }
  return querylessUrl.endsWith(routeUrl);
};

const checkRequest = ({request, route}: RequestCheck) => {
  const url = request.url();
  const {query} = parseUrl(url);
  let body = null;
  let payload = null;
  const postData = request.postData();
  if (postData) {
    try {
      payload = JSON.parse(postData);
    } catch (e) {
      body = parse(postData);
    }
  }

  expect({
    [url]: {
      body,
      payload,
      query: Object.keys(query).length > 0 ? query : null,
    },
  }).toEqual({
    [url]: {
      body: route.body ?? null,
      query: route.query ?? null,
      payload: route.payload ?? null,
    },
  });
};

const handle = (
  route: playwright.Route,
  request: playwright.Request,
  match: Route,
) => {
  if ("handler" in match) {
    return match.handler(route, request);
  }
  if ("json" in match) {
    return route.fulfill({
      status: 200,
      body: JSON.stringify(match.json),
    });
  }
  if ("text" in match) {
    return route.fulfill({
      status: 200,
      body: match.text,
    });
  }
  let status = 0;
  let body = "";
  if (Array.isArray(match.status)) {
    [status, body] = match.status;
  } else {
    status = match.status;
  }
  return route.fulfill({status, body});
};

let requestChecks: RequestCheck[] = [];

let unmockedUrls: string[] = [];

export async function run(routeList: Route[]) {
  if (requestChecks.length > 0) {
    expect(
      "Page requests are already intercepted."
        + " Have you forget to cleanup by `await intercept.stop()`?",
    ).toEqual("");
  }
  page.route("**/*", (route: playwright.Route) => {
    const request = route.request();
    const url = request.url();
    if (isAppLoadingUrl(url)) {
      return route.continue();
    }

    const matchingRoute = routeList.find(r => urlMatch(r.url, url));

    if (matchingRoute) {
      requestChecks.push({request, route: matchingRoute});
      return handle(route, request, matchingRoute);
    }

    unmockedUrls.push(url);
    return route.fulfill({status: 404});
  });
}

export const start = (routeMap: Route[]) => async () => run(routeMap);

export const stop = async () => {
  await page.unroute("**/*");
  const oldChecks = [...requestChecks];
  requestChecks = [];
  const oldUnmockedUrls = [...unmockedUrls];
  unmockedUrls = [];
  if (oldUnmockedUrls.length > 0) {
    expect(`Unmocked urls detected: ${oldUnmockedUrls.join("\n")}`).toEqual("");
  }
  oldChecks.forEach(rc => checkRequest(rc));
};
