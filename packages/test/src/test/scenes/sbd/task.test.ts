import {mock} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {clusterStatus, goToSbd, sbdOptions, toolbar} from "./common";

const {sbdConfigure: task} = marks.task;
const {options, review} = task;

const {item} = shortcuts.common;
const {radioGroup} = shortcuts.patternfly;

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
    await toolbar.launch(toolbar => toolbar.configureSbd);

    await fill(
      item(task.watchdogs.perNode)
        .byKey(perNode => perNode.node, "node-1")
        .locator(perNode => perNode.value),
      newWatchdogName,
    );

    await click(task.watchdogsFooter.next);

    await radioGroup(options.delayStart, sbdOptions.SBD_DELAY_START);
    await fill(options.watchdogTimeout, sbdOptions.SBD_WATCHDOG_TIMEOUT);
    await radioGroup(options.startmode, sbdOptions.SBD_STARTMODE);
    await radioGroup(options.timeoutActionFlush, "flush");
    await radioGroup(options.timeoutActionDo, "reboot");

    await click(task.optionsFooter.next);

    await shortcuts.task.expectReview([
      [review.delayStart, sbdOptions.SBD_DELAY_START],
      [review.watchdogTimeout, sbdOptions.SBD_WATCHDOG_TIMEOUT],
      [review.startmode, sbdOptions.SBD_STARTMODE],
      [
        item(review.watchdog)
          .byKey(w => w.node, "node-1")
          .locator(w => w.value),
        newWatchdogName,
      ],
    ]);

    await click(task.reviewFooter.next);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });
});
