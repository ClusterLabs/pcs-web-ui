import * as t from "io-ts";

import { endpoints } from "app/backend/endpoints";

import * as intercept from "./interception";
import * as route from "./routes";
import * as workflow from "./workflows";
import * as shortcuts from "./shortcuts";
import { location } from "./backendAddress";

type Endpoints = typeof endpoints;

type Urls = {
  [K in keyof Endpoints]: Endpoints[K]["url"]
};

export const url: Urls = Object.entries(endpoints).reduce<Urls>(
  (urls, [key, endpoint]): Urls => ({ ...urls, [key]: endpoint.url }),
  {} as Urls,
);

export type Shapes = {
  [K in keyof Endpoints]: Endpoints[K]["shape"] extends t.Any
    ? t.TypeOf<Endpoints[K]["shape"]>
    : never
};

// The correct version would be:
// type Payloads = {
//   [K in keyof Endpoints as Endpoints[K]["payload"] extends undefined
//     ? never
//     : K]: Endpoints[K]["payload"];
// };
//
// However, it requires typescript 4.1 and it seems that jest uses older version
// (it does not support "as Endpoints[K]...")
// Maybe try ts-jest?
type Payloads = {
  [K in keyof Endpoints]: Endpoints[K]["payload"]
};
export const payload: Payloads = Object.entries(endpoints)
  .filter(([_key, endpoint]) => endpoint.payload !== undefined)
  .reduce<Payloads>(
    (payloads, [key, endpoint]): Payloads => ({
      ...payloads,
      [key]: endpoint.payload,
    }),
    {} as Payloads,
  );

export { intercept, route, location, workflow, shortcuts };
