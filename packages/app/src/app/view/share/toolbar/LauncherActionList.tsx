import {Button} from "@patternfly/react-core";

import {tools} from "app/store";

import {LauncherGroup} from "./LauncherGroup";
import {Launcher} from "./Launcher";
import type {LauncherItem} from "./types";

export const LauncherActionList = ({items = []}: {items: LauncherItem[]}) => {
  return (
    <LauncherGroup items={items}>
      {items.map((item, i) => (
        <Launcher key={i} item={item}>
          {launch => (
            <Button
              variant={item.button?.variant ?? "secondary"}
              onClick={launch}
              isDisabled={item.disabled ?? false}
            >
              {tools.labelize(item.label || item.name)}
            </Button>
          )}
        </Launcher>
      ))}
    </LauncherGroup>
  );
};
