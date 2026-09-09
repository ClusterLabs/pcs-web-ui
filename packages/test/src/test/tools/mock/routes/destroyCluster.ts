import {endpoints} from "app/backend/endpoints";

export const destroyCluster = ({status}: {status?: number}) => ({
  url: endpoints.destroyCluster.url,
  body: {all: "1"},
  status: [status ?? 200, ""] as [number, string],
});
