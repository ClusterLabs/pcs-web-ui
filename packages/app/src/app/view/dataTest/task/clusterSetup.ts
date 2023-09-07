const totem = {
  block_unlisted_ips: {},
  consensus: {},
  downcheck: {},
  fail_recv_const: {},
  heartbeat_failures_allowed: {},
  hold: {},
  join: {},
  max_messages: {},
  max_network_delay: {},
  merge: {},
  miss_count_const: {},
  send_join: {},
  seqno_unchanged_const: {},
  token: {},
  token_coefficient: {},
  token_retransmit: {},
  token_retransmits_before_loss_const: {},
  window_size: {},
};

const knetLink = {
  nodeName: {},
  address: {},
  link_priority: {},
  mcastport: {},
  ping_interval: {},
  ping_precision: {},
  ping_timeout: {},
  pong_count: {},
  transport: {},
};

const quorum = {
  auto_tie_breaker: {},
  last_man_standing: {},
  last_man_standing_window: {},
  wait_for_all: {},
};

const transport = {
  options: {
    ip_version: {},
    knet_pmtud_interval: {},
    link_mode: {},
  },
  compression: {
    level: {},
    model: {},
    threshold: {},
  },

  crypto: {
    model: {},
    hash: {},
    cipher: {},
  },
};

export const clusterSetup = {
  nameAndNodes: {
    clusterName: {},
    node: {
      name: {},
    },
  },
  nameAndNodesFooter: {
    next: {},
    back: {},
    cancel: {},
  },
  prepareNodes: {
    success: {},
    auth: {
      useCustomAddress: {},
      password: {},
      address: {},
      port: {},
    },
  },
  prepareNodesFooter: {
    auth: {},
    next: {},
    back: {},
    cancel: {},
    reviewAndFinish: {},
  },
  advancedOptions: {
    transportKnet: {
      addKnetLink: {},
      knetLink: {
        ...knetLink,
        toggleAdvancedOptions: {},
      },
    },
    transport,
    quorum,
    totem,
  },
  advancedOptionsFooter: {
    next: {},
    back: {},
    cancel: {},
    reviewAndFinish: {},
  },
  review: {
    clusterName: {},
    nodeNames: {},
    knetLink,
    transport,
    quorum,
    totem,
  },
  reviewFooter: {
    next: {},
    back: {},
    cancel: {},
  },
  success: {
    close: {},
    startAndClose: {},
  },
  unsuccess: {
    back: {},
    proceedAnyway: {},
    cancel: {},
  },
  communicationError: {
    tryAgain: {},
    cancel: {},
  },
  report: {},
};
