import React from "react";
import {
  Button,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";

import { FilterGroups } from "app/view/common";

export function PrimitiveAttrsToolbar<T extends Record<string, boolean>>({
  edit,
  importances,
  setImportances,
}: {
  edit: () => void;
  importances: T;
  setImportances: (i: T) => void;
}) {
  const clearAllFilters = () =>
    setImportances(FilterGroups.unselectAllOptions(importances));

  return (
    <Toolbar
      className="pf-m-toggle-group-container"
      clearAllFilters={clearAllFilters}
    >
      <ToolbarContent>
        <ToolbarGroup variant="filter-group">
          <FilterGroups
            name="Importance"
            options={importances}
            setSelected={setImportances}
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarItem>
            <Button onClick={edit}>Edit Attributes</Button>
          </ToolbarItem>
        </ToolbarGroup>
      </ToolbarContent>
    </Toolbar>
  );
}
