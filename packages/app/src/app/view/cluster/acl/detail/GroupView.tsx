import {testMarks} from "app/view/dataTest";
import {TaskOpenArgs} from "app/view/share";
import {
  DetailLayout,
  DetailToolbar,
  useLoadedCluster,
} from "app/view/cluster/share";

import {AclType} from "../types";

import * as task from "./task";
import {RolesAssignedTo} from "./RolesAssignedTo";

type AssignRoleOpenArgs = TaskOpenArgs<typeof task.assignSubjectToRole.useTask>;

const {currentGroup} = testMarks.cluster.acl;

export const GroupView = ({
  groupId,
  roleIdList,
}: {
  groupId: string;
  roleIdList: AclType<"user" | "group">;
}) => {
  const {clusterName} = useLoadedCluster();

  const assignRoleOpenArgs: AssignRoleOpenArgs = [
    {subjectType: "group", subjectId: groupId},
  ];

  return (
    <DetailLayout
      caption={
        <span>
          group: <strong {...currentGroup.id.mark}>{groupId}</strong>
        </span>
      }
      toolbar={
        <DetailToolbar
          toolbarName="group"
          buttonsItems={[
            {
              name: "assign-role",
              task: {
                component: task.assignSubjectToRole.Task,
                useTask: task.assignSubjectToRole.useTask,
                openArgs: assignRoleOpenArgs,
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
