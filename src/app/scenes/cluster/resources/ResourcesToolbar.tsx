import React from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { push } from "connected-react-router";
import { parse, stringifyUrl } from "query-string";

import { ClusterSectionToolbar } from "app/view";

import { ResourceCreateToolbarItem } from "./wizard";

const useWizardOpenState = (wizardKey: string) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = parse(location.search);
  const openUrl = stringifyUrl({
    url: location.pathname,
    query: { ...params, wizard: wizardKey },
  });

  const { wizard, ...withoutWizard } = params;
  const closeUrl = stringifyUrl({
    url: location.pathname,
    query: withoutWizard,
  });

  return {
    open: () => dispatch(push(openUrl)),
    close: () => dispatch(push(closeUrl)),
    isOpened: params.wizard === wizardKey,
  };
};

export const ResourcesToolbar = () => {
  const resourceCreate = useWizardOpenState("create-resource");

  return (
    <ClusterSectionToolbar>
      <ResourceCreateToolbarItem
        open={resourceCreate.open}
        close={resourceCreate.close}
        isOpened={resourceCreate.isOpened}
      />
    </ClusterSectionToolbar>
  );
};
