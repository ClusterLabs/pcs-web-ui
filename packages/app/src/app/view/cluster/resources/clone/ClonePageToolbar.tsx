import {testMarks} from "app/view/dataTest";
import type {Clone} from "app/view/cluster/types";
import {DetailToolbar} from "app/view/cluster/share";
import {useOpenMoveBanTask} from "app/view/cluster/resources";
import {LauncherDropdown} from "app/view/share";

const {toolbar} = testMarks.cluster.resources.currentClone;

export const ClonePageToolbar = ({clone}: {clone: Clone}) => {
  const openMoveTask = useOpenMoveBanTask();
  return (
    <DetailToolbar
      buttonsItems={[
        {
          name: "move",
          run: () => openMoveTask("clone", clone.id, "move"),
          ...toolbar.move.mark,
        },
        {
          name: "ban",
          run: () => openMoveTask("clone", clone.id, "ban"),
          ...toolbar.ban.mark,
        },
      ]}
      dropdown={
        <LauncherDropdown
          items={[
            {
              name: "clear",
              run: () => openMoveTask("clone", clone.id, "clear"),
              ...toolbar.dropdown.clear.mark,
            },
          ]}
          {...toolbar.dropdown.mark}
        />
      }
      {...toolbar.mark}
    />
  );
};
