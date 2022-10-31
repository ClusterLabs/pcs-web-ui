import {endpoint} from "./endpoint";

type Constraint = (
  | {
      location: {
        resourceSpecification: "resource" | "pattern";
        resourceValue: string;
        nodeName: string;
        score: string;
      };
    }
  | {
      order: {
        resourceId: string;
        action: "start" | "promote" | "demote" | "stop";
        order: "after" | "before";
        otherResourceId: string;
        otherAction: "start" | "promote" | "demote" | "stop";
        score: string;
      };
    }
  | {
      colocation: {
        resourceId: string;
        withResourceId: string;
        score: string;
      };
    }
) & {
  force?: boolean;
};

export const addConstraintRemote = endpoint({
  url: ({clusterName}: {clusterName: string}) =>
    `/managec/${clusterName}/add_constraint_remote`,
  method: "post",
  params: ({constraint}: {constraint: Constraint}): [string, string][] => {
    const force: [string, string][] =
      "force" in constraint && constraint.force === true
        ? [["force", "true"]]
        : [];

    if ("order" in constraint) {
      const {resourceId, action, order, otherResourceId, otherAction, score} =
        constraint.order;
      return [
        ["c_type", "ord"],
        ["res_id", resourceId],
        ["res_action", action],
        ["order", order],
        ["target_res_id", otherResourceId],
        ["target_action", otherAction],
        ["score", score],
        ...force,
      ];
    }

    if ("colocation" in constraint) {
      const {resourceId, withResourceId, score} = constraint.colocation;
      return [
        ["c_type", "col"],
        ["res_id", resourceId],
        ["target_res_id", withResourceId],
        ["colocation_type", ""], // backend will not correct score (already correct)
        ["score", score],
        ...force,
      ];
    }

    const {resourceSpecification, resourceValue, nodeName, score} =
      constraint.location;
    return [
      ["c_type", "loc"],
      [
        "res_id",
        resourceSpecification === "pattern"
          ? `regexp%${resourceValue}`
          : resourceValue,
      ],
      ["node_id", nodeName],
      ["score", score],
      ...force,
    ];
  },
  validate: undefined,
  payload: undefined,
  shape: undefined,
});
