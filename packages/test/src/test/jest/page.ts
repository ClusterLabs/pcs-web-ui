import {chromium} from "playwright";

export const getPage = async () => {
  const headless =
    process.env.PCS_WUI_TESTS_HEADLESS?.toLowerCase() !== "false";

  const videoDir = process.env.PCS_WUI_TESTS_VIDEO_DIR;

  const browser = await chromium.launch({headless});
  const page = await browser.newPage({
    ignoreHTTPSErrors: true,
    ...(videoDir ? {recordVideo: {dir: videoDir}} : {}),
  });
  return page;
};
