import React from "react";
import { DataList } from "@patternfly/react-core";

import { tools } from "app/store";
import { Card, EmptyStateNoItem } from "app/view/share";
import { Acl } from "app/view/cluster/types";

import { AclType } from "../types";

export const AclListCard = <ACL_TYPE extends "role" | "user" | "group">({
  aclList,
  aclType,
  renderItem,
}: {
  aclList: Acl[ACL_TYPE] | undefined;
  aclType: ACL_TYPE;
  renderItem: (_id: string, _aclObject: AclType<ACL_TYPE>) => React.ReactNode;
}) => {
  const hasItems = aclList !== undefined && Object.keys(aclList).length > 0;
  return (
    <Card
      title={`${tools.labelize(aclType)}s`}
      data-test={`acl-${aclType}-list`}
    >
      {!hasItems && (
        <EmptyStateNoItem
          title={`No ACL ${aclType} is configured.`}
          message={`You don't have any configured ACL ${aclType}s here.`}
        />
      )}

      {hasItems && (
        <DataList aria-label={`Cluster ${aclType} acls`}>
          {Object.entries(aclList).map(([id, aclObject]) => (
            <React.Fragment key={id}>
              {renderItem(id, aclObject)}
            </React.Fragment>
          ))}
        </DataList>
      )}
    </Card>
  );
};
