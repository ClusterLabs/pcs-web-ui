import path from "node:path";

import express, {type Express, type Request, type Response} from "express";

import {startBuild} from "./build";
import {prepareLiveReloadServer} from "./live-reload-server";

// import endpoints from "app/backend/calls";
import {type LibClusterCommands, endpoints} from "app/backend/endpoints";
// import {endpoints} from "app";
//

const selectedScenarion = process.argv[1];
const srcDir = process.argv[2];
const outputDir = process.argv[3];
const app_node_modules = process.argv[4];

const port = process.env.PORT || 5000;

startBuild({srcDir, outputDir, app_node_modules, port});

const parserUrlEncoded = express.urlencoded({extended: false});
const parserJson = express.json();

export type Handler = (_req: Request, _res: Response) => void;

// biome-ignore lint/suspicious/noExplicitAny: don't care
type R = any;
const application = express();
const server = application.listen(port, () => {
  console.log(
    `${selectedScenarion
      .slice(path.dirname(selectedScenarion).length + 1)
      .replace(/\.[^/.]+$/, "")}: Listening on port ${port}`,
  );
  console.log(
    application._router.stack
      .filter((r: R) => r.route)
      .map((r: R) => `${r.route.stack[0].method}: ${r.route.path}`),
  );
});
// extended: true is here to get rid of [Object: null prototype] in log of body
application.use(express.urlencoded({extended: true}));
application.use((req, _res, next) => {
  console.log(
    req.method.toLowerCase() === "get" ? "GET " : "POST",
    req.path,
    req.method.toLowerCase() === "get" ? req.query : req.body,
  );
  next();
});
application.use("/ui", express.static(outputDir));
application.get("/ui/*", (_req, res) => {
  res.sendFile(path.resolve(outputDir, "index.html"));
});

prepareLiveReloadServer(server, outputDir);

const getDelay = (envDelay: string | undefined, defaultDelay: number) => {
  const delay = Number.parseInt(envDelay || `${defaultDelay}`, 10);
  if (Number.isNaN(delay)) {
    return defaultDelay;
  }
  return delay;
};

const delayed =
  (handler: Handler): Handler =>
  (req, res) => {
    setTimeout(
      () => handler(req, res),
      getDelay(process.env.DELAY, 100) +
        Math.floor(getDelay(process.env.DELAY_RND, 100) * Math.random()),
    );
  };

const prepareUrl = <KEYWORDS extends Record<string, string>>(
  url: string | ((_keywords: KEYWORDS) => string),
) => {
  if (typeof url === "string") {
    return url;
  }
  // TODO introspect url function and use correct keys
  // currently just clusterName here...
  return url({clusterName: ":clusterName"} as unknown as KEYWORDS);
};

type EndpointKeys = keyof typeof endpoints;
type DevEndpoints = {
  -readonly [K in EndpointKeys]: K extends "libCluster"
    ? (_c: LibClusterCommands[number]["name"], _h: Handler) => void
    : (_h: Handler) => Express;
};

export const app: DevEndpoints = (
  Object.keys(endpoints) as Array<EndpointKeys>
).reduce((devEndpoints, n) => {
  const ep = endpoints[n];
  if (n === "libCluster") {
    devEndpoints.libCluster = (
      command: LibClusterCommands[number]["name"],
      handler: Handler,
    ) => {
      application.post(
        endpoints.libCluster.url({clusterName: ":clusterName", command}),
        parserJson,
        delayed(handler),
      );
    };
  } else if (
    [
      "libClusterResourceAgentDescribeAgent",
      "libClusterStonithAgentDescribeAgent",
      "libClusterResourceAgentListAgents",
    ].includes(n)
  ) {
    devEndpoints[n] = (handler: Handler) => {
      return application.post(prepareUrl(ep.url), parserJson, delayed(handler));
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
