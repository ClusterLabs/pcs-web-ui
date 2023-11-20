import {PageSection} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {
  ClusterToolbar,
  LauncherDropdown,
  useLauncherDisableClusterNotRunning,
} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";
import {useOpenTask} from "app/view/task";

import {ConstraintFilteredList} from "./ConstraintFilteredList";
import {getResourcesForSet} from "./select";

const {constraintsToolbar} = testMarks.cluster;
const {dropdown} = constraintsToolbar;

export const ConstraintsPage = () => {
  const launchDisable = useLauncherDisableClusterNotRunning();
  const {clusterName, resourceTree, nodeList} = useLoadedCluster();
  const openTask = useOpenTask();
  const resourceIdList = resourceTree.reduce<string[]>((idList, resource) => {
    if (resource.itemType === "primitive") {
      return [...idList, resource.id];
    }

    if (resource.itemType === "group") {
      return [...idList, resource.id, ...resource.resources.map(r => r.id)];
    }

    return idList;
  }, []);
  const offeredResourceIdList = getResourcesForSet(resourceTree);
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
                payload: {
                  clusterName,
                  nodeNameList: nodeList.map(n => n.name),
                  resourceIdList,
                },
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
                payload: {clusterName, resourceIdList},
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
                payload: {clusterName, resourceIdList},
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
                    payload: {clusterName, resourceIdList},
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
                    payload: {clusterName, offeredResourceIdList},
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
                    payload: {clusterName, offeredResourceIdList},
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
                    payload: {clusterName, offeredResourceIdList},
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
