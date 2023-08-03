import {Locator} from "playwright";

import {intercept, route} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {
  clusterName,
  expectReports,
  interceptForClusterSetup,
  nodeNameList,
  toolbar,
} from "./common";

const {select, radioGroup} = shortcuts.patternfly;

const {
  nameAndNodesFooter,
  prepareNodesFooter,
  advancedOptionsFooter,
  review,
  reviewFooter,
  success,
} = marks.task.clusterSetup;

const {knetLink} = review;
const {
  options: reviewTransport,
  compression: reviewCompression,
  crypto: reviewCrypto,
} = review.transport;

const {transportKnet, transport, quorum, totem} =
  marks.task.clusterSetup.advancedOptions;

const {fillClusterNameAndNodes} = shortcuts.setupCluster;

const addrs = [
  ["192.168.0.1", "192.168.0.2"],
  ["192.168.1.1", "192.168.1.2"],
];

type SetupData = Extract<
  Parameters<typeof route.clusterSetup>[0]["payload"]["setupData"],
  {transport_type: "knet"}
>;

// type to make non nullable attributes
// so we don't have to always write defaulting to string, e.g.:
// await
// page.type(selectors.knetTransport.link_priority, link.link_priority || "");
type StrictProps<T> = {[K in keyof T]-?: NonNullable<T[K]>};

