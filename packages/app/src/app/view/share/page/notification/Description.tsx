import {List, ListItem, Text} from "@patternfly/react-core";

import type {Notification} from "./types";

export const Description = ({details}: {details: Notification["details"]}) => {
  return (
    <>
      {details && details.type === "LIST" && details.items.length > 0 && (
        <>
          <Text component="p">{details.title}</Text>
          <List>
            {details.items.map((item, i) => (
              <ListItem key={i}>{item}</ListItem>
            ))}
          </List>
        </>
      )}
      {details &&
        details.type === "LINES" &&
        details.lines.map((line, i) => <p key={i}>{line}</p>)}
    </>
  );
};
