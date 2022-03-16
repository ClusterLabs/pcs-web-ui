import { ActionList, Card, CardBody, PageSection } from "@patternfly/react-core";

import { ActionTaskLauncher, ClusterSectionToolbar } from "app/view/share";

import { ConstraintFilteredList } from "./ConstraintFilteredList";
import * as task from "./task";

export const ConstraintsPage = ({ clusterName }: { clusterName: string }) => {
  return (
    <>
      <ClusterSectionToolbar>
        <ActionList>
          <ActionTaskLauncher
            taskComponent={task.createLocation.Task}
            useTask={task.createLocation.useTask}
            label="Create Location"
            data-test="constraint-location-create"
          />
          <ActionTaskLauncher
            taskComponent={task.createOrder.Task}
            useTask={task.createOrder.useTask}
            label="Create Order"
            variant="secondary"
            data-test="constraint-order-create"
          />
          <ActionTaskLauncher
            taskComponent={task.createOrderSet.Task}
            useTask={task.createOrderSet.useTask}
            label="Create Order Set"
            variant="secondary"
            data-test="constraint-order-set-create"
          />
          <ActionTaskLauncher
            taskComponent={task.createColocation.Task}
            useTask={task.createColocation.useTask}
            label="Create Colocation"
            variant="secondary"
            data-test="constraint-colocation-create"
          />
          <ActionTaskLauncher
            taskComponent={task.createColocationSet.Task}
            useTask={task.createColocationSet.useTask}
            label="Create Colocation Set"
            variant="secondary"
            data-test="constraint-colocation-set-create"
          />
          <ActionTaskLauncher
            taskComponent={task.createTicket.Task}
            useTask={task.createTicket.useTask}
            label="Create Ticket"
            variant="secondary"
            data-test="constraint-ticket-create"
          />
          <ActionTaskLauncher
            taskComponent={task.createTicketSet.Task}
            useTask={task.createTicketSet.useTask}
            label="Create Ticket Set"
            variant="secondary"
            data-test="constraint-ticket-set-create"
          />
        </ActionList>
      </ClusterSectionToolbar>
      <PageSection>
        <Card>
          <CardBody>
            <ConstraintFilteredList clusterName={clusterName} />
          </CardBody>
        </Card>
      </PageSection>
    </>
  );
};
