import {assert, mock} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {clusterStatus, goToSbd, sbdOptions} from "./common";

const {service, perNode, config} = marks.cluster.sbd;

const {item} = shortcuts.common;

const device = (index: number) => item(perNode.device).byIndex(index).locator();

describe("Sbd", () => {
  afterEach(mock.stop);

  it("service status should be displayed", async () => {
    mock.shortcuts.withCluster({clusterStatus});
    await goToSbd();

    const service_1 = item(service).byKey(service.node, "node-1");
    await assert.textIs(
      service_1.locator(service => service.installed),
      "Installed",
    );
    await assert.textIs(
      service_1.locator(service => service.enabled),
      "Enabled",
    );
    await assert.textIs(
      service_1.locator(service => service.running),
      "Running",
    );
  });

  it("watchdogs should be displayed", async () => {
    mock.shortcuts.withCluster({clusterStatus});
    await goToSbd();

    const perNode_1 = item(perNode).byKey(perNode.node, "node-1");
    await assert.textIs(
      perNode_1.locator(perNode => perNode.watchdog),
      "/dev/watchdog",
    );

    await assert.countIs(
      perNode_1.locator(pn => pn.device),
      2,
    );
    await assert.textIs(perNode_1.locator(device(0)), "/dev/sdb@node1");
    await assert.textIs(perNode_1.locator(device(1)), "/dev/sda");

    const perNode_2 = item(perNode).byKey(perNode.node, "node-2");
    await isVisible(perNode_2.locator(pn => pn.watchdogNotConfigured));
    await isVisible(perNode_2.locator(pn => pn.deviceNotConfigured));
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
