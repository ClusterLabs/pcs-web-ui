import React from "react";
import { Form } from "@patternfly/react-core";

import { FormRadios, FormText, TaskLibStep } from "app/view/share";

import { useTask } from "./useTask";

const PREFIX = "cluster-setup-totem";
export const Totem: React.FC = () => {
  const {
    allReports,
    updateTotemOptions,
    state: { totemOptions },
  } = useTask();
  return (
    <TaskLibStep title="Totem" reports={allReports}>
      <Form>
        <FormRadios
          id={`${PREFIX}-block-unlisted-ips`}
          label="Block unlisted ips"
          popover={{
            header: (
              <>
                Allow UDPU and KNET to drop packets from IP addresses that are
                not known (nodes which don't exist in the nodelist) to corosync.
                Value is yes or no
              </>
            ),
            body: (
              <>
                <p>
                  This feature is mainly to protect against the joining of nodes
                  with outdated configurations after a cluster split. Another
                  use case is to allow the atomic merge of two independent
                  clusters.
                </p>
                <p>
                  Changing the default value is not recommended, the overhead is
                  tiny and an existing cluster may fail if corosync is started
                  on an unlisted node with an old configuration.
                </p>
              </>
            ),
            defaultValue: "yes",
          }}
          options={["yes", "no", "default"]}
          selected={totemOptions.block_unlisted_ips}
          onChange={value => updateTotemOptions({ block_unlisted_ips: value })}
        />

        <FormText
          label="Consensus timeout"
          id={`${PREFIX}-consensus`}
          popover={{
            header: "Consensus timeout",
            body: (
              <>
                <p>
                  This timeout specifies in milliseconds how long to wait for
                  consensus to be achieved before starting a new round of
                  membership configuration. The minimum value for consensus must
                  be 1.2 * token. This value will be automatically calculated at
                  1.2 * token if the user doesn't specify a consensus value.
                </p>
                <p>
                  For two node clusters, a consensus larger than the join
                  timeout but less than token is safe. For three node or larger
                  clusters, consensus should be larger than token. There is an
                  increasing risk of odd membership changes, which still
                  guarantee virtual synchrony, as node count grows if consensus
                  is less than token.
                </p>
              </>
            ),
            defaultValue: "1200 milliseconds",
          }}
          value={totemOptions.consensus || ""}
          onChange={value => updateTotemOptions({ consensus: value })}
        />

        <FormText
          label="Downcheck timeout"
          id={`${PREFIX}-downcheck`}
          popover={{
            header: "Downcheck timeout",
            body: (
              <p>
                This timeout specifies in milliseconds how long to wait before
                checking that a network interface is back up after it has been
                downed.
              </p>
            ),
            defaultValue: "1000 milliseconds",
          }}
          value={totemOptions.downcheck || ""}
          onChange={value => updateTotemOptions({ downcheck: value })}
        />

        <FormText
          label="Fail receive constant"
          id={`${PREFIX}-fail_recv_const`}
          popover={{
            header: "Fail receive constant",
            body: (
              <p>
                This constant specifies how many rotations of the token without
                receiving any of the messages when messages should be received
                may occur before a new configuration is formed.
              </p>
            ),
            defaultValue: "2500 failures to receive a message",
          }}
          value={totemOptions.fail_recv_const || ""}
          onChange={value => updateTotemOptions({ fail_recv_const: value })}
        />

        <FormText
          label="Heartbeat failures allowed"
          id={`${PREFIX}-heartbeat_failures_allowed`}
          popover={{
            header: "Heartbeat failures allowed",
            body: (
              <>
                <p>
                  [HeartBeating mechanism] Configures the optional HeartBeating
                  mechanism for faster failure detection. Keep in mind that
                  engaging this mechanism in lossy networks could cause faulty
                  loss declaration as the mechanism relies on the network for
                  heartbeating.
                </p>
                <p>
                  So as a rule of thumb use this mechanism if you require
                  improved failure in low to medium utilized networks.
                </p>
                <p>
                  This constant specifies the number of heartbeat failures the
                  system should tolerate before declaring heartbeat failure e.g
                  3. Also if this value is not set or is 0 then the heartbeat
                  mechanism is not engaged in the system and token rotation is
                  the method of failure detection
                </p>
              </>
            ),
            defaultValue: "0 (disabled)",
          }}
          value={totemOptions.heartbeat_failures_allowed || ""}
          onChange={value =>
            updateTotemOptions({ heartbeat_failures_allowed: value })
          }
        />

        <FormText
          label="Hold timeout"
          id={`${PREFIX}-hold`}
          popover={{
            header: "Hold timeout",
            body: (
              <p>
                This timeout specifies in milliseconds how long the token should
                be held by the representative when the protocol is under low
                utilization. It is not recommended to alter this value without
                guidance from the corosync community.
              </p>
            ),
            defaultValue: "180 milliseconds",
          }}
          value={totemOptions.hold || ""}
          onChange={value => updateTotemOptions({ hold: value })}
        />

        <FormText
          label="Join timeout"
          id={`${PREFIX}-join`}
          popover={{
            header: "Join timeout",
            body: (
              <p>
                This timeout specifies in milliseconds how long to wait for join
                messages in the membership protocol.
              </p>
            ),
            defaultValue: "50 milliseconds",
          }}
          value={totemOptions.join || ""}
          onChange={value => updateTotemOptions({ join: value })}
        />

        <FormText
          label="Max messages"
          id={`${PREFIX}-max_messages`}
          popover={{
            header: "Max messages",
            body: (
              <p>
                This constant specifies the maximum number of messages that may
                be sent by one processor on receipt of the token. The
                max_messages parameter is limited to 256000 / netmtu to prevent
                overflow of the kernel transmit buffers.
              </p>
            ),
            defaultValue: "17",
          }}
          value={totemOptions.max_messages || ""}
          onChange={value => updateTotemOptions({ max_messages: value })}
        />

        <FormText
          label="Max network delay"
          id={`${PREFIX}-max_network_delay`}
          popover={{
            header: "Max network delay",
            body: (
              <p>
                [HeartBeating mechanism] This constant specifies in milliseconds
                the approximate delay that your network takes to transport one
                packet from one machine to another. This value is to be set by
                system engineers and please don't change if not sure as this
                effects the failure detection mechanism using heartbeat.
              </p>
            ),
            defaultValue: "50 milliseconds",
          }}
          value={totemOptions.max_network_delay || ""}
          onChange={value => updateTotemOptions({ max_network_delay: value })}
        />

        <FormText
          label="Merge timeout"
          id={`${PREFIX}-merge`}
          popover={{
            header: "Merge timeout",
            body: (
              <p>
                This timeout specifies in milliseconds how long to wait before
                checking for a partition when no multicast traffic is being
                sent. If multicast traffic is being sent, the merge detection
                happens automatically as a function of the protocol.
              </p>
            ),
            defaultValue: "200 milliseconds",
          }}
          value={totemOptions.merge || ""}
          onChange={value => updateTotemOptions({ merge: value })}
        />

        <FormText
          label="Miss count const"
          id={`${PREFIX}-miss_count_const`}
          popover={{
            header: "Miss count const",
            body: (
              <p>
                This constant defines the maximum number of times on receipt of
                a token a message is checked for retransmission before a
                retransmission occurs. This parameter is useful to modify for
                switches that delay multicast packets compared to unicast
                packets. The default setting works well for nearly all modern
                switches.
              </p>
            ),
            defaultValue: "5 messages",
          }}
          value={totemOptions.miss_count_const || ""}
          onChange={value => updateTotemOptions({ miss_count_const: value })}
        />

        <FormText
          label="Send join timeout"
          id={`${PREFIX}-send_join`}
          popover={{
            header: "Send join timeout",
            body: (
              <p>
                This timeout specifies in milliseconds an upper range between 0
                and send_join to wait before sending a join message. For
                configurations with less than 32 nodes, this parameter is not
                necessary. For larger rings, this parameter is necessary to
                ensure the NIC is not overflowed with join messages on formation
                of a new ring. A reasonable value for large rings (128 nodes)
                would be 80msec. Other timer values must also change if this
                value is changed. Seek advice from the corosync mailing list if
                trying to run larger configurations.
              </p>
            ),
            defaultValue: "0 milliseconds",
          }}
          value={totemOptions.send_join || ""}
          onChange={value => updateTotemOptions({ send_join: value })}
        />

        <FormText
          label="Seqno unchanged constant"
          id={`${PREFIX}-seqno_unchanged_const`}
          popover={{
            header: "Seqno unchanged constant",
            body: (
              <p>
                This constant specifies how many rotations of the token without
                any multicast traffic should occur before the hold timer is
                started.
              </p>
            ),
            defaultValue: "30 rotations",
          }}
          value={totemOptions.seqno_unchanged_const || ""}
          onChange={value =>
            updateTotemOptions({ seqno_unchanged_const: value })
          }
        />

        <FormText
          label="Token timeout"
          id={`${PREFIX}-token`}
          popover={{
            header: "Token timeout",
            body: (
              <>
                <p>
                  This timeout is used directly or as a base for real token
                  timeout calculation (explained in token_coefficient section).
                  Token timeout specifies in milliseconds until a token loss is
                  declared after not receiving a token. This is the time spent
                  detecting a failure of a processor in the current
                  configuration. Reforming a new configuration takes about 50
                  milliseconds in addition to this timeout.
                </p>
                <p>
                  For real token timeout used by totem it's possible to read
                  cmap value of runtime.config.token key.
                </p>
              </>
            ),
            defaultValue: "1000 milliseconds",
          }}
          value={totemOptions.token || ""}
          onChange={value => updateTotemOptions({ token: value })}
        />

        <FormText
          label="Token coefficient"
          id={`${PREFIX}-token_coefficient`}
          popover={{
            header: "Token coefficient",
            body: (
              <p>
                This value is used only when nodelist section is specified and
                contains at least 3 nodes. If so, real token timeout is then
                computed as token + (number_of_nodes - 2) * token_coefficient.
                This allows cluster to scale without manually changing token
                timeout every time new node is added. This value can be set to 0
                resulting in effective removal of this feature.
              </p>
            ),
            defaultValue: "650 milliseconds",
          }}
          value={totemOptions.token_coefficient || ""}
          onChange={value => updateTotemOptions({ token_coefficient: value })}
        />

        <FormText
          label="Token retransmit timeout"
          id={`${PREFIX}-token_retransmit`}
          popover={{
            header: "Token retransmit timeout",
            body: (
              <p>
                This timeout specifies in milliseconds after how long before
                receiving a token the token is retransmitted. This will be
                automatically calculated if token is modified. It is not
                recommended to alter this value without guidance from the
                corosync community.
              </p>
            ),
            defaultValue: "238 milliseconds",
          }}
          value={totemOptions.token_retransmit || ""}
          onChange={value => updateTotemOptions({ token_retransmit: value })}
        />

        <FormText
          label="Token retransmits before loss constant"
          id={`${PREFIX}-token_retransmits_before_loss_const`}
          popover={{
            header: "Token retransmits before loss const",
            body: (
              <p>
                This value identifies how many token retransmits should be
                attempted before forming a new configuration. If this value is
                set, retransmit and hold will be automatically calculated from
                retransmits_before_loss and token.
              </p>
            ),
            defaultValue: "4 retransmissions",
          }}
          value={totemOptions.token_retransmits_before_loss_const || ""}
          onChange={value =>
            updateTotemOptions({ token_retransmits_before_loss_const: value })
          }
        />

        <FormText
          label="Window size"
          id={`${PREFIX}-window_size`}
          popover={{
            header: "Window size",
            body: (
              <p>
                This constant specifies the maximum number of messages that may
                be sent on one token rotation. If all processors perform equally
                well, this value could be large (300), which would introduce
                higher latency from origination to delivery for very large
                rings. To reduce latency in large rings(16+), the defaults are a
                safe compromise. If 1 or more slow processor(s) are present
                among fast processors, window_size should be no larger than
                256000 / netmtu to avoid overflow of the kernel receive buffers.
                The user is notified of this by the display of a retransmit list
                in the notification logs. There is no loss of data, but
                performance is reduced when these errors occur.
              </p>
            ),
            defaultValue: "50 messages",
          }}
          value={totemOptions.window_size || ""}
          onChange={value => updateTotemOptions({ window_size: value })}
        />
      </Form>
    </TaskLibStep>
  );
};
