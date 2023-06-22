// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SubStructure extends Record<string, SubStructure> {}

// Avoid ambiguous paths. E.g. if there is `dashboard.toolbar.setupCluster` and
// also `setupCluster` then xpath `//*[@data-test="setupCluster"]` selects both.
//
// Tasks (wizards) are separated from "dashboard" or "clusterDetail" because
// theirs modality is done by element outside #root element of application.
//
// Don't use names:
// - mark
// - locator
// The structure is enhanced by this keys
export const structure = {
  clusterDetail: {},
  dashboard: {
    toolbar: {
      setupCluster: {},
      addExistingCluster: {},
    },
    clusterList: {
      cluster: {
        name: {},
        loaded: {
          issues: {},
          nodes: {},
          resources: {},
          fenceDevices: {},
        },
      },
    },
  },
  setupCluster: {
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
    prepareNodesFooter: {
      next: {},
      back: {},
      cancel: {},
      reviewAndFinish: {},
    },
    advancedOptions: {
      transportKnet: {
        addKnetLink: {},
        link: {
          nodeName: {},
          address: {},
          toggleAdvancedOptions: {},
          link_priority: {},
          mcastport: {},
          ping_interval: {},
          ping_precision: {},
          ping_timeout: {},
          pong_count: {},
          transport: {},
        },
      },
      transport: {
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
      },
      quorum: {
        auto_tie_breaker: {},
        last_man_standing: {},
        last_man_standing_window: {},
        wait_for_all: {},
      },
      totem: {
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
      },
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
      knetLink: {
        nodeName: {},
        address: {},
        link_priority: {},
        mcastport: {},
        ping_interval: {},
        ping_precision: {},
        ping_timeout: {},
        pong_count: {},
        transport: {},
      },
      transport: {
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
      },
      quorum: {
        auto_tie_breaker: {},
        last_man_standing: {},
        last_man_standing_window: {},
        wait_for_all: {},
      },
      totem: {
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
      },
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
  },
};

type MarkTools = {
  mark: {"data-test": string};
};

type WithMarkTools<STRUCTURE extends SubStructure> = {
  [KEY in keyof STRUCTURE]: WithMarkTools<STRUCTURE[KEY]> & MarkTools;
};

const createMarkTools = <KEY extends string>(path: KEY[]): MarkTools => ({
  mark: {"data-test": path.join(".")},
});

const addMarkTools = <STRUCTURE extends SubStructure>(
  structure: STRUCTURE,
  path: string[] = [],
): WithMarkTools<STRUCTURE> =>
  Object.entries(structure).reduce<WithMarkTools<STRUCTURE>>(
    (structureWithLocators, [key, subStructure]) => ({
      ...structureWithLocators,
      [key]: addMarkTools(subStructure, [...path, key]),
    }),
    (path.length > 0 ? createMarkTools(path) : {}) as WithMarkTools<STRUCTURE>,
  );

export const testMarks = addMarkTools(structure);
