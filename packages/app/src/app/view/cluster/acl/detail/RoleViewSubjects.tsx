import React from "react";

import {tools} from "app/store";
import {
  DataListWithMenu,
  DataListItemWithMenu,
  LauncherDropdown,
  Link,
  location,
} from "app/view/share";
import {DetailViewSection, useLoadedCluster} from "app/view/cluster/share";

export const RoleViewSubjects = ({
  roleId,
  assignedSubjectIds,
  subjectType,
}: {
  roleId: string;
  assignedSubjectIds: string[];
  subjectType: "user" | "group";
}) => {
  const {clusterName} = useLoadedCluster();
  const subjectLocation = React.useCallback(
    (subjectId: string) =>
      subjectType === "user"
        ? location.aclUser({clusterName, userId: subjectId})
        : location.aclGroup({clusterName, groupId: subjectId}),
    [clusterName, subjectType],
  );
  return (
    <DetailViewSection caption={`${tools.labelize(subjectType)}s assigned`}>
      <DataListWithMenu
        name={subjectType}
        emptyTitle={`No ${subjectType} assigned to role "${roleId}".`}
        itemList={assignedSubjectIds}
      >
        {subjectId => (
          <DataListItemWithMenu
            item={subjectId}
            menu={
              <LauncherDropdown
                items={[
                  {
                    name: "unassign",
                    confirm: {
                      title: `Unassign ${subjectType}?`,
                      description: `This unassigns the ${subjectType} ${subjectId}`,
                      action: {
                        type: "LIB.CALL.CLUSTER",
                        key: {clusterName},
                        payload: {
                          taskLabel: `unassign ${subjectType} "${subjectId}"`,
                          call:
                            subjectType === "user"
                              ? {
                                  name: "acl-unassign-role-from-target",
                                  payload: {
                                    role_id: roleId,
                                    target_id: subjectId,
                                  },
                                }
                              : {
                                  name: "acl-unassign-role-from-group",
                                  payload: {
                                    role_id: roleId,
                                    group_id: subjectId,
                                  },
                                },
                        },
                      },
                    },
                  },
                ]}
              />
            }
          >
            <Link to={subjectLocation(subjectId)}>{subjectId}</Link>
          </DataListItemWithMenu>
        )}
      </DataListWithMenu>
    </DetailViewSection>
  );
};
