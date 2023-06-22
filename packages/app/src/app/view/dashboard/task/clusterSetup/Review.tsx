import {ReviewItem, ReviewList, TaskLibStep} from "app/view/share";
import {testMarks} from "app/view/dataTest";

import {useTask} from "./useTask";
import {ReviewLink} from "./ReviewLink";

const {review} = testMarks.setupCluster;
const {knetLink, transport, quorum, totem} = review;
export const Review = () => {
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
      libCall: {reports},
    },
  } = useTask();
  return (
    <TaskLibStep title="Review settings" reports={reports}>
      <ReviewList>
        <ReviewItem
          label="Cluster name"
          value={clusterName}
          {...review.clusterName.mark}
        />
        <ReviewItem
          label="Node names"
          value={nodeNameList.map((nodeName, i) => (
            <div key={i}>{nodeName}</div>
          ))}
          {...review.nodeNames.mark}
        />
        <ReviewItem
          label="Knet links"
          value={
            <>
              {linkList.length === 0 && <span>No link specified</span>}
              {linkList.length > 0 && (
                <ReviewList>
                  {linkList.map(link => (
                    <ReviewItem
                      label={`Link ${link.linknumber}`}
                      key={link.linknumber}
                      value={
                        <ReviewList {...knetLink.mark}>
                          <ReviewItem
                            label="Addresses"
                            value={
                              <ReviewList>
                                {Object.entries(link.addresses).map(
                                  ([nodeName, address]) => (
                                    <ReviewItem
                                      key={nodeName}
                                      label={
                                        <span {...knetLink.nodeName.mark}>
                                          nodeName
                                        </span>
                                      }
                                      value={address}
                                      {...knetLink.address.mark}
                                    />
                                  ),
                                )}
                              </ReviewList>
                            }
                          />
                          <ReviewLink
                            link={link}
                            field="link_priority"
                            label="Priority"
                            {...knetLink.link_priority.mark}
                          />
                          <ReviewLink
                            link={link}
                            field="mcastport"
                            label="Port"
                            {...knetLink.mcastport.mark}
                          />
                          <ReviewLink
                            link={link}
                            field="ping_interval"
                            label="Ping interval"
                            {...knetLink.ping_interval.mark}
                          />
                          <ReviewLink
                            link={link}
                            field="ping_precision"
                            label="Ping precision"
                            {...knetLink.ping_precision.mark}
                          />
                          <ReviewLink
                            link={link}
                            field="ping_timeout"
                            label="Ping timeout"
                            {...knetLink.ping_timeout.mark}
                          />
                          <ReviewLink
                            link={link}
                            field="pong_count"
                            label="Pong count"
                            {...knetLink.pong_count.mark}
                          />
                          <ReviewLink
                            link={link}
                            field="transport"
                            label="Transport"
                            {...knetLink.transport.mark}
                          />
                        </ReviewList>
                      }
                    />
                  ))}
                </ReviewList>
              )}
            </>
          }
        />
        <ReviewItem
          label="Transport options"
          value={
            <ReviewList {...transport.options.mark}>
              <ReviewItem
                label="Ip version"
                value={transportOptions.ip_version}
                useDefault={{
                  whenValue: "default",
                  defaultValue: "ipv6-4",
                }}
                {...transport.options.ip_version.mark}
              />

              <ReviewItem
                label="PMTUd Interval"
                value={transportOptions.knet_pmtud_interval}
                useDefault={{
                  whenValue: "",
                  defaultValue: "60",
                }}
                {...transport.options.knet_pmtud_interval.mark}
              />

              <ReviewItem
                label="Link mode"
                value={transportOptions.link_mode}
                useDefault={{
                  whenValue: "default",
                  defaultValue: "passive",
                }}
                {...transport.options.link_mode.mark}
              />
            </ReviewList>
          }
        />
        <ReviewItem
          label="Compression options"
          value={
            <ReviewList {...transport.compression.mark}>
              <ReviewItem
                label="Model"
                value={compressionOptions.model}
                useDefault={{
                  whenValue: "",
                  defaultValue: "none",
                }}
                {...transport.compression.model.mark}
              />

              <ReviewItem
                label="Threshold"
                value={compressionOptions.threshold}
                useDefault={{
                  whenValue: "",
                  defaultValue: "100 bytes",
                }}
                {...transport.compression.threshold.mark}
              />

              <ReviewItem
                label="Level"
                value={compressionOptions.level}
                useDefault={{
                  whenValue: "",
                  defaultValue: "according to compression library",
                }}
                {...transport.compression.level.mark}
              />
            </ReviewList>
          }
        />
        <ReviewItem
          label="Crypto options"
          value={
            <ReviewList {...transport.crypto.mark}>
              <ReviewItem
                label="Model"
                value={cryptoOptions.model}
                useDefault={{
                  whenValue: "default",
                  defaultValue: "nss",
                }}
                {...transport.crypto.model.mark}
              />

              <ReviewItem
                label="Hash"
                value={cryptoOptions.hash}
                useDefault={{
                  whenValue: "default",
                  defaultValue: "sha256",
                }}
                {...transport.crypto.hash.mark}
              />

              <ReviewItem
                label="Cipher"
                value={cryptoOptions.cipher}
                useDefault={{
                  whenValue: "default",
                  defaultValue: "aes256",
                }}
                {...transport.crypto.cipher.mark}
              />
            </ReviewList>
          }
        />
        <ReviewItem
          label="Quorum options"
          value={
            <ReviewList {...quorum.mark}>
              <ReviewItem
                label="Auto tie breaker"
                value={quorumOptions.auto_tie_breaker}
                useDefault={{
                  whenValue: "default",
                  defaultValue: "off",
                }}
                {...quorum.auto_tie_breaker.mark}
              />

              <ReviewItem
                label="Last man standing"
                value={quorumOptions.last_man_standing}
                useDefault={{
                  whenValue: "default",
                  defaultValue: "off",
                }}
                {...quorum.last_man_standing.mark}
              />

              <ReviewItem
                label="Last man standing window"
                value={quorumOptions.last_man_standing_window}
                useDefault={{
                  whenValue: "",
                  defaultValue: "1000 ms",
                }}
                {...quorum.last_man_standing_window.mark}
              />

              <ReviewItem
                label="Wait for all"
                value={quorumOptions.wait_for_all}
                useDefault={{
                  whenValue: "default",
                  defaultValue: "off",
                }}
                {...quorum.wait_for_all.mark}
              />
            </ReviewList>
          }
        />
        <ReviewItem
          label="Totem options"
          value={
            <ReviewList {...totem.mark}>
              <ReviewItem
                label="Block unlisted ips"
                value={totemOptions.block_unlisted_ips}
                {...totem.block_unlisted_ips.mark}
                useDefault={{
                  whenValue: "default",
                  defaultValue: "yes",
                }}
              />

              <ReviewItem
                label="Consensus timeout"
                value={totemOptions.consensus}
                {...totem.consensus.mark}
                useDefault={{
                  whenValue: "",
                  defaultValue: "1200 milliseconds",
                }}
              />

              <ReviewItem
                label="Downcheck timeout"
                value={totemOptions.downcheck}
                {...totem.downcheck.mark}
                useDefault={{
                  whenValue: "",
                  defaultValue: "1000 milliseconds",
                }}
              />

              <ReviewItem
                label="Fail receive constant"
                value={totemOptions.fail_recv_const}
                {...totem.fail_recv_const.mark}
                useDefault={{
                  whenValue: "",
                  defaultValue: "2500 failures to receive a message",
                }}
              />

              <ReviewItem
                label="Heartbeat failures allowed"
                value={totemOptions.heartbeat_failures_allowed}
                {...totem.heartbeat_failures_allowed.mark}
                useDefault={{
                  whenValue: "",
                  defaultValue: "0 (disabled)",
                }}
              />

              <ReviewItem
                label="Hold timeout"
                value={totemOptions.hold}
                {...totem.hold.mark}
                useDefault={{
                  whenValue: "",
                  defaultValue: "180 milliseconds",
                }}
              />

              <ReviewItem
                label="Join timeout"
                value={totemOptions.join}
                {...totem.join.mark}
                useDefault={{
                  whenValue: "",
                  defaultValue: "50 milliseconds",
                }}
              />

              <ReviewItem
                label="Max messages"
                value={totemOptions.max_messages}
                {...totem.max_messages.mark}
                useDefault={{
                  whenValue: "",
                  defaultValue: "17",
                }}
              />

              <ReviewItem
                label="Max network delay"
                value={totemOptions.max_network_delay}
                {...totem.max_network_delay.mark}
                useDefault={{
                  whenValue: "",
                  defaultValue: "50 milliseconds",
                }}
              />

              <ReviewItem
                label="Merge timeout"
                value={totemOptions.merge}
                {...totem.merge.mark}
                useDefault={{
                  whenValue: "",
                  defaultValue: "200 milliseconds",
                }}
              />

              <ReviewItem
                label="Miss count const"
                value={totemOptions.miss_count_const}
                {...totem.miss_count_const.mark}
                useDefault={{
                  whenValue: "",
                  defaultValue: "5 messages",
                }}
              />

              <ReviewItem
                label="Send join timeout"
                value={totemOptions.send_join}
                {...totem.send_join.mark}
                useDefault={{
                  whenValue: "",
                  defaultValue: "0 milliseconds",
                }}
              />

              <ReviewItem
                label="Seqno unchanged constant"
                value={totemOptions.seqno_unchanged_const}
                {...totem.seqno_unchanged_const.mark}
                useDefault={{
                  whenValue: "",
                  defaultValue: "30 rotations",
                }}
              />

              <ReviewItem
                label="Token timeout"
                value={totemOptions.token}
                {...totem.token.mark}
                useDefault={{
                  whenValue: "",
                  defaultValue: "1000 milliseconds",
                }}
              />

              <ReviewItem
                label="Token coefficient"
                value={totemOptions.token_coefficient}
                {...totem.token_coefficient.mark}
                useDefault={{
                  whenValue: "",
                  defaultValue: "650 milliseconds",
                }}
              />

              <ReviewItem
                label="Token retransmit timeout"
                value={totemOptions.token_retransmit}
                {...totem.token_retransmit.mark}
                useDefault={{
                  whenValue: "",
                  defaultValue: "238 milliseconds",
                }}
              />

              <ReviewItem
                label="Token retransmits before loss constant"
                value={totemOptions.token_retransmits_before_loss_const}
                {...totem.token_retransmits_before_loss_const.mark}
                useDefault={{
                  whenValue: "",
                  defaultValue: "4 retransmissions",
                }}
              />

              <ReviewItem
                label="Window size"
                value={totemOptions.window_size}
                {...totem.window_size.mark}
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
