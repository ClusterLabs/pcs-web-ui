import type React from "react";
import {forwardRef} from "react";
import {Modal as PfModal} from "@patternfly/react-core";

type ModalProps = Omit<React.ComponentProps<typeof PfModal>, "ref">;

const {topModal} = pcsUiEnvAdapter;

export const Modal = forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  return (
    <PfModal
      position={topModal ? "top" : "default"}
      {...props}
      // biome-ignore lint/suspicious/noExplicitAny:
      ref={ref as any}
    />
  );
});
