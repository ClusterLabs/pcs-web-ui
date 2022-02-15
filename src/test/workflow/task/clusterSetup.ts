import { dt } from "test/tools/selectors";
import { mkXPath } from "test/tools/selectors";

import { clickBackFrom, clickNextFrom } from "./utils";

const view = "task-cluster-setup";

const inView = (...keys: string[]) => mkXPath(view, ...keys);

type Steps =
  | "Cluster name and nodes"
  | "Check cluster name and nodes"
  | "Transport links"
  | "Transport Options"
  | "Quorum"
  | "Totem"
  | "Review";

export const selectors = {
  task: view,
  clusterName: inView("cluster-name"),
  nodeNameAt: (i: number) => inView(`node-name-${i}`),
  authPasswordAt: (nodeName: string) =>
    inView(`auth-node-${nodeName}-password`),
  lastNode: `(${mkXPath(view)}//*[contains(@data-test, "node-name-")])[last()]`,
  knetTransport: {
    addLink: inView("knet-link-add"),
    advancedOptions: `${inView("link-advanced-options")}//button`,
    nodeAddr: (i: number) => inView(`knet-link-node-${i}`),
    link_priority: inView("link_priority"),
    mcastport: inView("mcastport"),
    ping_interval: inView("ping_interval"),
    ping_precision: inView("ping_precision"),
    ping_timeout: inView("ping_timeout"),
    pong_count: inView("pong_count"),
    transport: inView("transport"),
  },
  transportOptions: {
    ip_version: inView("ip_version"),
    knet_pmtud_interval: inView("knet_pmtud_interval"),
    link_mode: inView("link_mode"),
  },
  compression: {
    model: inView("model"),
    threshold: inView("threshold"),
    level: inView("level"),
  },
  crypto: {
    model: inView("crypto.model"),
    hash: inView("crypto.hash"),
    cipher: inView("crypto.cipher"),
  },
  quorum: {
    autoTieBreaker: inView("quorum.auto_tie_breaker"),
    lastManStanding: inView("quorum.last_man_standing"),
    lastManStandingWindow: inView("quorum.last_man_standing_window"),
    waitForAll: inView("quorum.wait_for_all"),
  },
  totem: {
    block_unlisted_ips: inView("totem.block_unlisted_ips"),
    consensus: inView("totem.consensus"),
    downcheck: inView("totem.downcheck"),
    fail_recv_const: inView("totem.fail_recv_const"),
    heartbeat_failures_allowed: inView("totem.heartbeat_failures_allowed"),
    hold: inView("totem.hold"),
    join: inView("totem.join"),
    max_messages: inView("totem.max_messages"),
    max_network_delay: inView("totem.max_network_delay"),
    merge: inView("totem.merge"),
    miss_count_const: inView("totem.miss_count_const"),
    send_join: inView("totem.send_join"),
    seqno_unchanged_const: inView("totem.seqno_unchanged_const"),
    token: inView("totem.token"),
    token_coefficient: inView("totem.token_coefficient"),
    token_retransmit: inView("totem.token_retransmit"),
    token_retransmits_before_loss_const: inView(
      "totem.token_retransmits_before_loss_const",
    ),
    window_size: inView("totem.window_size"),
  },
  reviewAndFinish: inView("review-and-finish"),
  sucess: inView("task-success"),
};

export const nextFrom = clickNextFrom<Steps>(view);
export const backFrom = clickBackFrom<Steps>(view);

export const open = async () => {
  await page.click(dt("setup-cluster"));
};

export const close = async () => {
  await page.click(dt("task-close"));
};

export const fillClusterNameAndNodes = async ({
  clusterName,
  nodeNameList,
}: {
  clusterName: string;
  nodeNameList: string[];
}) => {
  await page.type(selectors.clusterName, clusterName);
  for (let i = 0; i < nodeNameList.length; i++) {
    // WARNING: only up to 3 nodes
    // TODO: add more nodes if required
    await page.type(selectors.nodeNameAt(i), nodeNameList[i]);
  }
};

export const reviewAndFinish = async () => {
  await page.click(selectors.reviewAndFinish);
};

export const waitForSuccess = async () => {
  await page.waitForSelector(selectors.sucess);
};
