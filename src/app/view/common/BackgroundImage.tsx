import React from "react";
import {
  BackgroundImageSrcMap,
  BackgroundImage as PfBackgroundImage,
} from "@patternfly/react-core";

import b1200 from "@patternfly/patternfly/assets/images/pfbg_1200.jpg";
import b768 from "@patternfly/patternfly/assets/images/pfbg_768.jpg";
import b768x2x from "@patternfly/patternfly/assets/images/pfbg_768@2x.jpg";
import b576 from "@patternfly/patternfly/assets/images/pfbg_576.jpg";
import b576x2x from "@patternfly/patternfly/assets/images/pfbg_576@2x.jpg";

export const BackgroundImageSources: BackgroundImageSrcMap = {
  lg: b1200,
  sm: b768,
  sm2x: b768x2x,
  xs: b576,
  xs2x: b576x2x,
};

export const BackgroundImage = () => (
  <PfBackgroundImage src={BackgroundImageSources} />
);
