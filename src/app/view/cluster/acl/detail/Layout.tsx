import React from "react";
import { Divider } from "@patternfly/react-core";

import { DetailLayout } from "app/view/share";

export const Layout = ({
  aclType,
  aclId,
  toolbar,
  children,
}: {
  aclType: "role" | "user" | "group";
  aclId: string;
  toolbar: React.ComponentProps<typeof DetailLayout>["toolbar"];
  children: React.ReactNode;
}) => {
  return (
    <DetailLayout
      caption={
        <>
          <span>{`${aclType}: `}</span>
          <strong>{`${aclId}`}</strong>
        </>
      }
      toolbar={toolbar}
    >
      <Divider />
      {children}
    </DetailLayout>
  );
};
