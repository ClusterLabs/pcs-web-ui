import { ActionPayload } from "app/store";
import {
  DataListWithMenu,
  DetailToolbar,
  DetailViewSection,
  TaskOpenArgs,
  useSelectedClusterName,
} from "app/view/share";

import { AclType } from "../types";

import { Layout } from "./Layout";
import * as task from "./task";

type AssignRoleOpenArgs = TaskOpenArgs<typeof task.assignSubjectToRole.useTask>;
type LibCall = ActionPayload["LIB.CALL.CLUSTER"]["call"];

export const SubjectView = ({
  subjectType,
  subjectId,
  roleIdList,
}: {
  subjectType: "user" | "group";
  subjectId: string;
  roleIdList: AclType<"user" | "group">;
}) => {
  const clusterName = useSelectedClusterName();

  const assignRoleOpenArgs: AssignRoleOpenArgs = [
    { subjectType: "user", subjectId: subjectId },
  ];

  const unassignCall = (roleId: string): LibCall =>
    subjectType === "user"
      ? {
          name: "acl-unassign-role-from-target",
          payload: { role_id: roleId, target_id: subjectId },
        }
      : {
          name: "acl-unassign-role-from-group",
          payload: { role_id: roleId, group_id: subjectId },
        };

  const deleteCall: LibCall =
    subjectType === "user"
      ? {
          name: "acl-remove-target",
          payload: { target_id: subjectId },
        }
      : {
          name: "acl-remove-group",
          payload: { group_id: subjectId },
        };

  return (
    <Layout
      aclType={subjectType}
      aclId={subjectId}
      toolbar={
        <DetailToolbar
          toolbarName="user"
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
              name: `delete-${subjectType}`,
              confirm: {
                title: `Delete ${subjectType}?`,
                description: `This deletes the ${subjectType} ${subjectId}`,
                action: {
                  type: "LIB.CALL.CLUSTER",
                  key: { clusterName },
                  payload: {
                    taskLabel: `delete ${subjectType} "${subjectId}"`,
                    call: deleteCall,
                  },
                },
              },
            },
          ]}
        />
      }
    >
      <DetailViewSection caption="Roles assigned">
        <DataListWithMenu
          name="role"
          emptyTitle={`No role assigned to "${subjectId}".`}
          itemList={roleIdList}
          menuItems={[
            roleId => ({
              name: "unassign",
              confirm: {
                title: "Unassign role?",
                description: `This unassigns the role ${roleId}`,
                action: {
                  type: "LIB.CALL.CLUSTER",
                  key: { clusterName },
                  payload: {
                    taskLabel: `unassign role "${roleId}"`,
                    call: unassignCall(roleId),
                  },
                },
              },
            }),
          ]}
        />
      </DetailViewSection>
    </Layout>
  );
};
