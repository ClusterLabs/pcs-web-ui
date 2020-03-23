import React from "react";
import {
  Stack,
  StackItem,
  Alert,
  Title,
  EmptyState,
  EmptyStateIcon,
  EmptyStateBody,
} from "@patternfly/react-core";
import { CheckCircleIcon } from '@patternfly/react-icons';

import { types } from "app/store";

import * as pallete from "./pallete";


const mapSeverityToVariant = (severity: types.cluster.Issue["severity"]) => (
  severity === "ERROR" ? "danger" : "warning"
);
const issueKey = (issue: types.cluster.Issue, index: any) => (
  `${index}:${issue.message}`
);

export const IssueList = ({ issueList, margin = false, hideEmpty = false }: {
  issueList: types.cluster.Issue[],
  margin?: boolean,
  hideEmpty?: boolean,
}) => {
  if (issueList.length === 0) {
    if (hideEmpty) {
      return null;
    }
    return(
      <EmptyState
        variant="small"
        aria-label="Issues status"
        style={{margin: "auto"}}
      >
        <EmptyStateIcon icon={CheckCircleIcon} color={pallete.SUCCESS} />
        <Title size="lg">No issues</Title>
        <EmptyStateBody>Pcsd has not detected any issue here</EmptyStateBody>
      </EmptyState>
    );
  }
  return (
    <Stack
      gutter="sm"
      style={{ margin: margin ? "1rem" : "none" }}
      aria-label="Issues status"
    >
      {issueList.map((issue, i) => (
        <StackItem key={issueKey(issue, i)} isFilled aria-label="cluster issue">
          <Alert
            isInline
            variant={mapSeverityToVariant(issue.severity)}
            title={issue.message}
          />
        </StackItem>
      ))}
      {issueList.length === 0 && (
      <StackItem isFilled aria-label="no cluster issue">
        <Alert variant="info" isInline title="No issue" />
      </StackItem>
      )}
    </Stack>
  );
};
