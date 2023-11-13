import {testMarks} from "app/view/dataTest";
import {LauncherItem as ToolbarItem} from "app/view/share";
import {Clone} from "app/view/cluster/types";
import {DetailToolbar} from "app/view/cluster/share";
import {useOpenMoveTask} from "app/view/cluster/resources";

const {toolbar} = testMarks.cluster.resources.currentClone;

export const ClonePageToolbar = ({clone}: {clone: Clone}) => {
  const openMoveTask = useOpenMoveTask();
  const move: ToolbarItem = {
    name: "move",
    ...toolbar.move.mark,
    run: () => openMoveTask("clone", clone.id),
  };
  return (
    <>
      <DetailToolbar buttonsItems={[move]} {...toolbar.mark} />
    </>
  );
};
