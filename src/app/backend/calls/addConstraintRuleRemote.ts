import {CallResult, endpoints, http} from "./tools";

const {url} = endpoints.addConstraintRuleRemote;

export const addConstraintRuleRemote = async ({
  clusterName,
  constraint,
}: {
  clusterName: string;
  constraint: {
    force?: boolean;
    location: {
      resourceSpecification: "resource" | "pattern";
      resourceValue: string;
      rule: string;
      score: string;
    };
  };
}): CallResult => {
  const force: [string, string][] =
    "force" in constraint && constraint.force === true
      ? [["force", "true"]]
      : [];

  const {resourceSpecification, resourceValue, rule, score} =
    constraint.location;
  return http.post(url({clusterName}), {
    params: [
      ["c_type", "loc"],
      [
        "res_id",
        resourceSpecification === "pattern"
          ? `regexp%${resourceValue}`
          : resourceValue,
      ],
      ["rule", rule],
      ["score", score],
      ...force,
    ],
  });
};
