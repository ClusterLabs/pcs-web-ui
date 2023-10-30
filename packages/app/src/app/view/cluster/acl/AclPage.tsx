import {Label, ToolbarItem} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {tools} from "app/store";
import {
  ClusterToolbar,
  LauncherDropdown,
  useLauncherDisableClusterNotRunning,
} from "app/view/share";
import {
  GroupDetailSection,
  GroupDetailView,
  useLoadedCluster,
} from "app/view/cluster/share";
import {useOpenTask} from "app/view/cluster/task";

import {AclDetailPage} from "./detail";
import {AclLists} from "./lists";

const {acl, aclToolbar} = testMarks.cluster;
const {dropdown} = aclToolbar;
export const AclPage = () => {
  const {clusterProperties, hasCibInfo, clusterName} = useLoadedCluster();
  const openTask = useOpenTask(clusterName);
  const launchDisable = useLauncherDisableClusterNotRunning();

  const aclEnabled = tools.isCibTrue(clusterProperties["enable-acl"] || "");

  const detailTypeList = [
    "role",
    "user",
    "group",
  ] satisfies React.ComponentProps<typeof GroupDetailView>["detailTypeList"];
  return (
    <>
      <ClusterToolbar
        buttonsItems={[
          {
            name: "create-role",
            run: () =>
              openTask("aclRoleCreate", {
                type: "CLUSTER.ACL.ROLE.CREATE",
                key: {clusterName},
                payload: {clusterName},
              }),
            launchDisable: launchDisable(
              "Cannot create role on stopped cluster",
            ),
            ...aclToolbar.createRole.mark,
          },
          {
            name: "create-user",
            run: () =>
              openTask("aclSubjectCreate", {
                type: "CLUSTER.ACL.SUBJECT.CREATE",
                key: {clusterName},
                payload: {clusterName, subjectType: "user"},
              }),
            launchDisable: launchDisable(
              "Cannot create user on stopped cluster",
            ),
            ...aclToolbar.createUser.mark,
          },
        ]}
        dropdown={
          <LauncherDropdown
            items={[
              {
                name: "create-group",
                run: () =>
                  openTask("aclSubjectCreate", {
                    type: "CLUSTER.ACL.SUBJECT.CREATE",
                    key: {clusterName},
                    payload: {clusterName, subjectType: "group"},
                  }),
                launchDisable: launchDisable(
                  "Cannot create group on stopped cluster",
                ),
                ...dropdown.createGroup.mark,
              },
              {
                name: aclEnabled ? "disable-acl" : "enable-acl",
                label: `${aclEnabled ? "Disable" : "Enable"} ACL`,
                confirm: {
                  title: aclEnabled ? "Disable ACL" : "Enable ACL",
                  description: `${
                    aclEnabled ? "Disable" : "Enable"
                  } access control lists.`,
                  action: {
                    type: "CLUSTER.PROPERTIES.UPDATE",
                    key: {clusterName},
                    payload: {
                      propertyMap: {
                        "enable-acl": aclEnabled ? "false" : "true",
                      },
                    },
                  },
                },
                launchDisable: launchDisable(
                  "Cannot enable/disable acl on stopped cluster",
                ),
                ...dropdown.switchEnablement.mark,
              },
            ]}
            {...dropdown.mark}
          />
        }
        after={
          hasCibInfo ? (
            <>
              <ToolbarItem variant="separator" />
              <ToolbarItem>
                <Label variant="outline" color={aclEnabled ? "green" : "grey"}>
                  ACL {aclEnabled ? "enabled" : "disabled"}
                </Label>
              </ToolbarItem>
            </>
          ) : null
        }
        {...aclToolbar.mark}
      />

      <GroupDetailSection
        detailTypeList={detailTypeList}
        {...testMarks.cluster.mark}
      >
        <GroupDetailView
          groupCard={<AclLists />}
          detailCard={<AclDetailPage />}
          detailTypeList={detailTypeList}
          {...acl.mark}
        />
      </GroupDetailSection>
    </>
  );
};
