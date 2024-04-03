import React from "react";
import {DataList} from "@patternfly/react-core";

import {tools} from "app/store";
import {Card, EmptyStateNoItem} from "app/view/share";
import {useGroupDetailViewContext} from "app/view/cluster/share";
import {Acls} from "app/view/cluster/acl/types";

import {AclType} from "../types";

export const AclListCard = <ACL_TYPE extends "role" | "user" | "group">({
  aclList,
  aclType,
  renderItem,
}: {
  aclList: Acls[ACL_TYPE] | undefined;
  aclType: ACL_TYPE;
  renderItem: (_id: string, _aclObject: AclType<ACL_TYPE>) => React.ReactNode;
}) => {
  const hasItems = aclList !== undefined && Object.keys(aclList).length > 0;
  const {selectedItemUrlName, selectedItemUrlType} =
    useGroupDetailViewContext();
  return (
    <Card title={`${tools.labelize(aclType)}s`}>
      {!hasItems && (
        <EmptyStateNoItem
          title={`No ACL ${aclType} is configured.`}
          message={`You don't have any configured ACL ${aclType}s here.`}
        />
      )}

      {hasItems && (
        <DataList
          aria-label={`Cluster ${aclType} acls`}
          selectedDataListItemId={`${selectedItemUrlType}-${selectedItemUrlName}`}
        >
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
