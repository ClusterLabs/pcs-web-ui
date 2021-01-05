import { CallResult } from "./call";
import * as types from "./types";
import * as http from "./http";

const { TApiResponse: shape } = types.lib;

type InputPayload = ReturnType<typeof JSON.parse>;
type LibResult = CallResult<typeof shape>;

export const call = async (url: string, payload: InputPayload): LibResult =>
  http.post(url, { payload, shape });

export type ClusterCommand =
  | {
      command: "resource-enable";
      payload: { resource_or_tag_ids: string[] };
    }
  | {
      command: "resource-disable";
      payload: { resource_or_tag_ids: string[] };
    }
  | {
      command: "resource-unmanage";
      payload: { resource_or_tag_ids: string[] };
    }
  | {
      command: "resource-manage";
      payload: { resource_or_tag_ids: string[] };
    }
  | {
      command: "resource-create";
      payload: {
        resource_id: string;
        resource_agent_name: string;
        operation_list: Record<string, string>[];
        meta_attributes: Record<string, string>;
        instance_attributes: Record<string, string>;
        ensure_disabled: boolean;
      };
    }
  | {
      command: "node-standby-unstandby";
      payload: {
        standby: boolean;
        node_names: string[];
      };
    }
  | {
      command: "node-maintenance-unmaintenance";
      payload: {
        maintenance: boolean;
        node_names: string[];
      };
    }
  | {
      command: "cluster-add-nodes";
      payload: {
        nodes: {
          name: string;
          addrs?: string[];
          devices?: string[];
          watchdog?: string;
        }[];
        start?: boolean;
        enable?: boolean;
        no_watchdog_validation?: boolean;
        force_flags?: string[];
        wait?: boolean;
      };
    }
  | {
      command: "cluster-remove-nodes";
      payload: {
        node_list: string[];
        force_flags?: string[];
      };
    };

export const callCluster = async ({
  clusterName,
  command,
  payload,
}: {
  clusterName: string;
} & ClusterCommand): LibResult => {
  return call(`/managec/${clusterName}/api/v1/${command}/v1`, payload);
};
