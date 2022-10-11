import { Card, CardBody, PageSection } from "@patternfly/react-core";

import { ClusterToolbar } from "app/view/share";

import { ConstraintFilteredList } from "./ConstraintFilteredList";
import * as task from "./task";

export const ConstraintsPage = ({ clusterName }: { clusterName: string }) => {
  return (
    <>
      <ClusterToolbar
        toolbarName="resources"
        buttonsItems={[
          {
            name: "create-location",
            task: {
              component: task.createLocation.Task,
              useTask: task.createLocation.useTask,
            },
          },
          {
            name: "create-order",
            task: {
              component: task.createOrder.Task,
              useTask: task.createOrder.useTask,
            },
          },
          {
            name: "create-colocation",
            task: {
              component: task.createColocation.Task,
              useTask: task.createColocation.useTask,
            },
          },
        ]}
        dropdownItems={[
          {
            name: "create-ticket",
            task: {
              component: task.createTicket.Task,
              useTask: task.createTicket.useTask,
            },
          },
          {
            name: "create-order-set",
            task: {
              component: task.createOrderSet.Task,
              useTask: task.createOrderSet.useTask,
            },
          },
          {
            name: "create-colocation-set",
            task: {
              component: task.createColocationSet.Task,
              useTask: task.createColocationSet.useTask,
            },
          },
          {
            name: "create-ticket-set",
            task: {
              component: task.createTicketSet.Task,
              useTask: task.createTicketSet.useTask,
            },
          },
        ]}
      />
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
