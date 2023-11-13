import {testMarks} from "app/view/dataTest";
import {LauncherItem as ToolbarItem} from "app/view/share";
import {Clone} from "app/view/cluster/types";
import {DetailToolbar, useLoadedCluster} from "app/view/cluster/share";
import {useOpenTask} from "app/view/task";

const {toolbar} = testMarks.cluster.resources.currentClone;

export const ClonePageToolbar = ({clone}: {clone: Clone}) => {
  const {clusterName, nodeList} = useLoadedCluster();
  const openTask = useOpenTask();
  const move: ToolbarItem = {
    name: "move",
    ...toolbar.move.mark,
    run: () =>
      openTask("resourceMove", {
        type: "RESOURCE.MOVE.OPEN",
        payload: {
          clusterName,
          resourceId: clone.id,
          resourceType: "clone",
          isPromotable: clone.promotable,
          nodeNameList: nodeList.map(n => n.name),
        },
      }),
  };
  return (
    <>
      <DetailToolbar buttonsItems={[move]} {...toolbar.mark} />
    </>
  );
};
