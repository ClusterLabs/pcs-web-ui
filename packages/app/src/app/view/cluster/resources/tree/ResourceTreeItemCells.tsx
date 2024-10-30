import {DataListCell, DataListItemCells} from "@patternfly/react-core";

const nestIndentMap = {
  0: "pf-v5-u-ml-0",
  1: "pf-v5-u-ml-lg",
  2: "pf-v5-u-ml-xl",
};

export const ResourceTreeItemCells = ({
  idCell,
  typeCell,
  statusCell,
  nestingLevel,
}: {
  idCell: React.ReactNode;
  typeCell: React.ReactNode;
  statusCell: React.ReactNode;
  nestingLevel: 0 | 1 | 2;
}) => {
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
      />
      {statusCell}
    </>
  );
};
