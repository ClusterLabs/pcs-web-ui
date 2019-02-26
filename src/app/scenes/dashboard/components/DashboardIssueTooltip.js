import React from "react";
import { Tooltip } from "@patternfly/react-core";
import { StyleSheet, css } from "@patternfly/react-styles";

import { StatusSign } from "app/components";
import { ISSUE } from "app/services/cluster/status-constants";

const styles = StyleSheet.create({
  list: {
    "list-style-type": "disc",
    "text-align": "left",
  },
  message: {
    "padding-left": "1rem",
  },
});

const mapSeverityToSign = severity => (
  severity === ISSUE.ERROR ? StatusSign.Error : StatusSign.Warning
);
const issueKey = (issue, index) => `${index}:${issue.message}`;

const Issues = ({ issueList }) => (
  <ul className={css(styles.list)}>
    {issueList.map((issue, i) => {
      const Sign = mapSeverityToSign(issue.severity);
      return (
        <li key={issueKey(issue, i)}>
          <Sign />
          <span className={css(styles.message)}>
            {issue.message}
          </span>
        </li>
      );
    })}
  </ul>
);

const DashboardIssueTooltip = ({ issueList, children }) => (
  <Tooltip
    content={React.createElement(Issues, { issueList })}
    maxWidth="20rem"
  >
    {children}
  </Tooltip>
);

export default DashboardIssueTooltip;
