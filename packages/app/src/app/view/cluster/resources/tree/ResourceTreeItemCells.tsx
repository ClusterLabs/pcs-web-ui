import type React from "react";
import {DataListCell, DataListItemCells} from "@patternfly/react-core";

import {useLocation} from "app/view/share";

const nestIndentMap = {
  0: "pf-v5-u-ml-0",
  1: "pf-v5-u-ml-lg",
  2: "pf-v5-u-ml-xl",
};

export const ResourceTreeItemCells = ({
  resourceId,
  idCell,
  typeCell,
  statusCell,
  nestingLevel,
}: {
  resourceId: string;
  idCell: React.ReactNode;
  typeCell: React.ReactNode;
  statusCell: React.ReactNode;
  nestingLevel: 0 | 1 | 2;
}) => {
  const {navigate} = useLocation();
  return (
    <>
      <DataListItemCells
        dataListCells={[
          <DataListCell
            key="resourceId"
            className={nestIndentMap[nestingLevel]}
          >
            {idCell}
          </DataListCell>,
          <DataListCell
            key="resourceType"
            className={nestIndentMap[nestingLevel]}
          >
            {typeCell}
          </DataListCell>,
        ]}
        onClick={() => navigate(`/${resourceId}`)}
      />
      {statusCell}
    </>
  );
};
