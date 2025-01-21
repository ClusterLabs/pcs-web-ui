import {testMarks} from "app/view/dataTest";
import {
  DetailLayout,
  DetailToolbar,
  useLoadedCluster,
} from "app/view/cluster/share";
import {useOpenTask} from "app/view/task";

import type {AclType} from "../types";

import {RolesAssignedTo} from "./RolesAssignedTo";

const {currentGroup} = testMarks.cluster.acl;

export const GroupView = ({
  groupId,
  roleIdList,
}: {
  groupId: string;
  roleIdList: AclType<"user" | "group">;
}) => {
  const {clusterName, acls} = useLoadedCluster();
  const openTask = useOpenTask();

  return (
    <DetailLayout
      caption={
        <span>
          group: <strong {...currentGroup.id.mark}>{groupId}</strong>
        </span>
      }
      toolbar={
        <DetailToolbar
          buttonsItems={[
            {
              name: "assign-role",
              run: () =>
                openTask("aclSubjectAssign", {
                  type: "CLUSTER.ACL.SUBJECT_ROLE.ASSIGN",
                  key: {clusterName},
                  payload: {
                    clusterName,
                    subjectType: "group",
                    subjectId: groupId,
                    alreadyAssigned: acls.group?.[groupId] ?? [],
                    assignableItems: Object.keys(acls.role ?? {}),
                  },
                }),
            },
            {
              name: "delete-group",
              confirm: {
                title: "Delete group?",
                description: `This deletes the group ${groupId}`,
                action: {
                  type: "LIB.CALL.CLUSTER",
                  key: {clusterName},
                  payload: {
                    taskLabel: `delete group "${groupId}"`,
                    call: {
                      name: "acl-remove-group",
                      payload: {group_id: groupId},
                    },
                  },
                },
              },
            },
          ]}
        />
      }
      {...currentGroup.mark}
    >
      <RolesAssignedTo
        subjectId={groupId}
        roleIdList={roleIdList}
        unassignCall={roleId => ({
          name: "acl-unassign-role-from-group",
          payload: {role_id: roleId, group_id: groupId},
        })}
      />
    </DetailLayout>
  );
};
