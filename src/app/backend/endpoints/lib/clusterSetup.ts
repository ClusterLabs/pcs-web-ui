import * as t from "io-ts";

import { endpoint } from "app/backend/endpoints/endpoint";

import { shape } from "./shape";

export const clusterSetup = endpoint({
  url: "/manage/cluster-setup",
  method: "post",
  params: ({
    targetNode,
    setupData,
  }: {
    targetNode: string;
    setupData: {
      cluster_name: string;
      nodes: {
        name: string;
        addrs?: string[];
      }[];
      compression_options?: {
        model?: string; //a compression model e.g. zlib, lz4 or bzip2
        threshold?: number; // nonnegative integer
        level?: number; // nonnegative integer
      };
      crypto_options?: {
        model?: "nss" | "openssl";
        hash?: "none" | "md5" | "sha1" | "sha256" | "sha384" | "sha512";
        cipher?: "none" | "aes256" | "aes192" | "aes128";
      };
      totem_options?: {
        block_unlisted_ips?: "yes" | "no";
        consensus?: number; // nonnegative integer
        downcheck?: number; // nonnegative integer
        fail_recv_const?: number; // nonnegative integer
        heartbeat_failures_allowed?: number; // nonnegative integer
        hold?: number; // nonnegative integer
        join?: number; // nonnegative integer
        max_messages?: number; // nonnegative integer
        max_network_delay?: number; // nonnegative integer
        merge?: number; // nonnegative integer
        miss_count_const?: number; // nonnegative integer
        send_join?: number; // nonnegative integer
        seqno_unchanged_const?: number; // nonnegative integer
        token?: number; // nonnegative integer
        token_coefficient?: number; // nonnegative integer
        token_retransmit?: number; // nonnegative integer
        token_retransmits_before_loss_const?: number; // nonnegative integer
        window_size?: number; // nonnegative integer
      };
      quorum_options?: {
        auto_tie_breaker?: "0" | "1";
        last_man_standing?: "0" | "1";
        last_man_standing_window?: number; // positive integer
        wait_for_all?: "0" | "1";
      };
      wait?: boolean;
      start?: boolean;
      enable?: boolean;
      no_keys_sync?: boolean;
      force_flags?: string[];
    } & (
      | {
          transport_type: "knet";
          transport_options?: {
            ip_version?: "ipv4" | "ipv6" | "ipv4-6" | "ipv6-4";
            knet_pmtud_interval?: number; // positive integer
            link_mode?: "" | "active" | "passive" | "rr";
          };
          link_list: {
            linknumber: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
            link_priority?: number; // 0-255
            mcastport?: number; //a port number (1..65535)
            ping_interval?: number; // nonnegative integer
            ping_precision?: number; // nonnegative integer
            ping_timeout?: number; // nonnegative integer
            pong_count?: number; // nonnegative integer
            transport?: "sctp" | "udp";
          }[];
        }
      | {
          transport_type: "udp" | "udpu";
          transport_options?: {
            ip_version?: "ipv4" | "ipv6" | "ipv4-6" | "ipv6-4";
            netmtu?: number; // positive integer
          };
          link_list: {
            bindnetaddr: string; // ip address
            broadcast: "0" | "1";
            mcastaddr: string; // ip address
            mcastport: number; //a port number (1..65535)
            ttl: number; // 0-255,
          }[];
        }
    );
  }): [string, string][] => [
    ["target_node", targetNode],
    ["setup_data", JSON.stringify(setupData)],
  ],
  payload: undefined,
  shape: shape(t.null),
});
