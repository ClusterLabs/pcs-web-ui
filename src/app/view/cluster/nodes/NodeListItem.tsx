import React from "react";
import {
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
} from "@patternfly/react-core";

import { Link } from "app/view/share";
import { Node } from "app/view/cluster/types";
import {
  SelectionIndicatorInGroup,
  StatusSign,
  toLabel,
  useGroupDetailViewContext,
} from "app/view/share";

export const NodeListItem: React.FC<{ node: Node }> = ({ node }) => {
  const { selectedItemUrlName } = useGroupDetailViewContext();
  return (
    <DataListItem aria-labelledby={node.name}>
      <DataListItemRow>
        <DataListItemCells
          dataListCells={
            <>
              <DataListCell>
                <Link to={`/${node.name}`}>
                  <strong>{node.name}</strong>
                </Link>
              </DataListCell>
              <DataListCell>
                <StatusSign
                  status={
                    node.status === "DATA_NOT_PROVIDED"
                      ? "WARNING"
                      : node.statusSeverity
                  }
                  label={<strong>{toLabel(node.status)}</strong>}
                  showOkIco
                />
              </DataListCell>
              <DataListCell>
                <StatusSign
                  status={
                    node.status === "DATA_NOT_PROVIDED"
                      ? "WARNING"
                      : node.quorumSeverity
                  }
                  label={
                    <strong>
                      {node.status === "DATA_NOT_PROVIDED"
                        && "Unknown quorum status"}
                      {node.status !== "DATA_NOT_PROVIDED"
                        && (node.quorum ? "Has quorum" : "Does not have quorum")}
                    </strong>
                  }
                  showOkIco
                />
              </DataListCell>
            </>
          }
        />
        {selectedItemUrlName !== "" && (
          <SelectionIndicatorInGroup
            isSelected={node.name === selectedItemUrlName}
          />
        )}
      </DataListItemRow>
    </DataListItem>
  );
};
