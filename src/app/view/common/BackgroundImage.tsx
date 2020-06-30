import React from "react";
import { BackgroundImage as PfBackgroundImage } from "@patternfly/react-core";

export const BackgroundImageSources = {
  xs: "/ui/static/media/pfbg_576.jpg",
  xs2x: "/ui/static/media/pfbg_576@2x.jpg",
  sm: "/ui/static/media/pfbg_768.jpg",
  sm2x: "/ui/static/media/pfbg_768@2x.jpg",
  lg: "/ui/static/media/pfbg_1200.jpg",
};

export const BackgroundImage = () => (
  <PfBackgroundImage src={BackgroundImageSources} />
);
