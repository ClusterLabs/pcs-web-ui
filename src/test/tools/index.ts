import { endpoints } from "app/backend/endpoints";

import * as intercept from "./interception";
import * as response from "./response";
import * as route from "./routes";
import * as workflow from "./workflows";
import { url } from "./backendAddress";

type Endpoints = typeof endpoints;

type Urls = {
  [K in keyof Endpoints]: Endpoints[K]["url"];
};

export const urls: Urls = Object.entries(endpoints).reduce<Urls>(
  (urls, [key, endpoint]): Urls => ({ ...urls, [key]: endpoint.url }),
  {} as Urls,
);

export { intercept, response, route, url, workflow };
