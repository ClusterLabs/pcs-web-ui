import React from "react";
import { connect } from "react-redux";
import {
  PageSection,
  PageSectionVariants,
  Breadcrumb,
} from "@patternfly/react-core";

import BreadcrumbItem from "./BreadcrumbItem";

/* eslint-disable react/no-array-index-key */
const BreadcrumbsView = ({ urlParts }) => (
  <PageSection variant={PageSectionVariants.light}>
    <Breadcrumb>
      {
        urlParts.length < 1
          ? <BreadcrumbItem to="/" label="Clusters" isActive />
          : urlParts.map((part, i) => (
            <BreadcrumbItem
              key={i}
              to={i === 0 ? "/" : `/${urlParts.slice(0, i + 1).join("/")}`}
              label={part === "cluster" ? "Clusters" : part}
              isActive={i === urlParts.length - 1}
            />
          ))
      }
    </Breadcrumb>
  </PageSection>
);

const withUrlParts = connect(state => ({
  urlParts: state.router.location.pathname
    .replace(/\/$/, "")
    .split("/")
    .slice(1)
  ,
}));

export default withUrlParts(BreadcrumbsView);
