import {assert, mock} from "test/tools";

import {clusterStatus, goToSbd, sbdOptions} from "./common";

const {service, perNode, config} = marks.cluster.sbd;

describe("Sbd", () => {
  afterEach(mock.stop);

  it("service status should be displayed", async () => {
    mock.shortcuts.withCluster({clusterStatus});
    await goToSbd();

    const service_1 = item.byKey(service, service.node, "node-1");
    await assert.textIs([
      [service_1(s => s.installed), "Installed"],
      [service_1(s => s.enabled), "Enabled"],
      [service_1(s => s.running), "Running"],
    ]);
  });

  it("watchdogs should be displayed", async () => {
    mock.shortcuts.withCluster({clusterStatus});
    await goToSbd();

    const perNode_1 = item.byKey(perNode, perNode.node, "node-1");

    await assert.countIs(
      perNode_1(pn => pn.device),
      2,
    );
    await assert.textIs([
      [perNode_1(pn => pn.device.locator.nth(0)), "/dev/sdb@node1"],
      [perNode_1(pn => pn.device.locator.nth(1)), "/dev/sda"],
      [perNode_1(pn => pn.watchdog), "/dev/watchdog"],
    ]);

    const perNode_2 = item.byKey(perNode, perNode.node, "node-2");
    await isVisible(perNode_2(pn => pn.watchdogNotConfigured));
    await isVisible(perNode_2(pn => pn.deviceNotConfigured));
  });

  it("configuration should be displayed", async () => {
    mock.shortcuts.withCluster({clusterStatus});
    await goToSbd();
    await Promise.all(
      Object.entries(sbdOptions).map(async ([name, value]) => {
        await assert.nvPairIs(config, name, value);
      }),
    );
  });
});
