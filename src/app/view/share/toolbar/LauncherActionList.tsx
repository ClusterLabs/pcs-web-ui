import {Button} from "@patternfly/react-core";

import {tools} from "app/store";

import {LauncherGroup} from "./LauncherGroup";
import {Launcher} from "./Launcher";
import {LauncherItem} from "./types";

export const LauncherActionList = ({
  items = [],
  name,
}: {
  items: LauncherItem[];
  name: string;
}) => {
  return (
    <LauncherGroup items={items}>
      {items.map((item, i) => (
        <Launcher key={i} item={item}>
          {launch => (
            <Button
              variant={item?.button?.variant ?? "secondary"}
              onClick={launch}
              data-test={`task ${name}-${item.name}`}
              isDisabled={item?.disabled ?? false}
            >
              {tools.labelize(item.label || item.name)}
            </Button>
          )}
        </Launcher>
      ))}
    </LauncherGroup>
  );
};
