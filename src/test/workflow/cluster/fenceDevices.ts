import {dt} from "test/tools/selectors";

export const getNameList = async () => {
  return await page.$$eval(
    dt("cluster-fence-devices", "^fence-device "),
    clusterElements =>
      clusterElements.map(
        e => e.querySelector("[data-test='name']")?.textContent ?? "",
      ),
  );
};

export const assertNamesAre = async (fenceDeviceNameList: string[]) => {
  expect(await getNameList()).toEqual(fenceDeviceNameList);
};
