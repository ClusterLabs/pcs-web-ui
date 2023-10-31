import {LibReport} from "app/store/types";

export type ResourceGroupCreateActions = {
  "RESOURCE.GROUP.CREATE.INIT": {
    type: "RESOURCE.GROUP.CREATE.INIT";
    key: {clusterName: string};
    payload: {
      clusterName: string;
      topLevelPrimitiveIds: string[];
    };
  };
  "RESOURCE.GROUP.CREATE": {
    type: "RESOURCE.GROUP.CREATE";
    key: {clusterName: string};
    payload: {
      groupId: string;
      resourceIdList: string[];
    };
  };

  "RESOURCE.GROUP.CREATE.ERROR": {
    type: "RESOURCE.GROUP.CREATE.ERROR";
    key: {clusterName: string};
  };

  "RESOURCE.GROUP.CREATE.FAIL": {
    type: "RESOURCE.GROUP.CREATE.FAIL";
    key: {clusterName: string};
    payload: {
      reports: LibReport[];
    };
  };

  "RESOURCE.GROUP.CREATE.SUCCESS": {
    type: "RESOURCE.GROUP.CREATE.SUCCESS";
    key: {clusterName: string};
    payload: {
      reports: LibReport[];
    };
  };

  "RESOURCE.GROUP.CREATE.UPDATE": {
    type: "RESOURCE.GROUP.CREATE.UPDATE";
    key: {clusterName: string};
    payload: {
      groupId?: string;
      resourceIdList?: string[];
    };
  };

  "RESOURCE.GROUP.CREATE.CLOSE": {
    type: "RESOURCE.GROUP.CREATE.CLOSE";
    key: {clusterName: string};
  };
};
