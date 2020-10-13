import { useWizardOpenClose } from "app/view";
import { NODE_ADD } from "app/scenes/wizardKeys";

export const useWizard = () => {
  const openClose = useWizardOpenClose(NODE_ADD);
  return {
    close: () => {
      openClose.close();
    },
    open: openClose.open,
    isOpened: openClose.isOpened,
  };
};
