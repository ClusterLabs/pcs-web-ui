import {endpoints} from "app/backend/endpoints";

import {RouteResponse} from "../mock";

import {paramsToBody} from "./tools";

type Constraint = Parameters<
  typeof endpoints.addConstraintRemote.params
>[0]["constraint"];

export const addConstraintRemote = ({
  clusterName,
  constraint,
  response,
}: {
  clusterName: string;
  constraint: Constraint;
  response?: RouteResponse;
}) => {
  return {
    url: endpoints.addConstraintRemote.url({clusterName}),
    body: paramsToBody(endpoints.addConstraintRemote.params({constraint})),
    ...(response ?? {text: "Successfully added constraint"}),
  };
};
