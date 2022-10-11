import React from "react";

import { DetailLayout } from "app/view/share";

type DetailLayoutProps = React.ComponentProps<typeof DetailLayout>;
export const Layout = ({
  aclType,
  aclId,
  toolbar,
  tabs,
  children,
}: {
  aclType: "role" | "user" | "group";
  aclId: string;
  toolbar: DetailLayoutProps["toolbar"];
  tabs?: DetailLayoutProps["tabs"];
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
      tabs={tabs}
    >
      {children}
    </DetailLayout>
  );
};
