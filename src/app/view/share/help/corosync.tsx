import { clusterSetup } from "app/backend";

import type { Help } from "./help";

type SetupParams = Parameters<typeof clusterSetup>[0];
type TotemOptions = NonNullable<SetupParams["setupData"]["totem_options"]>;

export const totem: Record<keyof TotemOptions, Help> = {
  block_unlisted_ips: {
    header: (
      <>
        Allow UDPU and KNET to drop packets from IP addresses that are not known
        (nodes which don't exist in the nodelist) to corosync. Value is yes or
        no
      </>
    ),
    body: (
      <>
        <p>
          This feature is mainly to protect against the joining of nodes with
          outdated configurations after a cluster split. Another use case is to
          allow the atomic merge of two independent clusters.
        </p>
        <p>
          Changing the default value is not recommended, the overhead is tiny
          and an existing cluster may fail if corosync is started on an unlisted
          node with an old configuration.
        </p>
      </>
    ),
    defaultValue: null,
  },

  consensus: {
    header: "Consensus timeout",
    body: (
      <>
        <p>
          This timeout specifies in milliseconds how long to wait for consensus
          to be achieved before starting a new round of membership
          configuration. The minimum value for consensus must be 1.2 * token.
          This value will be automatically calculated at 1.2 * token if the user
          doesn't specify a consensus value.
        </p>
        <p>
          For two node clusters, a consensus larger than the join timeout but
          less than token is safe. For three node or larger clusters, consensus
          should be larger than token. There is an increasing risk of odd
          membership changes, which still guarantee virtual synchrony, as node
          count grows if consensus is less than token.
        </p>
      </>
    ),
    defaultValue: "1200 milliseconds",
  },

  downcheck: {
    header: "Downcheck timeout",
    body: (
      <p>
        This timeout specifies in milliseconds how long to wait before checking
        that a network interface is back up after it has been downed.
      </p>
    ),
    defaultValue: "1000 milliseconds",
  },

  fail_recv_const: {
    header: "Fail receive constant",
    body: (
      <p>
        This constant specifies how many rotations of the token without
        receiving any of the messages when messages should be received may occur
        before a new configuration is formed.
      </p>
    ),
    defaultValue: "2500 failures to receive a message",
  },

  heartbeat_failures_allowed: {
    header: "Heartbeat failures allowed",
    body: (
      <>
        <p>
          [HeartBeating mechanism] Configures the optional HeartBeating
          mechanism for faster failure detection. Keep in mind that engaging
          this mechanism in lossy networks could cause faulty loss declaration
          as the mechanism relies on the network for heartbeating.
        </p>
        <p>
          So as a rule of thumb use this mechanism if you require improved
          failure in low to medium utilized networks.
        </p>
        <p>
          This constant specifies the number of heartbeat failures the system
          should tolerate before declaring heartbeat failure e.g 3. Also if this
          value is not set or is 0 then the heartbeat mechanism is not engaged
          in the system and token rotation is the method of failure detection
        </p>
      </>
    ),
    defaultValue: "0 (disabled)",
  },

  hold: {
    header: "Hold timeout",
    body: (
      <p>
        This timeout specifies in milliseconds how long the token should be held
        by the representative when the protocol is under low utilization. It is
        not recommended to alter this value without guidance from the corosync
        community.
      </p>
    ),
    defaultValue: "180 milliseconds",
  },

  join: {
    header: "Join timeout",
    body: (
      <p>
        This timeout specifies in milliseconds how long to wait for join
        messages in the membership protocol.
      </p>
    ),
    defaultValue: "50 milliseconds",
  },

  max_messages: {
    header: "Max messages",
    body: (
      <p>
        This constant specifies the maximum number of messages that may be sent
        by one processor on receipt of the token. The max_messages parameter is
        limited to 256000 / netmtu to prevent overflow of the kernel transmit
        buffers.
      </p>
    ),
    defaultValue: "17",
  },

  max_network_delay: {
    header: "Max network delay",
    body: (
      <p>
        [HeartBeating mechanism] This constant specifies in milliseconds the
        approximate delay that your network takes to transport one packet from
        one machine to another. This value is to be set by system engineers and
        please don't change if not sure as this effects the failure detection
        mechanism using heartbeat.
      </p>
    ),
    defaultValue: "50 milliseconds",
  },

  merge: {
    header: "Merge timeout",
    body: (
      <p>
        This timeout specifies in milliseconds how long to wait before checking
        for a partition when no multicast traffic is being sent. If multicast
        traffic is being sent, the merge detection happens automatically as a
        function of the protocol.
      </p>
    ),
    defaultValue: "200 milliseconds",
  },

  miss_count_const: {
    header: "Miss count const",
    body: (
      <p>
        This constant defines the maximum number of times on receipt of a token
        a message is checked for retransmission before a retransmission occurs.
        This parameter is useful to modify for switches that delay multicast
        packets compared to unicast packets. The default setting works well for
        nearly all modern switches.
      </p>
    ),
    defaultValue: "5 messages",
  },

  send_join: {
    header: "Send join timeout",
    body: (
      <p>
        This timeout specifies in milliseconds an upper range between 0 and
        send_join to wait before sending a join message. For configurations with
        less than 32 nodes, this parameter is not necessary. For larger rings,
        this parameter is necessary to ensure the NIC is not overflowed with
        join messages on formation of a new ring. A reasonable value for large
        rings (128 nodes) would be 80msec. Other timer values must also change
        if this value is changed. Seek advice from the corosync mailing list if
        trying to run larger configurations.
      </p>
    ),
    defaultValue: "0 milliseconds",
  },

  seqno_unchanged_const: {
    header: "Seqno unchanged constant",
    body: (
      <p>
        This constant specifies how many rotations of the token without any
        multicast traffic should occur before the hold timer is started.
      </p>
    ),
    defaultValue: "30 rotations",
  },

  token: {
    header: "Token timeout",
    body: (
      <>
        <p>
          This timeout is used directly or as a base for real token timeout
          calculation (explained in token_coefficient section). Token timeout
          specifies in milliseconds until a token loss is declared after not
          receiving a token. This is the time spent detecting a failure of a
          processor in the current configuration. Reforming a new configuration
          takes about 50 milliseconds in addition to this timeout.
        </p>
        <p>
          For real token timeout used by totem it's possible to read cmap value
          of runtime.config.token key.
        </p>
      </>
    ),
    defaultValue: "1000 milliseconds",
  },

  token_coefficient: {
    header: "Token coefficient",
    body: (
      <p>
        This value is used only when nodelist section is specified and contains
        at least 3 nodes. If so, real token timeout is then computed as token +
        (number_of_nodes - 2) * token_coefficient. This allows cluster to scale
        without manually changing token timeout every time new node is added.
        This value can be set to 0 resulting in effective removal of this
        feature.
      </p>
    ),
    defaultValue: "650 milliseconds",
  },

  token_retransmit: {
    header: "Token retransmit timeout",
    body: (
      <p>
        This timeout specifies in milliseconds after how long before receiving a
        token the token is retransmitted. This will be automatically calculated
        if token is modified. It is not recommended to alter this value without
        guidance from the corosync community.
      </p>
    ),
    defaultValue: "238 milliseconds",
  },

  token_retransmits_before_loss_const: {
    header: "Token retransmits before loss const",
    body: (
      <p>
        This value identifies how many token retransmits should be attempted
        before forming a new configuration. If this value is set, retransmit and
        hold will be automatically calculated from retransmits_before_loss and
        token.
      </p>
    ),
    defaultValue: "4 retransmissions",
  },

  window_size: {
    header: "Window size",
    body: (
      <p>
        This constant specifies the maximum number of messages that may be sent
        on one token rotation. If all processors perform equally well, this
        value could be large (300), which would introduce higher latency from
        origination to delivery for very large rings. To reduce latency in large
        rings(16+), the defaults are a safe compromise. If 1 or more slow
        processor(s) are present among fast processors, window_size should be no
        larger than 256000 / netmtu to avoid overflow of the kernel receive
        buffers. The user is notified of this by the display of a retransmit
        list in the notification logs. There is no loss of data, but performance
        is reduced when these errors occur.
      </p>
    ),
    defaultValue: "50 messages",
  },
};
