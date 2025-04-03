import * as responses from "dev/responses";

import {mock} from "test/tools";

import {clusterStatus, goToSbd} from "./common";

const {sbdDisable: task} = marks.task;

describe("Sbd disable", () => {
  afterEach(mock.stop);
  it("should sucessfully disable sbd", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [mock.route.sbdDisable(clusterStatus.cluster_name)],
    });
    await goToSbd();
    await click(marks.cluster.sbdToolbar.disableSbd);
    await click(task.run);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });

  it("should offer proceed anyway on forceable error", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [
        mock.route.sbdDisable(clusterStatus.cluster_name, {
          json: responses.lib.error([
            {
              severity: {level: "ERROR", force_code: "FORCE"},
              message: {
                code: "NO_STONITH_MEANS_WOULD_BE_LEFT",
                message:
                  "Requested action lefts the cluster with no enabled means" +
                  " to fence nodes, resulting in the cluster not being able" +
                  " to recover from certain failure conditions",
                payload: {},
              },
              context: null,
            },
          ]),
        }),
      ],
    });
    await goToSbd();
    await click(marks.cluster.sbdToolbar.disableSbd);
    await click(task.run);
    await isVisible(task.unsuccess);
    await isVisible(task.unsuccess.proceedAnyway);
  });
});
