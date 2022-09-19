import React from "react";
import { StackItem, TextContent, Title } from "@patternfly/react-core";

export const DetailViewSection = ({
  children,
  caption,
}: {
  children: React.ReactNode;
  caption?: React.ReactNode;
}) => {
  return (
    <StackItem>
      {caption && (
        <TextContent>
          <Title headingLevel={"h2"}>{caption}</Title>
        </TextContent>
      )}
      {children}
    </StackItem>
  );
};
