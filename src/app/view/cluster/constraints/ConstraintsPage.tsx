import {
  ActionList,
  Card,
  CardBody,
  PageSection,
} from "@patternfly/react-core";

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
          />
          <ActionTaskLauncher
            taskComponent={task.createOrder.Task}
            useTask={task.createOrder.useTask}
            label="Create Order"
            variant="secondary"
          />
          <ActionTaskLauncher
            taskComponent={task.createOrderSet.Task}
            useTask={task.createOrderSet.useTask}
            label="Create Order Set"
            variant="secondary"
          />
          <ActionTaskLauncher
            taskComponent={task.createColocation.Task}
            useTask={task.createColocation.useTask}
            label="Create Colocation"
            variant="secondary"
          />
          <ActionTaskLauncher
            taskComponent={task.createColocationSet.Task}
            useTask={task.createColocationSet.useTask}
            label="Create Colocation Set"
            variant="secondary"
          />
          <ActionTaskLauncher
            taskComponent={task.createTicket.Task}
            useTask={task.createTicket.useTask}
            label="Create Ticket"
            variant="secondary"
          />
          <ActionTaskLauncher
            taskComponent={task.createTicketSet.Task}
            useTask={task.createTicketSet.useTask}
            label="Create Ticket Set"
            variant="secondary"
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
