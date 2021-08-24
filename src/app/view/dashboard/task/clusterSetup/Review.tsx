import React from "react";

import { ReviewList, ReviewValue, TaskLibStep } from "app/view/share";

import { useTask } from "./useTask";
import { ReviewLink } from "./ReviewLink";

export const Review: React.FC = () => {
  const {
    state: {
      nodeNameList,
      clusterName,
      linkList,
      quorumOptions,
      totemOptions,
      transportOptions,
      compressionOptions,
      cryptoOptions,
      libCall: { reports },
    },
  } = useTask();
  return (
    <TaskLibStep title="Review settings" reports={reports}>
      <ReviewList>
        <ReviewValue label="Cluster name" value={clusterName} />
        <ReviewValue
          label="Node addresses"
          value={nodeNameList.map((nodeName, i) => (
            <div key={i}>{nodeName}</div>
          ))}
        />
        <ReviewValue
          label="Knet links"
          value={
            <ReviewList>
              {linkList.map(link => (
                <ReviewValue
                  label={`Link ${link.linknumber}`}
                  key={link.linknumber}
                  value={
                    <ReviewList>
                      <ReviewValue
                        label="Addresses"
                        value={
                          <ReviewList>
                            {Object.entries(link.addresses).map(
                              ([nodeName, address]) => (
                                <ReviewValue
                                  key={nodeName}
                                  label={nodeName}
                                  value={address}
                                />
                              ),
                            )}
                          </ReviewList>
                        }
                      />
                      <ReviewLink link={link} field="mcastport" label="Port" />
                      <ReviewLink
                        link={link}
                        field="ping_interval"
                        label="Ping interval"
                      />
                      <ReviewLink
                        link={link}
                        field="ping_interval"
                        label="Ping interval"
                      />
                      <ReviewLink
                        link={link}
                        field="ping_precision"
                        label="Ping precision"
                      />
                      <ReviewLink
                        link={link}
                        field="ping_timeout"
                        label="Ping timeout"
                      />
                      <ReviewLink
                        link={link}
                        field="pong_count"
                        label="Pong count"
                      />
                      <ReviewLink
                        link={link}
                        field="transport"
                        label="Transport"
                      />
                    </ReviewList>
                  }
                />
              ))}
            </ReviewList>
          }
        />
        <ReviewValue
          label="Transport options"
          value={
            <ReviewList>
              <ReviewValue
                label="Ip version"
                value={transportOptions.ip_version}
                useDefault={{
                  whenValue: "default",
                  defaultValue: "ipv6-4",
                }}
              />

              <ReviewValue
                label="PMTUd Interval"
                value={transportOptions.knet_pmtud_interval}
                useDefault={{
                  whenValue: "",
                  defaultValue: "60",
                }}
              />

              <ReviewValue
                label="Link mode"
                value={transportOptions.link_mode}
                useDefault={{
                  whenValue: "default",
                  defaultValue: "passive",
                }}
              />
            </ReviewList>
          }
        />
        <ReviewValue
          label="Compression options"
          value={
            <ReviewList>
              <ReviewValue
                label="Model"
                value={compressionOptions.model}
                useDefault={{
                  whenValue: "",
                  defaultValue: "none",
                }}
              />

              <ReviewValue
                label="Threshold"
                value={compressionOptions.threshold}
                useDefault={{
                  whenValue: "",
                  defaultValue: "100 bytes",
                }}
              />

              <ReviewValue
                label="Level"
                value={compressionOptions.level}
                useDefault={{
                  whenValue: "",
                  defaultValue: "according to compression library",
                }}
              />
            </ReviewList>
          }
        />
        <ReviewValue
          label="Crypto options"
          value={
            <ReviewList>
              <ReviewValue
                label="Model"
                value={cryptoOptions.model}
                useDefault={{
                  whenValue: "default",
                  defaultValue: "nss",
                }}
              />

              <ReviewValue
                label="Hash"
                value={cryptoOptions.hash}
                useDefault={{
                  whenValue: "default",
                  defaultValue: "sha256",
                }}
              />

              <ReviewValue
                label="Cipher"
                value={cryptoOptions.cipher}
                useDefault={{
                  whenValue: "default",
                  defaultValue: "aes256",
                }}
              />
            </ReviewList>
          }
        />
        <ReviewValue
          label="Quorum options"
          value={
            <ReviewList>
              <ReviewValue
                label="Auto tie breaker"
                value={quorumOptions.auto_tie_breaker}
                useDefault={{
                  whenValue: "default",
                  defaultValue: "off",
                }}
              />

              <ReviewValue
                label="Last man standing"
                value={quorumOptions.last_man_standing}
                useDefault={{
                  whenValue: "default",
                  defaultValue: "off",
                }}
              />

              <ReviewValue
                label="Last man standing window"
                value={quorumOptions.last_man_standing_window}
                useDefault={{
                  whenValue: "",
                  defaultValue: "1000 ms",
                }}
              />

              <ReviewValue
                label="Wait for all"
                value={quorumOptions.wait_for_all}
                useDefault={{
                  whenValue: "default",
                  defaultValue: "off",
                }}
              />
            </ReviewList>
          }
        />
        <ReviewValue
          label="Totem options"
          value={
            <ReviewList>
              <ReviewValue
                label="Block unlisted ips"
                value={totemOptions.block_unlisted_ips}
                useDefault={{
                  whenValue: "default",
                  defaultValue: "yes",
                }}
              />

              <ReviewValue
                label="Consensus timeout"
                value={totemOptions.consensus}
                useDefault={{
                  whenValue: "",
                  defaultValue: "1200 milliseconds",
                }}
              />

              <ReviewValue
                label="Downcheck timeout"
                value={totemOptions.downcheck}
                useDefault={{
                  whenValue: "",
                  defaultValue: "1000 milliseconds",
                }}
              />

              <ReviewValue
                label="Fail receive constant"
                value={totemOptions.fail_recv_const}
                useDefault={{
                  whenValue: "",
                  defaultValue: "2500 failures to receive a message",
                }}
              />

              <ReviewValue
                label="Heartbeat failures allowed"
                value={totemOptions.heartbeat_failures_allowed}
                useDefault={{
                  whenValue: "",
                  defaultValue: "0 (disabled)",
                }}
              />

              <ReviewValue
                label="Hold timeout"
                value={totemOptions.hold}
                useDefault={{
                  whenValue: "",
                  defaultValue: "180 milliseconds",
                }}
              />

              <ReviewValue
                label="Join timeout"
                value={totemOptions.join}
                useDefault={{
                  whenValue: "",
                  defaultValue: "50 milliseconds",
                }}
              />

              <ReviewValue
                label="Max messages"
                value={totemOptions.max_messages}
                useDefault={{
                  whenValue: "",
                  defaultValue: "17",
                }}
              />

              <ReviewValue
                label="Max network delay"
                value={totemOptions.max_network_delay}
                useDefault={{
                  whenValue: "",
                  defaultValue: "50 milliseconds",
                }}
              />

              <ReviewValue
                label="Merge timeout"
                value={totemOptions.merge}
                useDefault={{
                  whenValue: "",
                  defaultValue: "200 milliseconds",
                }}
              />

              <ReviewValue
                label="Miss count const"
                value={totemOptions.miss_count_const}
                useDefault={{
                  whenValue: "",
                  defaultValue: "5 messages",
                }}
              />

              <ReviewValue
                label="Send join timeout"
                value={totemOptions.send_join}
                useDefault={{
                  whenValue: "",
                  defaultValue: "0 milliseconds",
                }}
              />

              <ReviewValue
                label="Seqno unchanged constant"
                value={totemOptions.seqno_unchanged_const}
                useDefault={{
                  whenValue: "",
                  defaultValue: "30 rotations",
                }}
              />

              <ReviewValue
                label="Token timeout"
                value={totemOptions.token}
                useDefault={{
                  whenValue: "",
                  defaultValue: "1000 milliseconds",
                }}
              />

              <ReviewValue
                label="Token coefficient"
                value={totemOptions.token_coefficient}
                useDefault={{
                  whenValue: "",
                  defaultValue: "650 milliseconds",
                }}
              />

              <ReviewValue
                label="Token retransmit timeout"
                value={totemOptions.token_retransmit}
                useDefault={{
                  whenValue: "",
                  defaultValue: "238 milliseconds",
                }}
              />

              <ReviewValue
                label="Token retransmits before loss constant"
                value={totemOptions.token_retransmits_before_loss_const}
                useDefault={{
                  whenValue: "",
                  defaultValue: "4 retransmissions",
                }}
              />

              <ReviewValue
                label="Window size"
                value={totemOptions.window_size}
                useDefault={{
                  whenValue: "",
                  defaultValue: "50 messages",
                }}
              />
            </ReviewList>
          }
        />
      </ReviewList>
    </TaskLibStep>
  );
};
