import type {resourceChangeGroup} from "app/backend";

type ChangeGroupParams = Parameters<typeof resourceChangeGroup>[0];

export type ResourceGroupChangeActions = {
  "RESOURCE.GROUP.CHANGE.INIT": {
    type: "RESOURCE.GROUP.CHANGE.INIT";
    payload: Partial<ChangeGroupParams> & {
      action?: "remove-group" | "set-group" | "move-in-group";
      groupIdStructureList: {id: string; resources: {id: string}[]}[];
    };
  };

  "RESOURCE.GROUP.CHANGE.UPDATE": {
    type: "RESOURCE.GROUP.CHANGE.UPDATE";
    payload: Partial<ChangeGroupParams> & {
      action?: "remove-group" | "set-group" | "move-in-group";
    };
  };

  "RESOURCE.GROUP.CHANGE": {
    type: "RESOURCE.GROUP.CHANGE";
    payload: ChangeGroupParams;
  };

  "RESOURCE.GROUP.CHANGE.OK": {
    type: "RESOURCE.GROUP.CHANGE.OK";
  };

  "RESOURCE.GROUP.CHANGE.FAIL": {
    type: "RESOURCE.GROUP.CHANGE.FAIL";
    payload: {message: string};
  };

  "RESOURCE.GROUP.CHANGE.FAIL.RECOVER": {
    type: "RESOURCE.GROUP.CHANGE.FAIL.RECOVER";
  };

  "RESOURCE.GROUP.CHANGE.CLOSE": {
    type: "RESOURCE.GROUP.CHANGE.CLOSE";
  };
};
