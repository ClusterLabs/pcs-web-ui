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
        threshold?: string; // nonnegative integer
        level?: string; // nonnegative integer
      };
      crypto_options?: {
        model?: "nss" | "openssl";
        hash?: "none" | "md5" | "sha1" | "sha256" | "sha384" | "sha512";
        cipher?: "none" | "aes256" | "aes192" | "aes128";
      };
      totem_options?: {
        block_unlisted_ips?: "yes" | "no";
        consensus?: string; // nonnegative integer
        downcheck?: string; // nonnegative integer
        fail_recv_const?: string; // nonnegative integer
        heartbeat_failures_allowed?: string; // nonnegative integer
        hold?: string; // nonnegative integer
        join?: string; // nonnegative integer
        max_messages?: string; // nonnegative integer
        max_network_delay?: string; // nonnegative integer
        merge?: string; // nonnegative integer
        miss_count_const?: string; // nonnegative integer
        send_join?: string; // nonnegative integer
        seqno_unchanged_const?: string; // nonnegative integer
        token?: string; // nonnegative integer
        token_coefficient?: string; // nonnegative integer
        token_retransmit?: string; // nonnegative integer
        token_retransmits_before_loss_const?: string; // nonnegative integer
        window_size?: string; // nonnegative integer
      };
      quorum_options?: {
        auto_tie_breaker?: "0" | "1";
        last_man_standing?: "0" | "1";
        last_man_standing_window?: string; // positive integer
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
            knet_pmtud_interval?: string; // positive integer
            link_mode?: "" | "active" | "passive" | "rr";
          };
          link_list: {
            linknumber: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
            link_priority?: string; // 0-255
            mcastport?: string; //a port number (1..65535)
            ping_interval?: string; // nonnegative integer
            ping_precision?: string; // nonnegative integer
            ping_timeout?: string; // nonnegative integer
            pong_count?: string; // nonnegative integer
            transport?: "sctp" | "udp";
          }[];
        }
      | {
          transport_type: "udp" | "udpu";
          transport_options?: {
            ip_version?: "ipv4" | "ipv6" | "ipv4-6" | "ipv6-4";
            netmtu?: string; // positive integer
          };
          link_list: {
            bindnetaddr: string; // ip address
            broadcast: "0" | "1";
            mcastaddr: string; // ip address
            mcastport: string; //a port number (1..65535)
            ttl: string; // 0-255,
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
