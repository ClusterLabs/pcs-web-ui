import type {LibReport} from "app/store/types";

export type ResourceGroupCreateActions = {
  "RESOURCE.GROUP.CREATE.INIT": {
    type: "RESOURCE.GROUP.CREATE.INIT";
    payload: {
      clusterName: string;
      topLevelPrimitiveIds: string[];
    };
  };
  "RESOURCE.GROUP.CREATE": {
    type: "RESOURCE.GROUP.CREATE";
    payload: {
      groupId: string;
      resourceIdList: string[];
    };
  };

  "RESOURCE.GROUP.CREATE.ERROR": {
    type: "RESOURCE.GROUP.CREATE.ERROR";
  };

  "RESOURCE.GROUP.CREATE.FAIL": {
    type: "RESOURCE.GROUP.CREATE.FAIL";
    payload: {
      reports: LibReport[];
    };
  };

  "RESOURCE.GROUP.CREATE.SUCCESS": {
    type: "RESOURCE.GROUP.CREATE.SUCCESS";
    payload: {
      reports: LibReport[];
    };
  };

  "RESOURCE.GROUP.CREATE.UPDATE": {
    type: "RESOURCE.GROUP.CREATE.UPDATE";
    payload: {
      groupId?: string;
      resourceIdList?: string[];
    };
  };

  "RESOURCE.GROUP.CREATE.CLOSE": {
    type: "RESOURCE.GROUP.CREATE.CLOSE";
  };
};
