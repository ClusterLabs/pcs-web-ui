import {Tab, Tabs} from "@patternfly/react-core";
import {testMarks} from "app/view/dataTest";
import {Router, useUrlTabs} from "app/view/share";
import {DetailLayout, useLoadedCluster} from "app/view/cluster/share";

import type {AclType} from "../types";

import {RoleViewToolbar} from "./RoleViewToolbar";
import {getAssignedSubjectIdList} from "./tools";
import {RoleViewDetail} from "./RoleViewDetail";
import {RoleViewSubjects} from "./RoleViewSubjects";

export const aclRolePageTabList = ["detail", "users", "groups"] as const;

const {currentRole} = testMarks.cluster.acl;

const tabMap = {
  detail: <Tab eventKey="detail" key="detail" title={"Detail"} />,
  users: <Tab eventKey="users" key="users" title="Users" />,
  groups: <Tab eventKey="groups" key="groups" title="Groups" />,
};

export const RoleView = ({
  roleId,
  role,
}: {
  roleId: string;
  role: AclType<"role">;
}) => {
  const {acls} = useLoadedCluster();
  const {currentTab, matchedContext, onSelect} = useUrlTabs(
    Object.keys(tabMap) as (keyof typeof tabMap)[],
  );

  return (
    <DetailLayout
      caption={
        <span>
          role: <strong {...currentRole.id.mark}>{roleId}</strong>
        </span>
      }
      toolbar={<RoleViewToolbar roleId={roleId} />}
      tabs={
        <Tabs activeKey={currentTab} onSelect={onSelect}>
          {Object.values(tabMap)}
        </Tabs>
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
