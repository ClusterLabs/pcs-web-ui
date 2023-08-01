import {testMarks} from "app/view/dataTest";
import {DetailLayout, Router, UrlTabs, useUrlTabs} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";

import {AclType} from "../types";

import {RoleViewToolbar} from "./RoleViewToolbar";
import {getAssignedSubjectIdList} from "./tools";
import {RoleViewDetail} from "./RoleViewDetail";
import {RoleViewSubjects} from "./RoleViewSubjects";

export const aclRolePageTabList = ["detail", "users", "groups"] as const;

const {currentRole} = testMarks.cluster.acl;

export const RoleView = ({
  roleId,
  role,
}: {
  roleId: string;
  role: AclType<"role">;
}) => {
  const {acls} = useLoadedCluster();
  const {currentTab, matchedContext} = useUrlTabs(aclRolePageTabList);

  return (
    <DetailLayout
      caption={
        <span>
          role: <strong {...currentRole.id.mark}>{roleId}</strong>
        </span>
      }
      toolbar={<RoleViewToolbar roleId={roleId} />}
      tabs={
        <UrlTabs
          tabList={aclRolePageTabList}
          currentTab={currentTab}
          data-test="node"
        />
      }
      {...currentRole.mark}
    >
      <Router base={matchedContext}>
        {currentTab === "detail" && (
          <RoleViewDetail roleId={roleId} role={role} />
        )}
        {currentTab === "users" && (
          <RoleViewSubjects
            roleId={roleId}
            subjectType="user"
            assignedSubjectIds={getAssignedSubjectIdList(acls.user, roleId)}
          />
        )}
        {currentTab === "groups" && (
          <RoleViewSubjects
            roleId={roleId}
            subjectType="group"
            assignedSubjectIds={getAssignedSubjectIdList(acls.group, roleId)}
          />
        )}
      </Router>
    </DetailLayout>
  );
};
