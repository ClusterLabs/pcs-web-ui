import { CallResult, endpoints, http } from "./tools";

const { url } = endpoints.addConstraintRemote;

type Order = {
  resourceId: string;
  action: "start" | "promote" | "demote" | "stop";
  order: "after" | "before";
  otherResourceId: string;
  otherAction: "start" | "promote" | "demote" | "stop";
  score: string;
};

type Location = {
  resourceSpecification: "resource" | "pattern";
  resourceValue: string;
  nodeName: string;
  score: string;
};

type Colocation = {
  resourceId: string;
  withResourceId: string;
  score: string;
};

type Constraint = (
  | { location: Location }
  | { order: Order }
  | { colocation: Colocation }
) & {
  force?: boolean;
};

const orderParams = ({
  resourceId,
  action,
  order,
  otherResourceId,
  otherAction,
  score,
}: Order): [string, string][] => [
  ["c_type", "ord"],
  ["res_id", resourceId],
  ["res_action", action],
  ["order", order],
  ["target_res_id", otherResourceId],
  ["target_action", otherAction],
  ["score", score],
];

const locationParams = ({
  resourceSpecification,
  resourceValue,
  nodeName,
  score,
}: Location): [string, string][] => [
  ["c_type", "loc"],
  [
    "res_id",
    resourceSpecification === "pattern"
      ? `regexp%${resourceValue}`
      : resourceValue,
  ],
  ["node_id", nodeName],
  ["score", score],
];

const colocationParams = ({
  resourceId,
  withResourceId,
  score,
}: Colocation): [string, string][] => [
  ["c_type", "col"],
  ["res_id", resourceId],
  ["target_res_id", withResourceId],
  ["colocation_type", ""], // backend will not correct score (already correct)
  ["score", score],
];

const params = (constraint: Constraint) => {
  const force: [string, string][] =
    "force" in constraint && constraint.force === true
      ? [["force", "true"]]
      : [];

  if ("order" in constraint) {
    return [...orderParams(constraint.order), ...force];
  }

  if ("colocation" in constraint) {
    return [...colocationParams(constraint.colocation), ...force];
  }

  return [...locationParams(constraint.location), ...force];
};

export const addConstraintRemote = async ({
  clusterName,
  constraint,
}: {
  clusterName: string;
  constraint: Constraint;
}): CallResult =>
  http.post(url({ clusterName }), { params: params(constraint) });
