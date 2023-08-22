import {useRoute} from "app/view/share";

// string[] & { 0: string; 1: string } means list of string with at least two
// items
export type DetailTypeList = (string[] & {0: string; 1: string}) | undefined;
type RouteMatch = ReturnType<typeof useRoute>;

const detailTypeMatch = (
  detailTypeList: DetailTypeList,
  detailType: string | undefined,
) =>
  (detailTypeList === undefined && detailType === undefined)
  || (detailTypeList !== undefined
    && detailType !== undefined
    && detailTypeList.includes(detailType));

const detailMatch = (
  detail: RouteMatch,
  detailTypeList: DetailTypeList,
): detail is Exclude<RouteMatch, null> =>
  detail !== null && detailTypeMatch(detailTypeList, detail.params.detailType);

export const useDetailMatch = (detailTypeList?: DetailTypeList) => {
  const detail = useRoute(
    detailTypeList ? "/:detailType/:detailUrlName/*" : "/:detailUrlName/*",
  );
  if (detailMatch(detail, detailTypeList)) {
    return {matchingDetail: detail};
  }
  return {
    matchingDetail: null,
  };
};
