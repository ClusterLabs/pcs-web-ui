import React from "react";

import { tools } from "app/store";
import {
  DataListWithMenu,
  DetailViewSection,
  Link,
  location,
  useSelectedClusterName,
} from "app/view/share";

export const RoleViewSubjects = ({
  roleId,
  assignedSubjectIds,
  subjectType,
}: {
  roleId: string;
  assignedSubjectIds: string[];
  subjectType: "user" | "group";
}) => {
  const clusterName = useSelectedClusterName();
  const subjectLocation = React.useCallback(
    (subjectId: string) =>
      subjectType === "user"
        ? location.aclUser({ clusterName, userId: subjectId })
        : location.aclGroup({ clusterName, groupId: subjectId }),
    [clusterName, subjectType],
  );
  return (
    <DetailViewSection caption={`${tools.labelize(subjectType)}s assigned`}>
      <DataListWithMenu
        name={subjectType}
        emptyTitle={`No ${subjectType} assigned to role "${roleId}".`}
        itemList={assignedSubjectIds}
        formatItem={subjectId => (
          <Link to={subjectLocation(subjectId)}>{subjectId}</Link>
        )}
        menuItems={[
          subjectId => ({
            name: "unassign",
            confirm: {
              title: `Unassign ${subjectType}?`,
              description: `This unassigns the ${subjectType} ${subjectId}`,
              action: {
                type: "LIB.CALL.CLUSTER",
                key: { clusterName },
                payload: {
                  taskLabel: `unassign ${subjectType} "${subjectId}"`,
                  call:
                    subjectType === "user"
                      ? {
                          name: "acl-unassign-role-from-target",
                          payload: { role_id: roleId, target_id: subjectId },
                        }
                      : {
                          name: "acl-unassign-role-from-group",
                          payload: { role_id: roleId, group_id: subjectId },
                        },
                },
              },
            },
          }),
        ]}
      />
    </DetailViewSection>
  );
};
