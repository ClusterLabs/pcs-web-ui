import {PageSection} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {
  ClusterToolbar,
  LauncherDropdown,
  useLauncherDisableClusterNotRunning,
} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";
import {useOpenTask} from "app/view/cluster/task";

import {ConstraintFilteredList} from "./ConstraintFilteredList";

const {constraintsToolbar} = testMarks.cluster;
const {dropdown} = constraintsToolbar;

export const ConstraintsPage = () => {
  const launchDisable = useLauncherDisableClusterNotRunning();
  const {clusterName} = useLoadedCluster();
  const openTask = useOpenTask(clusterName);
  return (
    <>
      <ClusterToolbar
        buttonsItems={[
          {
            name: "create-location",
            run: () =>
              openTask("constraintLocationCreate", {
                type: "CONSTRAINT.LOCATION.CREATE.INIT",
                key: {clusterName},
                payload: {clusterName},
              }),
            launchDisable: launchDisable(
              "Cannot create location constraint on stopped cluster",
            ),
            ...constraintsToolbar.createLocation.mark,
          },
          {
            name: "create-order",
            run: () =>
              openTask("constraintOrderCreate", {
                type: "CONSTRAINT.ORDER.CREATE.INIT",
                key: {clusterName},
                payload: {clusterName},
              }),
            launchDisable: launchDisable(
              "Cannot create order constraint on stopped cluster",
            ),
            ...constraintsToolbar.createOrder.mark,
          },
          {
            name: "create-colocation",
            run: () =>
              openTask("constraintColocationCreate", {
                type: "CONSTRAINT.COLOCATION.CREATE.INIT",
                key: {clusterName},
                payload: {clusterName},
              }),
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
                run: () =>
                  openTask("constraintTicketCreate", {
                    type: "CONSTRAINT.TICKET.CREATE.INIT",
                    key: {clusterName},
                    payload: {clusterName},
                  }),
                launchDisable: launchDisable(
                  "Cannot create ticket constraint on stopped cluster",
                ),
                ...dropdown.createTicket.mark,
              },
              {
                name: "create-order-set",

                run: () =>
                  openTask("constraintOrderSetCreate", {
                    type: "CONSTRAINT.ORDER.SET.CREATE.INIT",
                    key: {clusterName},
                    payload: {clusterName},
                  }),
                launchDisable: launchDisable(
                  "Cannot create order set constraint on stopped cluster",
                ),
                ...dropdown.createOrderSet.mark,
              },
              {
                name: "create-colocation-set",
                run: () =>
                  openTask("constraintColocationSetCreate", {
                    type: "CONSTRAINT.COLOCATION.SET.CREATE.INIT",
                    key: {clusterName},
                    payload: {clusterName},
                  }),
                launchDisable: launchDisable(
                  "Cannot create colocation set constraint on stopped cluster",
                ),
                ...dropdown.createColocationSet.mark,
              },
              {
                name: "create-ticket-set",
                run: () =>
                  openTask("constraintTicketSetCreate", {
                    type: "CONSTRAINT.TICKET.SET.CREATE.INIT",
                    key: {clusterName},
                    payload: {clusterName},
                  }),
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
      <PageSection {...testMarks.cluster.mark}>
        <ConstraintFilteredList clusterName={clusterName} />
      </PageSection>
    </>
  );
};
