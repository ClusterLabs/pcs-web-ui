import {testMarks} from "app/view/dataTest";
import {
  DetailLayout,
  DetailToolbar,
  useLoadedCluster,
} from "app/view/cluster/share";

import {AclType} from "../types";

import {RolesAssignedTo} from "./RolesAssignedTo";

const {currentGroup} = testMarks.cluster.acl;

export const GroupView = ({
  groupId,
  roleIdList,
}: {
  groupId: string;
  roleIdList: AclType<"user" | "group">;
}) => {
  const {clusterName} = useLoadedCluster();

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
              taskName: "aclSubjectAssign",
              taskInitAction: {
                type: "CLUSTER.ACL.SUBJECT_ROLE.ASSIGN",
                key: {clusterName},
                payload: {subjectType: "group", subjectId: groupId},
              },
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
