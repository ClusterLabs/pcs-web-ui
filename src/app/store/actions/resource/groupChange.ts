import { resourceChangeGroup } from "app/backend";

type ChangeGroupParams = Omit<
  Parameters<typeof resourceChangeGroup>[0],
  "clusterName"
>;

export type ResourceGroupChangeActions = {
  "RESOURCE.GROUP.CHANGE.UPDATE": {
    type: "RESOURCE.GROUP.CHANGE.UPDATE";
    key: { clusterName: string };
    payload: Partial<ChangeGroupParams> & {
      action?: "remove-group" | "set-group";
    };
  };

  "RESOURCE.GROUP.CHANGE": {
    type: "RESOURCE.GROUP.CHANGE";
    key: { clusterName: string };
    payload: ChangeGroupParams;
  };

  "RESOURCE.GROUP.CHANGE.OK": {
    type: "RESOURCE.GROUP.CHANGE.OK";
    key: { clusterName: string };
  };

  "RESOURCE.GROUP.CHANGE.FAIL": {
    type: "RESOURCE.GROUP.CHANGE.FAIL";
    key: { clusterName: string };
    payload: { message: string };
  };

  "RESOURCE.GROUP.CHANGE.FAIL.RECOVER": {
    type: "RESOURCE.GROUP.CHANGE.FAIL.RECOVER";
    key: { clusterName: string };
  };

  "RESOURCE.GROUP.CHANGE.CLOSE": {
    type: "RESOURCE.GROUP.CHANGE.CLOSE";
    key: { clusterName: string };
  };
};
