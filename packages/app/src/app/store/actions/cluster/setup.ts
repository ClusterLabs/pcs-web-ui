import type {clusterSetup} from "app/backend";
import type {LibReport} from "app/store/types";

type SetupParams = Parameters<typeof clusterSetup>[0];

type KnetLinkList = NonNullable<
  Extract<SetupParams["setupData"], {transport_type: "knet"}>["link_list"]
>;

// Is more practical work with linenumber property as number than string
type ExtendedKnetLink = Omit<KnetLinkList[number], "linknumber"> & {
  linknumber: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  addresses: Record<string, string>;
};

export type ClusterSetupActions = {
  "CLUSTER.SETUP.UPDATE_CLUSTER_NAME": {
    type: "CLUSTER.SETUP.UPDATE_CLUSTER_NAME";
    payload: {
      clusterName: string;
    };
  };

  "CLUSTER.SETUP.UPDATE_LINK_KNET": {
    type: "CLUSTER.SETUP.UPDATE_LINK_KNET";
    payload: ExtendedKnetLink;
  };

  "CLUSTER.SETUP.SET_LINKS_KNET": {
    type: "CLUSTER.SETUP.SET_LINKS_KNET";
    payload: ExtendedKnetLink[];
  };

  "CLUSTER.SETUP.UPDATE_KNET_TRANSPORT_OPTIONS": {
    type: "CLUSTER.SETUP.UPDATE_KNET_TRANSPORT_OPTIONS";
    payload: {
      ip_version?: "ipv4" | "ipv6" | "ipv4-6" | "ipv6-4" | "default";
      knet_pmtud_interval?: string; // positive integer
      link_mode?: "active" | "passive" | "rr" | "default";
    };
  };

  "CLUSTER.SETUP.UPDATE_KNET_COMPRESSION_OPTIONS": {
    type: "CLUSTER.SETUP.UPDATE_KNET_COMPRESSION_OPTIONS";
    payload: NonNullable<SetupParams["setupData"]["compression_options"]>;
  };

  "CLUSTER.SETUP.UPDATE_KNET_CRYPTO_OPTIONS": {
    type: "CLUSTER.SETUP.UPDATE_KNET_CRYPTO_OPTIONS";
    payload: Omit<
      NonNullable<SetupParams["setupData"]["crypto_options"]>,
      "model" | "hash" | "cipher"
    > & {
      model?: "nss" | "openssl" | "default";
      hash?: "md5" | "sha1" | "sha256" | "sha384" | "sha512" | "default";
      cipher?: "aes256" | "aes192" | "aes128" | "default";
    };
  };

  "CLUSTER.SETUP.UPDATE_QUORUM_OPTIONS": {
    type: "CLUSTER.SETUP.UPDATE_QUORUM_OPTIONS";
    payload: {
      auto_tie_breaker?: "default" | "off" | "on";
      last_man_standing?: "default" | "off" | "on";
      last_man_standing_window?: string;
      wait_for_all?: "default" | "off" | "on";
    };
  };

  "CLUSTER.SETUP.UPDATE_TOTEM_OPTIONS": {
    type: "CLUSTER.SETUP.UPDATE_TOTEM_OPTIONS";
    payload: Omit<
      NonNullable<SetupParams["setupData"]["totem_options"]>,
      "block_unlisted_ips"
    > & {block_unlisted_ips?: "yes" | "no" | "default"};
  };

  "CLUSTER.SETUP.UPDATE_NODES": {
    type: "CLUSTER.SETUP.UPDATE_NODES";
    payload: {
      nodeNameList: string[];
    };
  };

  "CLUSTER.SETUP.CHECK_AUTH": {
    type: "CLUSTER.SETUP.CHECK_AUTH";
    payload: {
      targetNode: string;
      nodeNameList: string[];
    };
  };

  "CLUSTER.SETUP.CHECK_AUTH.FAIL": {
    type: "CLUSTER.SETUP.CHECK_AUTH.FAIL";
    payload: {
      message: string;
    };
  };

  "CLUSTER.SETUP.CHECK_AUTH.NO_AUTH": {
    type: "CLUSTER.SETUP.CHECK_AUTH.NO_AUTH";
    payload: {
      authProcessId: number;
    };
  };

  "CLUSTER.SETUP.CHECK_AUTH.OK": {
    type: "CLUSTER.SETUP.CHECK_AUTH.OK";
  };

  "CLUSTER.SETUP.SEND_KNOWN_HOSTS": {
    type: "CLUSTER.SETUP.SEND_KNOWN_HOSTS";
    payload: {
      targetNode: string;
      nodeNameList: string[];
    };
  };
  "CLUSTER.SETUP.SEND_KNOWN_HOSTS.FAIL": {
    type: "CLUSTER.SETUP.SEND_KNOWN_HOSTS.FAIL";
    payload: {
      message: string;
    };
  };

  "CLUSTER.SETUP.SEND_KNOWN_HOSTS.OK": {
    type: "CLUSTER.SETUP.SEND_KNOWN_HOSTS.OK";
  };

  "CLUSTER.SETUP.CLOSE": {
    type: "CLUSTER.SETUP.CLOSE";
  };

  "CLUSTER.SETUP.CALL": {
    type: "CLUSTER.SETUP.CALL";
    payload: SetupParams;
  };

  "CLUSTER.SETUP.CALL.CANCEL": {
    type: "CLUSTER.SETUP.CALL.CANCEL";
  };

  "CLUSTER.SETUP.CALL.OK": {
    type: "CLUSTER.SETUP.CALL.OK";
    payload: {
      reports: LibReport[];
    };
  };

  "CLUSTER.SETUP.CALL.FAIL": {
    type: "CLUSTER.SETUP.CALL.FAIL";
    payload: {
      reports: LibReport[];
    };
  };

  "CLUSTER.SETUP.CALL.ERROR": {
    type: "CLUSTER.SETUP.CALL.ERROR";
  };

  "CLUSTER.SETUP.CALL.RESPONSE.RESET": {
    type: "CLUSTER.SETUP.CALL.RESPONSE.RESET";
  };
};
