import { intercept, location, route } from "test/tools";
import * as workflow from "test/workflow";

import { clusterName, interceptForClusterSetup, nodeNameList } from "./common";

const { select, radioGroup } = workflow.form;
const {
  assertReview,
  fillClusterNameAndNodes,
  nextFrom,
  open,
  waitForSuccess,
  selectors,
} = workflow.task.clusterSetup;

type SetupData = Extract<
  Parameters<typeof route.clusterSetup>[0]["payload"]["setupData"],
  { transport_type: "knet" }
>;

// type to make non nullable attributes
// so we don't have to always write defaulting to string, e.g.:
// await page.type(selectors.knetTransport.link_priority, link.link_priority || "");
type StrictProps<T> = { [K in keyof T]-?: NonNullable<T[K]> };

const addrs = [
  ["192.168.0.1", "192.168.0.2"],
  ["192.168.1.1", "192.168.1.2"],
];
// CAREFULLY: order of route.clusterSetup unfortunatelly matters!
const link: Omit<StrictProps<SetupData["link_list"][number]>, "linknumber"> = {
  link_priority: "1",
  mcastport: "2",
  ping_interval: "3",
  ping_precision: "4",
  ping_timeout: "5",
  pong_count: "6",
  transport: "udp",
};
const transport: StrictProps<SetupData["transport_options"]> = {
  ip_version: "ipv4",
  knet_pmtud_interval: "interval",
  link_mode: "active",
};
const compression: StrictProps<SetupData["compression_options"]> = {
  level: "3",
  model: "bzip2",
  threshold: "200",
};

const crypto: StrictProps<SetupData["crypto_options"]> = {
  model: "openssl",
  hash: "sha256",
  cipher: "aes256",
};

const quorum: StrictProps<SetupData["quorum_options"]> = {
  auto_tie_breaker: "1",
  last_man_standing: "1",
  last_man_standing_window: "300",
  wait_for_all: "1",
};

const totem: StrictProps<SetupData["totem_options"]> = {
  block_unlisted_ips: "yes",
  consensus: "consensus",
  downcheck: "downcheck",
  fail_recv_const: "fail_recv_const",
  heartbeat_failures_allowed: "heartbeat_failures_allowed",
  hold: "hold",
  join: "join",
  max_messages: "max_messages",
  max_network_delay: "max_network_delay",
  merge: "merge",
  miss_count_const: "miss_count_const",
  send_join: "send_join",
  seqno_unchanged_const: "seqno_unchanged_const",
  token: "token",
  token_coefficient: "token_coefficient",
  token_retransmit: "token_retransmit",
  token_retransmits_before_loss_const: "token_retransmits_before_loss_const",
  window_size: "window_size",
};

const onOff = (value: string) => (value === "1" ? "on" : "off");

