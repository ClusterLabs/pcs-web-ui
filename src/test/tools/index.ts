import { endpoints } from "app/backend/endpoints";

import * as intercept from "./interception";
import * as response from "./response";
import * as route from "./routes";
import * as workflow from "./workflows";
import * as shortcuts from "./shortcuts";
import { location } from "./backendAddress";

type Endpoints = typeof endpoints;

type Urls = {
  [K in keyof Endpoints]: Endpoints[K]["url"];
};

export const url: Urls = Object.entries(endpoints).reduce<Urls>(
  (urls, [key, endpoint]): Urls => ({ ...urls, [key]: endpoint.url }),
  {} as Urls,
);

export { intercept, response, route, location, workflow, shortcuts };
