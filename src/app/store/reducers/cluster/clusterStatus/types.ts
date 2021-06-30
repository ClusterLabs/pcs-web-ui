import { ActionPayload } from "app/store/actions";

type ApiCluster = ActionPayload["CLUSTER.STATUS.FETCH.OK"];

// It is more practical to deduce nvpair from one place (so e.g. resource meta
// attributes are skipped).
// 1. The types are the same - typescript infere the type correctly.
// 2. Don't want a formal duty to keep it in sync a new occurences here.
export type NVPair = NonNullable<
  ApiCluster["node_attr"]
>[keyof ApiCluster["node_attr"]][number];

type AgentAttribute = {
  id: string;
  value: string;
};

export type Issue =
  | {
      severity: "ERROR" | "WARNING";
      message: string;
    }
  | {
      severity: "ERROR" | "WARNING";
      message: string;
      type: "nodes_not_authorized";
      nodeList: string[];
    };

export type StatusSeverity = "OK" | "ERROR" | "WARNING";

type Resource = {
  id: string;
  status: {
    maxSeverity: StatusSeverity;
    infoList: {
      label: string;
      severity: StatusSeverity;
    }[];
  };
  metaAttributes: NVPair[];
  issueList: Issue[];
};

type Primitive = Resource & {
  itemType: "primitive";
  inClone: boolean;
  inGroup: string | null;
  class: string;
  provider: string;
  type: string;
  agentName: string;
  instanceAttributes: Record<string, AgentAttribute>;
  utilization: NVPair[];
};

type Group = Resource & {
  itemType: "group";
  inClone: boolean;
  resources: Primitive[];
};

type Clone = Resource & {
  itemType: "clone";
  member: Primitive | Group;
};

/*
 status in ApiCLusterStatus is not taken here. There is not real need for it.
*/
export type Cluster = {
  name: string;
  nodeList: ((
    | {
        name: string;
        status: "ONLINE" | "OFFLINE" | "STANDBY";
        statusSeverity: StatusSeverity;
        quorum: boolean;
        quorumSeverity: StatusSeverity;
        issueList: Issue[];
        services: Extract<
          ApiCluster["node_list"][number],
          { services: unknown }
        >["services"];
      }
    | {
        name: string;
        status: "DATA_NOT_PROVIDED";
        issueList: Issue[];
      }
  ) & {
    // following information are gained from cluster status; we have them even
    // if the node is not reachable
    inMaintenance: boolean;
    inStandby: boolean;
  })[];
  resourceTree: (Primitive | Group | Clone)[];
  fenceDeviceList: {
    id: string;
    status: "RUNNING" | "BLOCKED" | "FAILED" | "DISABLED";
    statusSeverity: StatusSeverity;
    issueList: Issue[];
    agentName: string;
    type: string;
    arguments: Record<string, AgentAttribute>;
  }[];
  constraints?: NonNullable<ApiCluster["constraints"]>;
  issueList: Issue[];
  summary: {
    nodesSeverity: StatusSeverity;
    resourcesSeverity: StatusSeverity;
    fenceDevicesSeverity: StatusSeverity;
    issuesSeverity: StatusSeverity;
  };
  resourceOnNodeStatusList: {
    resource: {
      id: string;
    };
    node: null | {
      name: string;
    };
    managed: boolean;
    failed: boolean;
    role: string;
    active: boolean;
    orphaned: boolean;
    failureIgnored: boolean;
    nodesRunningOn: number;
    pending: string | null;
    blocked: boolean;
    targetRole?: string;
  }[];
  nodeAttr: Record<string, NVPair[]>;
  nodesUtilization: Record<string, NVPair[]>;
  sbdDetection: null | {
    enabled: boolean;
  };
};

export type ClusterStatusService = {
  clusterData: Cluster;
  dataFetchState: "NOT_STARTED" | "IN_PROGRESS" | "SUCCESS";
};
