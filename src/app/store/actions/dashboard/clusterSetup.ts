import { clusterSetup } from "app/backend";
import { LibReport } from "app/store/types";

type SetupParams = Parameters<typeof clusterSetup>[0];

type KnetLinkList = NonNullable<
  Extract<SetupParams["setupData"], { transport_type: "knet" }>["link_list"]
>;

type ExtendedKnetLink = KnetLinkList[number] & {
  addresses: Record<string, string>;
};

export type DashboardClusterSetupActions = {
  "DASHBOARD.CLUSTER.SETUP.UPDATE_CLUSTER_NAME": {
    type: "DASHBOARD.CLUSTER.SETUP.UPDATE_CLUSTER_NAME";
    payload: {
      clusterName: string;
    };
  };

  "DASHBOARD.CLUSTER.SETUP.UPDATE_LINK_KNET": {
    type: "DASHBOARD.CLUSTER.SETUP.UPDATE_LINK_KNET";
    payload: ExtendedKnetLink;
  };

  "DASHBOARD.CLUSTER.SETUP.SET_LINKS_KNET": {
    type: "DASHBOARD.CLUSTER.SETUP.SET_LINKS_KNET";
    payload: ExtendedKnetLink[];
  };

  "DASHBOARD.CLUSTER.SETUP.UPDATE_QUORUM_OPTIONS": {
    type: "DASHBOARD.CLUSTER.SETUP.UPDATE_QUORUM_OPTIONS";
    payload: {
      auto_tie_breaker?: "default" | "off" | "on";
      last_man_standing?: "default" | "off" | "on";
      last_man_standing_window?: string;
      wait_for_all?: "default" | "off" | "on";
    };
  };

  "DASHBOARD.CLUSTER.SETUP.UPDATE_TOTEM_OPTIONS": {
    type: "DASHBOARD.CLUSTER.SETUP.UPDATE_TOTEM_OPTIONS";
    payload: Omit<
      NonNullable<SetupParams["setupData"]["totem_options"]>,
      "block_unlisted_ips"
    > & { block_unlisted_ips?: "yes" | "no" | "default" };
  };

  "DASHBOARD.CLUSTER.SETUP.UPDATE_NODES": {
    type: "DASHBOARD.CLUSTER.SETUP.UPDATE_NODES";
    payload: {
      nodeNameList: string[];
    };
  };

  "DASHBOARD.CLUSTER.SETUP.CHECK_CAN_ADD": {
    type: "DASHBOARD.CLUSTER.SETUP.CHECK_CAN_ADD";
    payload: {
      clusterName: string;
      targetNode: string;
      nodeNameList: string[];
    };
  };

  "DASHBOARD.CLUSTER.SETUP.CHECK_CAN_ADD.CANNOT": {
    type: "DASHBOARD.CLUSTER.SETUP.CHECK_CAN_ADD.CANNOT";
    payload: {
      errors: string[];
    };
  };

  "DASHBOARD.CLUSTER.SETUP.CHECK_CAN_ADD.FAIL": {
    type: "DASHBOARD.CLUSTER.SETUP.CHECK_CAN_ADD.FAIL";
    payload: {
      message: string;
    };
  };

  "DASHBOARD.CLUSTER.SETUP.CHECK_AUTH": {
    type: "DASHBOARD.CLUSTER.SETUP.CHECK_AUTH";
    payload: {
      targetNode: string;
      nodeNameList: string[];
    };
  };

  "DASHBOARD.CLUSTER.SETUP.CHECK_AUTH.FAIL": {
    type: "DASHBOARD.CLUSTER.SETUP.CHECK_AUTH.FAIL";
    payload: {
      message: string;
    };
  };

  "DASHBOARD.CLUSTER.SETUP.CHECK_AUTH.NO_AUTH": {
    type: "DASHBOARD.CLUSTER.SETUP.CHECK_AUTH.NO_AUTH";
    payload: {
      authProcessId: number;
    };
  };

  "DASHBOARD.CLUSTER.SETUP.CHECK_AUTH.OK": {
    type: "DASHBOARD.CLUSTER.SETUP.CHECK_AUTH.OK";
  };

  "DASHBOARD.CLUSTER.SETUP.SEND_KNOWN_HOSTS": {
    type: "DASHBOARD.CLUSTER.SETUP.SEND_KNOWN_HOSTS";
    payload: {
      targetNode: string;
      nodeNameList: string[];
    };
  };
  "DASHBOARD.CLUSTER.SETUP.SEND_KNOWN_HOSTS.FAIL": {
    type: "DASHBOARD.CLUSTER.SETUP.SEND_KNOWN_HOSTS.FAIL";
    payload: {
      message: string;
    };
  };

  "DASHBOARD.CLUSTER.SETUP.SEND_KNOWN_HOSTS.OK": {
    type: "DASHBOARD.CLUSTER.SETUP.SEND_KNOWN_HOSTS.OK";
  };

  "DASHBOARD.CLUSTER.SETUP.CLOSE": {
    type: "DASHBOARD.CLUSTER.SETUP.CLOSE";
  };

  "DASHBOARD.CLUSTER.SETUP.CALL": {
    type: "DASHBOARD.CLUSTER.SETUP.CALL";
    payload: SetupParams;
  };

  "DASHBOARD.CLUSTER.SETUP.CALL.CANCEL": {
    type: "DASHBOARD.CLUSTER.SETUP.CALL.CANCEL";
  };

  "DASHBOARD.CLUSTER.SETUP.CALL.OK": {
    type: "DASHBOARD.CLUSTER.SETUP.CALL.OK";
    payload: {
      reports: LibReport[];
    };
  };

  "DASHBOARD.CLUSTER.SETUP.CALL.FAIL": {
    type: "DASHBOARD.CLUSTER.SETUP.CALL.FAIL";
    payload: {
      reports: LibReport[];
    };
  };

  "DASHBOARD.CLUSTER.SETUP.CALL.ERROR": {
    type: "DASHBOARD.CLUSTER.SETUP.CALL.ERROR";
  };

  "DASHBOARD.CLUSTER.SETUP.CALL.RESPONSE.RESET": {
    type: "DASHBOARD.CLUSTER.SETUP.CALL.RESPONSE.RESET";
  };
};
