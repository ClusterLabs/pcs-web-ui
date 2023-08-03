import {PageSection} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {
  ClusterToolbar,
  LauncherDropdown,
  useLauncherDisableClusterNotRunning,
} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";

import {ConstraintFilteredList} from "./ConstraintFilteredList";
import * as task from "./task";

const {constraints, constraintsToolbar} = testMarks.cluster;
const {dropdown} = constraintsToolbar;

export const ConstraintsPage = () => {
  const launchDisable = useLauncherDisableClusterNotRunning();
  const {clusterName} = useLoadedCluster();
  return (
    <>
      <ClusterToolbar
        toolbarName="constraints"
        buttonsItems={[
          {
            name: "create-location",
            task: {
              component: task.createLocation.Task,
              useTask: task.createLocation.useTask,
            },
            launchDisable: launchDisable(
              "Cannot create location constraint on stopped cluster",
            ),
            ...constraintsToolbar.createLocation.mark,
          },
          {
            name: "create-order",
            task: {
              component: task.createOrder.Task,
              useTask: task.createOrder.useTask,
            },
            launchDisable: launchDisable(
              "Cannot create order constraint on stopped cluster",
            ),
            ...constraintsToolbar.createOrder.mark,
          },
          {
            name: "create-colocation",
            task: {
              component: task.createColocation.Task,
              useTask: task.createColocation.useTask,
            },
            launchDisable: launchDisable(
              "Cannot create colocation constraint on stopped cluster",
            ),
            ...constraintsToolbar.createColocation.mark,
          },
        ]}
        dropdown={
          <LauncherDropdown
            items={[
              {
                name: "create-ticket",
                task: {
                  component: task.createTicket.Task,
                  useTask: task.createTicket.useTask,
                },
                launchDisable: launchDisable(
                  "Cannot create ticket constraint on stopped cluster",
                ),
                ...dropdown.createTicket.mark,
              },
              {
                name: "create-order-set",
                task: {
                  component: task.createOrderSet.Task,
                  useTask: task.createOrderSet.useTask,
                },
                launchDisable: launchDisable(
                  "Cannot create order set constraint on stopped cluster",
                ),
                ...dropdown.createOrderSet.mark,
              },
              {
                name: "create-colocation-set",
                task: {
                  component: task.createColocationSet.Task,
                  useTask: task.createColocationSet.useTask,
                },
                launchDisable: launchDisable(
                  "Cannot create colocation set constraint on stopped cluster",
                ),
                ...dropdown.createColocationSet.mark,
              },
              {
                name: "create-ticket-set",
                task: {
                  component: task.createTicketSet.Task,
                  useTask: task.createTicketSet.useTask,
                },
                launchDisable: launchDisable(
                  "Cannot create ticket set constraint on stopped cluster",
                ),
                ...dropdown.createTicketSet.mark,
              },
            ]}
            {...dropdown.mark}
          />
        }
        {...constraintsToolbar.mark}
      />
      <PageSection {...constraints.mark}>
        <ConstraintFilteredList clusterName={clusterName} />
      </PageSection>
    </>
  );
};
