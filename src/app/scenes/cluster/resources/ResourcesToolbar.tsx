import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { push } from "connected-react-router";
import { Button } from "@patternfly/react-core";
import { parse, stringifyUrl } from "query-string";

import { ClusterSectionToolbar } from "app/view";

import { ResourceAddWizard } from "./wizardAddResource";

export const ResourcesToolbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = parse(location.search);
  const addResourceWizardUrl = stringifyUrl({
    url: location.pathname,
    query: { ...params, wizard: "add-resource" },
  });

  const { wizard, ...withoutWizard } = params;
  const addResourceWizardUrlClose = stringifyUrl({
    url: location.pathname,
    query: withoutWizard,
  });

  return (
    <ClusterSectionToolbar>
      <Button
        variant="primary"
        onClick={() => dispatch(push(addResourceWizardUrl))}
        data-test="add-cluster"
      >
        Add Resource
      </Button>
      {params.wizard === "add-resource" && (
        <ResourceAddWizard
          onClose={() => dispatch(push(addResourceWizardUrlClose))}
        />
      )}
    </ClusterSectionToolbar>
  );
};
