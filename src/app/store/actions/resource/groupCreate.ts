import { api } from "app/backend";

export type ResourceGroupCreateActions = {
  "RESOURCE.GROUP.CREATE": {
    type: "RESOURCE.GROUP.CREATE";
    key: { clusterName: string };
    payload: {
      groupId: string;
      resourceIdList: string[];
    };
  };

  "RESOURCE.GROUP.CREATE.ERROR": {
    type: "RESOURCE.GROUP.CREATE.ERROR";
    key: { clusterName: string };
  };

  "RESOURCE.GROUP.CREATE.FAIL": {
    type: "RESOURCE.GROUP.CREATE.FAIL";
    key: { clusterName: string };
    payload: {
      reports: api.types.lib.Report[];
    };
  };

  "RESOURCE.GROUP.CREATE.SUCCESS": {
    type: "RESOURCE.GROUP.CREATE.SUCCESS";
    key: { clusterName: string };
    payload: {
      reports: api.types.lib.Report[];
    };
  };

  "RESOURCE.GROUP.CREATE.UPDATE": {
    type: "RESOURCE.GROUP.CREATE.UPDATE";
    key: { clusterName: string };
    payload: {
      groupId?: string;
      resourceIdList?: string[];
    };
  };

  "RESOURCE.GROUP.CREATE.CLOSE": {
    type: "RESOURCE.GROUP.CREATE.CLOSE";
    key: { clusterName: string };
  };
};
