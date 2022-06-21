import { Label } from "@patternfly/react-core";

import { useGroupDetailViewContext } from "app/view/share";

export const AclDetailPage = () => {
  const { selectedItemUrlType: aclType, selectedItemUrlName: aclName } =
    useGroupDetailViewContext();
  return (
    <>
      <Label>{aclType}</Label>
      <Label>{aclName}</Label>
    </>
  );
};
