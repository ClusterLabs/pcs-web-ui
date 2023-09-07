import {assert, mock} from "test/tools";

import {clusterStatus, goToSbd, sbdOptions} from "./common";

const {sbdConfigure: task} = marks.task;

const newWatchdogName = "/dev/watchdog-test";

describe("Sbd", () => {
  afterEach(mock.stop);

  it("should be configured", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [
        mock.route.sbdConfigure({
          clusterName: clusterStatus.cluster_name,
          sbd_options: sbdOptions,
          watchdog_dict: {"node-1": newWatchdogName},
        }),
      ],
    });

    await goToSbd();
    await click(marks.cluster.sbdToolbar.configureSbd);

    await fill(
      item.byKey(
        task.watchdogs.perNode,
        w => w.node,
        "node-1",
        w => w.value,
      ),
      newWatchdogName,
    );

    await click(task.watchdogsFooter.next);

    await radioGroup(task.options.delayStart, sbdOptions.SBD_DELAY_START);
    await fill(task.options.watchdogTimeout, sbdOptions.SBD_WATCHDOG_TIMEOUT);
    await radioGroup(task.options.startmode, sbdOptions.SBD_STARTMODE);
    await radioGroup(task.options.timeoutActionFlush, "flush");
    await radioGroup(task.options.timeoutActionDo, "reboot");

    await click(task.optionsFooter.next);

    await assert.textIs([
      [task.review.delayStart, sbdOptions.SBD_DELAY_START],
      [task.review.watchdogTimeout, sbdOptions.SBD_WATCHDOG_TIMEOUT],
      [task.review.startmode, sbdOptions.SBD_STARTMODE],
      [
        item.byKey(
          task.review.watchdog,
          w => w.node,
          "node-1",
          w => w.value,
        ),
        newWatchdogName,
      ],
    ]);

    await click(task.reviewFooter.next);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });
});