describe("Cluster setup", () => {
  it("should create full filled cluster", async () => {
    interceptForClusterSetup([
      route.checkAuthAgainstNodes({ nodeNameList }),
      route.clusterSetup({
        payload: {
          targetNode: nodeNameList[0],
          setupData: {
            cluster_name: clusterName,
            nodes: [
              { name: nodeNameList[0], addrs: [addrs[0][0], addrs[1][0]] },
              { name: nodeNameList[1], addrs: [addrs[0][1], addrs[1][1]] },
            ],
            transport_type: "knet",
            link_list: [{ linknumber: 0, ...link }, { linknumber: 1 }],
            quorum_options: quorum,
            totem_options: totem,
            transport_options: transport,
            compression_options: compression,
            crypto_options: crypto,
          },
        },
      }),
    ]);

    await page.goto(location.dashboard);
    await open();

    // STEP: Cluster name and nodes
    // ----------------------------
    await fillClusterNameAndNodes({
      clusterName,
      nodeNameList,
    });
    await nextFrom("Cluster name and nodes");

    // STEP: Check cluster name and nodes
    // ----------------------------------
    await nextFrom("Check cluster name and nodes");

    // STEP: Transport links
    // ---------------------
    // First link is fully filled
    await page.click(selectors.knetTransport.addLink);
    await page.type(selectors.knetTransport.nodeAddr(0), addrs[0][0]);
    await page.type(selectors.knetTransport.nodeAddr(1), addrs[0][1]);

    await page.click(selectors.knetTransport.advancedOptions);
    await page.type(selectors.knetTransport.link_priority, link.link_priority);
    await page.type(selectors.knetTransport.mcastport, link.mcastport);
    await page.type(selectors.knetTransport.ping_interval, link.ping_interval);
    await page.type(
      selectors.knetTransport.ping_precision,
      link.ping_precision,
    );
    await page.type(selectors.knetTransport.ping_timeout, link.ping_timeout);
    await page.type(selectors.knetTransport.pong_count, link.pong_count);
    await select(selectors.knetTransport.transport, link.transport);

    // Second link is minimally filled
    await page.click(selectors.knetTransport.addLink);
    await page.type(selectors.knetTransport.nodeAddr(0), addrs[1][0]);
    await page.type(selectors.knetTransport.nodeAddr(1), addrs[1][1]);

    await nextFrom("Transport links");

    // STEP: Transport options
    // -----------------------
    await select(selectors.transportOptions.ip_version, transport.ip_version);
    await select(selectors.transportOptions.link_mode, transport.link_mode);
    await page.type(
      selectors.transportOptions.knet_pmtud_interval,
      transport.knet_pmtud_interval,
    );

    await page.type(selectors.compression.model, compression.model);
    await page.type(selectors.compression.threshold, compression.threshold);
    await page.type(selectors.compression.level, compression.level);

    await select(selectors.crypto.cipher, crypto.cipher);
    await select(selectors.crypto.hash, crypto.hash);
    await radioGroup(selectors.crypto.model, crypto.model);

    await nextFrom("Transport Options");

    // STEP: Quorum options
    // -----------------------
    await radioGroup(
      selectors.quorum.autoTieBreaker,
      onOff(quorum.auto_tie_breaker),
    );
    await radioGroup(
      selectors.quorum.lastManStanding,
      onOff(quorum.last_man_standing),
    );
    await page.type(
      selectors.quorum.lastManStandingWindow,
      quorum.last_man_standing_window,
    );
    await radioGroup(selectors.quorum.waitForAll, onOff(quorum.wait_for_all));

    await nextFrom("Quorum");

    // STEP: Totem options
    // -------------------

    await radioGroup(
      selectors.totem.block_unlisted_ips,
      totem.block_unlisted_ips,
    );
    await page.type(
      selectors.totem.block_unlisted_ips,
      totem.block_unlisted_ips,
    );
    await page.type(selectors.totem.consensus, totem.consensus);
    await page.type(selectors.totem.downcheck, totem.downcheck);
    await page.type(selectors.totem.fail_recv_const, totem.fail_recv_const);
    await page.type(
      selectors.totem.heartbeat_failures_allowed,
      totem.heartbeat_failures_allowed,
    );
    await page.type(selectors.totem.hold, totem.hold);
    await page.type(selectors.totem.join, totem.join);
    await page.type(selectors.totem.max_messages, totem.max_messages);
    await page.type(selectors.totem.max_network_delay, totem.max_network_delay);
    await page.type(selectors.totem.merge, totem.merge);
    await page.type(selectors.totem.miss_count_const, totem.miss_count_const);
    await page.type(selectors.totem.send_join, totem.send_join);
    await page.type(
      selectors.totem.seqno_unchanged_const,
      totem.seqno_unchanged_const,
    );
    await page.type(selectors.totem.token, totem.token);
    await page.type(selectors.totem.token_coefficient, totem.token_coefficient);
    await page.type(selectors.totem.token_retransmit, totem.token_retransmit);
    await page.type(
      selectors.totem.token_retransmits_before_loss_const,
      totem.token_retransmits_before_loss_const,
    );
    await page.type(selectors.totem.window_size, totem.window_size);

    await nextFrom("Totem");

    // STEP: Review
    //-------------
    await assertReview({
      clusterName,
      nodeNames: nodeNameList.join("\n"),
      [`link.0.${nodeNameList[0]}`]: addrs[0][0],
      [`link.0.${nodeNameList[1]}`]: addrs[0][1],
      [`link.1.${nodeNameList[0]}`]: addrs[1][0],
      [`link.1.${nodeNameList[1]}`]: addrs[1][1],
      "link.0.mcastport": link.mcastport,
      "link.0.link_priority": link.link_priority,
      "link.0.ping_interval": link.ping_interval,
      "link.0.ping_precision": link.ping_precision,
      "link.0.ping_timeout": link.ping_timeout,
      "link.0.pong_count": link.pong_count,
      "link.0.transport": link.transport,
      "transport.ip_version": transport.ip_version,
      "transport.knet_pmtud_interval": transport.knet_pmtud_interval,
      "transport.link_mode": transport.link_mode,
      "compression.model": compression.model,
      "compression.threshold": compression.threshold,
      "compression.level": compression.level,
      "crypto.model": crypto.model,
      "crypto.hash": crypto.hash,
      "crypto.cipher": crypto.cipher,
      "quorum.auto_tie_breaker": onOff(quorum.auto_tie_breaker),
      "quorum.last_man_standing": onOff(quorum.last_man_standing),
      "quorum.last_man_standing_window": quorum.last_man_standing_window,
      "quorum.wait_for_all": onOff(quorum.wait_for_all),
      "totem.block_unlisted_ips": totem.block_unlisted_ips,
      "totem.consensus": totem.consensus,
      "totem.downcheck": totem.downcheck,
      "totem.fail_recv_const": totem.fail_recv_const,
      "totem.heartbeat_failures_allowed": totem.heartbeat_failures_allowed,
      "totem.hold": totem.hold,
      "totem.join": totem.join,
      "totem.max_messages": totem.max_messages,
      "totem.max_network_delay": totem.max_network_delay,
      "totem.merge": totem.merge,
      "totem.miss_count_const": totem.miss_count_const,
      "totem.send_join": totem.send_join,
      "totem.seqno_unchanged_const": totem.seqno_unchanged_const,
      "totem.token": totem.token,
      "totem.token_coefficient": totem.token_coefficient,
      "totem.token_retransmit": totem.token_retransmit,
      "totem.token_retransmits_before_loss_const":
        totem.token_retransmits_before_loss_const,
      "totem.window_size": totem.window_size,
    });
    await nextFrom("Review");

    await waitForSuccess();

    await intercept.stop();
  }, 30000); //timeout
});
