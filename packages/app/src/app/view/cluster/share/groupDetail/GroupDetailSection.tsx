import type React from "react";
import {PageSection} from "@patternfly/react-core";

import {type DetailTypeList, useDetailMatch} from "./useDetailMatch";

export const GroupDetailSection = (props: {
  children: React.ReactNode;
  detailTypeList?: DetailTypeList;
  "data-test"?: string;
}) => {
  const {matchingDetail} = useDetailMatch(props.detailTypeList);

  if (matchingDetail) {
    return (
      <PageSection
        className="ha-m-full-height pf-v5-m-fill"
        data-test={props["data-test"]}
      >
        {props.children}
      </PageSection>
    );
  }

  return (
    <PageSection data-test={props["data-test"]}>{props.children}</PageSection>
  );
};
