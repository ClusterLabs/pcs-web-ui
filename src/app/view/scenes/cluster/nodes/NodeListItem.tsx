import React from "react";
import { Link } from "react-router-dom";
import {
  DataListCell,
  DataListItem,
  DataListItemCells,
  DataListItemRow,
} from "@patternfly/react-core";

import { types } from "app/store";
import { StatusSign, useGroupDetailViewContext } from "app/view/common";
import { toLabel } from "app/view/utils";

export const NodeListItem = ({ node }: { node: types.cluster.Node }) => {
  const { urlPrefix } = useGroupDetailViewContext();
  return (
    <DataListItem aria-labelledby={node.name}>
      <DataListItemRow>
        <DataListItemCells
          dataListCells={
            <>
              <DataListCell>
                <Link
                  to={`${urlPrefix}/${node.name}`}
                  id={`node-list-item-${node.name}`}
                >
                  <strong>{node.name}</strong>
                </Link>
              </DataListCell>
              <DataListCell>
                {"Status "}
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
                {"Quorum "}
                <StatusSign
                  status={
                    node.status === "DATA_NOT_PROVIDED"
                      ? "WARNING"
                      : node.quorumSeverity
                  }
                  label={
                    <strong>
                      {node.status === "DATA_NOT_PROVIDED"
                        ? "Unknown"
                        : toLabel(node.quorum)}
                    </strong>
                  }
                  showOkIco
                />
              </DataListCell>
            </>
          }
        />
      </DataListItemRow>
    </DataListItem>
  );
};
