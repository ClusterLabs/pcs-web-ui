import React from "react";
import { connect } from "react-redux";
import {
  PageSection,
  PageSectionVariants,
  Breadcrumb,
} from "@patternfly/react-core";
import { StyleSheet, css } from "@patternfly/react-styles";

import BreadcrumbItem from "./BreadcrumbItem";

const styles = StyleSheet.create({
  breadcrumbSection: {
    "padding-top": "0.7rem!important",
    "padding-bottom": "0.7rem!important",
  },
});

/* eslint-disable react/no-array-index-key */
const BreadcrumbsView = ({ urlParts }) => (
  <PageSection
    variant={PageSectionVariants.light}
    className={css(styles.breadcrumbSection)}
  >
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
