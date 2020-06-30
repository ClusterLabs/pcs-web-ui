import React from "react";
import {
  Alert,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Stack,
  StackItem,
  Title,
} from "@patternfly/react-core";
import { CheckCircleIcon } from "@patternfly/react-icons";

import { types } from "app/store";

import * as pallete from "./pallete";

const mapSeverityToVariant = (severity: types.cluster.Issue["severity"]) =>
  (severity === "ERROR" ? "danger" : "warning");

const issueKey = (issue: types.cluster.Issue, index: string | number) =>
  `${index}:${issue.message}`;

export const IssueList = ({
  issueList,
  margin = false,
  hideEmpty = false,
}: {
  issueList: types.cluster.Issue[];
  margin?: boolean;
  hideEmpty?: boolean;
}) => {
  if (issueList.length === 0) {
    if (hideEmpty) {
      return null;
    }
    return (
      <EmptyState
        variant="small"
        data-test="issues-status"
        style={{ margin: "auto" }}
      >
        <EmptyStateIcon icon={CheckCircleIcon} color={pallete.SUCCESS} />
        <Title size="lg" headingLevel="h3">
          No issues
        </Title>
        <EmptyStateBody>Pcsd has not detected any issue here</EmptyStateBody>
      </EmptyState>
    );
  }
  return (
    <Stack
      hasGutter
      style={{ margin: margin ? "1rem" : "none" }}
      data-test="issues-status"
    >
      {issueList.map((issue, i) => (
        <StackItem key={issueKey(issue, i)} isFilled>
          <Alert
            isInline
            variant={mapSeverityToVariant(issue.severity)}
            title={issue.message}
            data-test={`cluster-issue ${issue.severity} ${issue.message}`}
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
