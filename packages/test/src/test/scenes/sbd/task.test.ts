import {assert, mock} from "test/tools";

import {clusterStatus, goToSbd, sbdOptions} from "./common";

const {sbdConfigure: task} = marks.task;
const {options, review} = task;

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

    await radioGroup(options.delayStart, sbdOptions.SBD_DELAY_START);
    await fill(options.watchdogTimeout, sbdOptions.SBD_WATCHDOG_TIMEOUT);
    await radioGroup(options.startmode, sbdOptions.SBD_STARTMODE);
    await radioGroup(options.timeoutActionFlush, "flush");
    await radioGroup(options.timeoutActionDo, "reboot");

    await click(task.optionsFooter.next);

    await assert.inTaskReview([
      [review.delayStart, sbdOptions.SBD_DELAY_START],
      [review.watchdogTimeout, sbdOptions.SBD_WATCHDOG_TIMEOUT],
      [review.startmode, sbdOptions.SBD_STARTMODE],
      [
        item.byKey(
          review.watchdog,
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