// CAREFULLY: order of route.clusterSetup unfortunately matters!
const link: Omit<StrictProps<SetupData["link_list"][number]>, "linknumber"> = {
  link_priority: "1",
  mcastport: "2",
  ping_interval: "3",
  ping_precision: "4",
  ping_timeout: "5",
  pong_count: "6",
  transport: "udp",
};
const transportOpts: StrictProps<SetupData["transport_options"]> = {
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

const onOff = (value: string) => (value === "1" ? "on" : "off");
const quorumOpts: StrictProps<SetupData["quorum_options"]> = {
  auto_tie_breaker: "1",
  last_man_standing: "1",
  last_man_standing_window: "300",
  wait_for_all: "1",
};

const totemOpts: StrictProps<SetupData["totem_options"]> = {
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

const fillLinkAddresses = async (
  link: {locator: Locator},
  addresses: string[],
) => {
  for (let i = 0; i < addresses.length; i++) {
    await link.locator
      .locator(transportKnet.knetLink.address.locator.nth(i))
      .fill(addresses[i]);
  }
};

const fillKnetAdvancedOptions = async () => {
  const {
    link_priority,
    transport,
    pong_count,
    ping_timeout,
    ping_precision,
    ping_interval,
    mcastport,
  } = transportKnet.knetLink;

  await fill(link_priority, link.link_priority);
  await fill(mcastport, link.mcastport);
  await fill(ping_interval, link.ping_interval);
  await fill(ping_timeout, link.ping_timeout);
  await fill(ping_precision, link.ping_precision);
  await fill(pong_count, link.pong_count);
  await select(transport, link.transport);
};

const reviewLink = (nth: number) => (mark: Mark) =>
  knetLink.locator.nth(nth).locator(isLocator(mark) ? mark : mark.locator);

describe("Cluster setup", () => {
  afterEach(intercept.stop);
  it("should create full filled cluster", async () => {
    interceptForClusterSetup([
      route.checkAuthAgainstNodes({nodeNameList}),
      route.clusterSetup({
        payload: {
          targetNode: nodeNameList[0],
          setupData: {
            cluster_name: clusterName,
            nodes: [
              {name: nodeNameList[0], addrs: [addrs[0][0], addrs[1][0]]},
              {name: nodeNameList[1], addrs: [addrs[0][1], addrs[1][1]]},
            ],
            transport_type: "knet",
            link_list: [{linknumber: 0, ...link}, {linknumber: 1}],
            quorum_options: quorumOpts,
            totem_options: totemOpts,
            transport_options: transportOpts,
            compression_options: compression,
            crypto_options: crypto,
          },
        },
      }),
    ]);

    await page.goto(backend.rootUrl);
    await toolbar.launch(toolbar => toolbar.setupCluster);
    await fillClusterNameAndNodes({clusterName, nodeNameList});
    await click(nameAndNodesFooter.next);
    await click(prepareNodesFooter.next);
    await isVisible(transportKnet);

    // STEP: Transport links
    // ---------------------
    // First link is fully filled
    await click(transportKnet.addKnetLink);
    await fillLinkAddresses(transportKnet.knetLink, addrs[0]);
    await click(transportKnet.knetLink.toggleAdvancedOptions);
    await fillKnetAdvancedOptions();

    await click(transportKnet.addKnetLink);
    await fillLinkAddresses(transportKnet.knetLink, addrs[1]);
    await click(advancedOptionsFooter.next);

    // STEP: Transport options
    // -----------------------
    await select(transport.options.ip_version, transportOpts.ip_version);
    await select(transport.options.link_mode, transportOpts.link_mode);
    await fill(
      transport.options.knet_pmtud_interval,
      transportOpts.knet_pmtud_interval,
    );
    await fill(transport.compression.model, compression.model);
    await fill(transport.compression.threshold, compression.threshold);
    await fill(transport.compression.level, compression.level);
    await select(transport.crypto.cipher, crypto.cipher);
    await select(transport.crypto.hash, crypto.hash);
    await radioGroup(transport.crypto.model, crypto.model);

    await click(advancedOptionsFooter.next);

    // STEP: Quorum options
    // -----------------------
    await radioGroup(
      quorum.auto_tie_breaker,
      onOff(quorumOpts.auto_tie_breaker),
    );
    await radioGroup(
      quorum.last_man_standing,
      onOff(quorumOpts.last_man_standing),
    );
    await fill(
      quorum.last_man_standing_window,
      quorumOpts.last_man_standing_window,
    );
    await radioGroup(quorum.wait_for_all, onOff(quorumOpts.wait_for_all));

    await click(advancedOptionsFooter.next);

    // STEP: Totem options
    // -------------------

    await radioGroup(totem.block_unlisted_ips, totemOpts.block_unlisted_ips);
    await fill(totem.consensus, totemOpts.consensus);
    await fill(totem.downcheck, totemOpts.downcheck);
    await fill(totem.fail_recv_const, totemOpts.fail_recv_const);
    await fill(
      totem.heartbeat_failures_allowed,
      totemOpts.heartbeat_failures_allowed,
    );
    await fill(totem.hold, totemOpts.hold);
    await fill(totem.join, totemOpts.join);
    await fill(totem.max_messages, totemOpts.max_messages);
    await fill(totem.max_network_delay, totemOpts.max_network_delay);
    await fill(totem.merge, totemOpts.merge);
    await fill(totem.miss_count_const, totemOpts.miss_count_const);
    await fill(totem.send_join, totemOpts.send_join);
    await fill(totem.seqno_unchanged_const, totemOpts.seqno_unchanged_const);
    await fill(totem.token, totemOpts.token);
    await fill(totem.token_coefficient, totemOpts.token_coefficient);
    await fill(totem.token_retransmit, totemOpts.token_retransmit);
    await fill(
      totem.token_retransmits_before_loss_const,
      totemOpts.token_retransmits_before_loss_const,
    );
    await fill(totem.window_size, totemOpts.window_size);

    await click(advancedOptionsFooter.next);

    const link1 = reviewLink(0);
    const link2 = reviewLink(1);
    await shortcuts.task.expectReview([
      [review.clusterName, clusterName],
      [review.nodeNames, nodeNameList.join("\n")],
      [link1(knetLink.address).nth(0), addrs[0][0]],
      [link1(knetLink.address).nth(1), addrs[0][1]],
      [link2(knetLink.address).nth(0), addrs[1][0]],
      [link2(knetLink.address).nth(1), addrs[1][1]],
      [link1(knetLink.mcastport.locator), link.mcastport],
      [link1(knetLink.link_priority.locator), link.link_priority],
      [link1(knetLink.ping_interval.locator), link.ping_interval],
      [link1(knetLink.ping_precision.locator), link.ping_precision],
      [link1(knetLink.ping_timeout.locator), link.ping_timeout],
      [link1(knetLink.pong_count.locator), link.pong_count],
      [link1(knetLink.transport.locator), link.transport],
      [reviewTransport.ip_version, transportOpts.ip_version],
      [reviewTransport.knet_pmtud_interval, transportOpts.knet_pmtud_interval],
      [reviewTransport.link_mode, transportOpts.link_mode],
      [reviewCompression.model, compression.model],
      [reviewCompression.threshold, compression.threshold],
      [reviewCompression.level, compression.level],
      [reviewCrypto.model, crypto.model],
      [reviewCrypto.hash, crypto.hash],
      [reviewCrypto.cipher, crypto.cipher],
      [review.quorum.auto_tie_breaker, onOff(quorumOpts.auto_tie_breaker)],
      [review.quorum.last_man_standing, onOff(quorumOpts.last_man_standing)],
      [
        review.quorum.last_man_standing_window,
        quorumOpts.last_man_standing_window,
      ],
      [review.quorum.wait_for_all, onOff(quorumOpts.wait_for_all)],
      [review.totem.block_unlisted_ips, totemOpts.block_unlisted_ips],
      [review.totem.consensus, totemOpts.consensus],
      [review.totem.downcheck, totemOpts.downcheck],
      [review.totem.fail_recv_const, totemOpts.fail_recv_const],
      [
        review.totem.heartbeat_failures_allowed,
        totemOpts.heartbeat_failures_allowed,
      ],
      [review.totem.hold, totemOpts.hold],
      [review.totem.join, totemOpts.join],
      [review.totem.max_messages, totemOpts.max_messages],
      [review.totem.max_network_delay, totemOpts.max_network_delay],
      [review.totem.merge, totemOpts.merge],
      [review.totem.miss_count_const, totemOpts.miss_count_const],
      [review.totem.send_join, totemOpts.send_join],
      [review.totem.seqno_unchanged_const, totemOpts.seqno_unchanged_const],
      [review.totem.token, totemOpts.token],
      [review.totem.token_coefficient, totemOpts.token_coefficient],
      [review.totem.token_retransmit, totemOpts.token_retransmit],
      [
        review.totem.token_retransmits_before_loss_const,
        totemOpts.token_retransmits_before_loss_const,
      ],
      [review.totem.window_size, totemOpts.window_size],
    ]);
    await click(reviewFooter.next);
    await isVisible(success);
    await expectReports(0);
    await click(success.close);
  }, 30_000);
});
