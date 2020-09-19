import { CallLibResult, callLib } from "./lib";

export const resourceCreate: CallLibResult = async ({
  clusterUrlName,
  resourceName,
  agentName,
  instanceAttrs,
  disabled,
}: {
  clusterUrlName: string;
  resourceName: string;
  agentName: string;
  instanceAttrs: Record<string, string>;
  disabled: boolean;
}) => {
  return callLib({
    clusterUrlName,
    urlName: "resource-create",
    payload: {
      resource_id: resourceName,
      resource_agent_name: agentName,
      operation_list: [],
      meta_attributes: {},
      instance_attributes: instanceAttrs,
      ensure_disabled: disabled,
    },
  });
};
