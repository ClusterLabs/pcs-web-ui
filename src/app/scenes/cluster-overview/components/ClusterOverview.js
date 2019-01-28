import React from "react";

import {
  Form,
  FormGroup,
  TextInput,
} from "@patternfly/react-core";

const ClusterOverview = ({ cluster }) => (
  <Form>
    <FormGroup
      label="Cluster name"
      fieldId="cluster-overview-cluster-name"
    >
      <TextInput
        isRequired
        type="text"
        id="simple-form-name"
        name="simple-form-name"
        aria-describedby="simple-form-name-helper"
        value={cluster.name}
      />
    </FormGroup>

  </Form>
);

export default ClusterOverview;
