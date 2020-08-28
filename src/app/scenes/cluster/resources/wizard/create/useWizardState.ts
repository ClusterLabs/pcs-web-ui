import { selectors, useDispatch } from "app/store";
import { useClusterSelector, useWizardOpenClose } from "app/view";
import { CREATE_RESOURCE } from "app/scenes/wizardKeys";

export const useWizardState = () => {
  const [wizardState, clusterUrlName] = useClusterSelector(
    selectors.getWizardResourceCreateState,
  );
  const dispatch = useDispatch();
  const openClose = useWizardOpenClose(CREATE_RESOURCE);

  return {
    wizardState,
    clusterUrlName,
    dispatch,
    close: () => {
      openClose.close();
      dispatch({
        type: "RESOURCE.PRIMITIVE.CREATE.CLOSE",
        payload: {
          clusterUrlName,
        },
      });
    },
    open: openClose.open,
    isOpened: openClose.isOpened,
  };
};
