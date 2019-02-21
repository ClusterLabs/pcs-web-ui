import React from "react";
import { StyleSheet, css } from "@patternfly/react-styles";

const styles = StyleSheet.create({
  label: {
    "padding-left": "0.3em",
  },
});

const LabelWithIcon = ({ icon: Icon, color, label = "" }) => (
  <span style={{ color }}>
    <Icon />
    { label && <span className={css(styles.label)}>{label}</span> }

  </span>
);

export default LabelWithIcon;
