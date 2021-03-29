/* eslint-disable no-console */
import { dirname } from "path";

import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";

// import endpoints from "app/backend/calls";
import { LibClusterCommands, endpoints } from "app/backend/endpoints";

const parserUrlEncoded = bodyParser.urlencoded({ extended: false });
const parserJson = bodyParser.json();

export type Handler = (req: Request, res: Response) => void;

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
type R = any;
const application = express();
const port = process.env.PORT || 5000;
application.listen(port, () => {
  console.log(
    `${process.argv[1]
      .slice(dirname(process.argv[1]).length + 1)
      .replace(/\.[^/.]+$/, "")}: Listening on port ${port}`,
  );
  console.log(
    application._router.stack
      .filter((r: R) => r.route)
      .map((r: R) => `${r.route.stack[0].method}: ${r.route.path}`),
  );
});
// extended: true is here to get rid of [Object: null prototype] in log of body
application.use(bodyParser.urlencoded({ extended: true }));
application.use((req, _res, next) => {
  console.log(
    req.method.toLowerCase() === "get" ? "GET " : "POST",
    req.path,
    req.method.toLowerCase() === "get" ? req.query : req.body,
  );
  next();
});

const getDelay = (envDelay: string | undefined, defaultDelay: number) => {
  const delay = Number.parseInt(envDelay || `${defaultDelay}`, 10);
  if (Number.isNaN(delay)) {
    return defaultDelay;
  }
  return delay;
};

const delayed = (handler: Handler): Handler => (req, res) => {
  setTimeout(
    () => handler(req, res),
    getDelay(process.env.DELAY, 100)
      + Math.floor(getDelay(process.env.DELAY_RND, 100) * Math.random()),
  );
};

const prepareUrl = <KEYWORDS extends Record<string, string>>(
  url: string | ((keywords: KEYWORDS) => string),
) => {
  if (typeof url === "string") {
    return url;
  }
  // TODO introspect url function and use correct keys
  // currently just clusterName here...
  return url(({ clusterName: ":clusterName" } as unknown) as KEYWORDS);
};

type EndpointKeys = keyof typeof endpoints;
type DevEndpoints = {
  -readonly [K in EndpointKeys]: K extends "libCluster"
    ? (c: LibClusterCommands[number]["name"], h: Handler) => void
    : (h: Handler) => Express;
};

export const app: DevEndpoints = (Object.keys(endpoints) as Array<
  EndpointKeys
>).reduce((devEndpoints, n) => {
  const ep = endpoints[n];
  if (n === "libCluster") {
    devEndpoints.libCluster = (
      command: LibClusterCommands[number]["name"],
      handler: Handler,
    ) => {
      application.post(
        endpoints.libCluster.url({ clusterName: ":clusterName", command }),
        parserJson,
        delayed(handler),
      );
    };
  } else if (ep.method === "get") {
    devEndpoints[n] = (handler: Handler) => {
      return application.get(prepareUrl(ep.url), delayed(handler));
    };
  } else {
    devEndpoints[n] = (handler: Handler) => {
      return application.post(
        prepareUrl(ep.url),
        parserUrlEncoded,
        delayed(handler),
      );
    };
  }
  return devEndpoints;
}, {} as DevEndpoints);
