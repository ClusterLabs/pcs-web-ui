import React from "react";
import { Modal } from "@patternfly/react-core";

export const TaskSimple: React.FC<{
  close: () => void;
  footer: React.ReactNode;
  title: React.ComponentProps<typeof Modal>["title"];
  ["data-test"]?: string;
}> = ({ close, footer, children, title, "data-test": dataTest }) => {
  return (
    <Modal
      variant="medium"
      title={title}
      isOpen
      onClose={close}
      actions={[<React.Fragment key="footer">{footer}</React.Fragment>]}
      data-test={dataTest}
    >
      {children}
    </Modal>
  );
};
