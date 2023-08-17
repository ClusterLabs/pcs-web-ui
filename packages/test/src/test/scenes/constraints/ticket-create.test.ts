import {mock} from "test/tools";

import {clusterStatus, goToConstraints, toolbar} from "./common";

const ticketKey = "testTicket";
const lossPolicy = "fence";
const resourceId = clusterStatus.resource_list[1].id;
const rscRole = "Promoted";

const {constraintTicketCreate: task} = marks.task;

describe("Create ticket counstraint", () => {
  afterEach(mock.stop);
  it("should be done sucessfully", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [
        mock.route.constraintTicketCreate({
          clusterName: clusterStatus.cluster_name,
          ticketKey,
          resourceId: resourceId,
          lossPolicy,
          rscRole: rscRole,
        }),
      ],
    });
    await goToConstraints();
    await toolbar.launch(toolbar => [
      toolbar.dropdown,
      toolbar.dropdown.createTicket,
    ]);
    await fill(task.ticket, ticketKey);
    await radioGroup(task.lossPolicy, lossPolicy);
    await select(task.resource, resourceId);
    await radioGroup(task.role, rscRole);

    await click(task.run);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });
});
