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

const {currentUser} = testMarks.cluster.acl;

export const UserView = ({
  userId,
  roleIdList,
}: {
  userId: string;
  roleIdList: AclType<"user">;
}) => {
  const {clusterName} = useLoadedCluster();

  const assignRoleOpenArgs: AssignRoleOpenArgs = [
    {subjectType: "user", subjectId: userId},
  ];

  return (
    <DetailLayout
      caption={
        <span>
          user: <strong {...currentUser.id.mark}>{userId}</strong>
        </span>
      }
      toolbar={
        <DetailToolbar
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
              name: "delete-user",
              confirm: {
                title: "Delete user?",
                description: `This deletes the user ${userId}`,
                action: {
                  type: "LIB.CALL.CLUSTER",
                  key: {clusterName},
                  payload: {
                    taskLabel: `delete user "${userId}"`,
                    call: {
                      name: "acl-remove-target",
                      payload: {target_id: userId},
                    },
                  },
                },
              },
            },
          ]}
        />
      }
      {...currentUser.mark}
    >
      <RolesAssignedTo
        subjectId={userId}
        roleIdList={roleIdList}
        unassignCall={roleId => ({
          name: "acl-unassign-role-from-target",
          payload: {role_id: roleId, target_id: userId},
        })}
      />
    </DetailLayout>
  );
};
