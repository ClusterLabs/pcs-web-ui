import {Router, UrlTabs, useUrlTabs} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";

import {AclType} from "../types";

import {Layout} from "./Layout";
import {RoleViewToolbar} from "./RoleViewToolbar";
import {getAssignedSubjectIdList} from "./tools";
import {RoleViewDetail} from "./RoleViewDetail";
import {RoleViewSubjects} from "./RoleViewSubjects";

export const aclRolePageTabList = ["detail", "users", "groups"] as const;

export const RoleView = ({
  roleId,
  role,
}: {
  roleId: string;
  role: AclType<"role">;
}) => {
  const [{acls}] = useLoadedCluster();
  const {currentTab, matchedContext} = useUrlTabs(aclRolePageTabList);

  return (
    <Layout
      aclType="role"
      aclId={roleId}
      toolbar={<RoleViewToolbar roleId={roleId} />}
      tabs={
        <UrlTabs
          tabList={aclRolePageTabList}
          currentTab={currentTab}
          data-test="node"
        />
      }
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
    </Layout>
  );
};
