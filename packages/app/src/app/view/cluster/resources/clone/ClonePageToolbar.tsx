import {testMarks} from "app/view/dataTest";
import {Clone} from "app/view/cluster/types";
import {DetailToolbar} from "app/view/cluster/share";
import {useOpenMoveBanTask} from "app/view/cluster/resources";

const {toolbar} = testMarks.cluster.resources.currentClone;

export const ClonePageToolbar = ({clone}: {clone: Clone}) => {
  const openMoveTask = useOpenMoveBanTask();
  return (
    <>
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
        {...toolbar.mark}
      />
    </>
  );
};
