import React from "react";
import { Card, CardBody, CardTitle, DataList } from "@patternfly/react-core";

import { tools } from "app/store";
import { EmptyStateNoItem } from "app/view/share";
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
    <Card className="pf-u-mb-sm pf-u-mr-sm">
      <CardTitle>{`${tools.labelize(aclType)}s`}</CardTitle>
      <CardBody>
        {!hasItems && (
          <EmptyStateNoItem
            title={`No ACL ${aclType} is configured.`}
            message={`You don't have any configured acl ${aclType}s here.`}
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
      </CardBody>
    </Card>
  );
};
