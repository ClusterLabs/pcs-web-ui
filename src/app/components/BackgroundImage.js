import React from "react";
import {
  BackgroundImage as PfBackgroundImage,
  BackgroundImageSrc,
} from "@patternfly/react-core";

import b1200 from "@patternfly/patternfly/assets/images/pfbg_1200.jpg";
import b768 from "@patternfly/patternfly/assets/images/pfbg_768.jpg";
import b768x2x from "@patternfly/patternfly/assets/images/pfbg_768@2x.jpg";
import b576 from "@patternfly/patternfly/assets/images/pfbg_576.jpg";
import b576x2x from "@patternfly/patternfly/assets/images/pfbg_576@2x.jpg";
import backgroundFilter
  from "@patternfly/patternfly/assets/images/background-filter.svg";

export const BackgroundImageSources = {
  [BackgroundImageSrc.lg]: b1200,
  [BackgroundImageSrc.sm]: b768,
  [BackgroundImageSrc.sm2x]: b768x2x,
  [BackgroundImageSrc.xs]: b576,
  [BackgroundImageSrc.xs2x]: b576x2x,
  [BackgroundImageSrc.filter]: `${backgroundFilter}#image_overlay`,
};

const BackgroundImage = () => (
  <PfBackgroundImage src={BackgroundImageSources} />
);

export default BackgroundImage;
