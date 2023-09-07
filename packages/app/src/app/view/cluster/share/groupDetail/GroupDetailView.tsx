import {Router, useLocation, useRouter} from "app/view/share";

import {GroupDetailViewContextProvider} from "./GroupDetailViewContext";
import {DetailTypeList, useDetailMatch} from "./useDetailMatch";

export const GroupDetailView = (props: {
  groupCard: React.ReactNode;
  detailCard: React.ReactNode;
  detailTypeList?: DetailTypeList;
  "data-test"?: string;
}) => {
  const {base} = useRouter();
  const {navigate} = useLocation();
  const closeDetailUrl = () => navigate(`~${base}`);

  const {matchingDetail} = useDetailMatch(props.detailTypeList);
  if (matchingDetail) {
    return (
      <div
        className="pf-l-flex pf-u-align-items-flex-start pf-u-h-100"
        data-test={props["data-test"]}
      >
        <GroupDetailViewContextProvider
          value={{
            compact: true,
            selectedItemUrlType: matchingDetail.params.detailType ?? null,
            selectedItemUrlName: matchingDetail.params.detailUrlName,
            closeDetailUrl,
          }}
        >
          <div className="ha-c-panel__tree-view">{props.groupCard}</div>
          <div className="pf-c-card pf-m-flex-1 ha-c-panel__details-view">
            <Router base={matchingDetail.matched}>{props.detailCard}</Router>
          </div>
        </GroupDetailViewContextProvider>
      </div>
    );
  }

  return (
    <GroupDetailViewContextProvider
      value={{
        compact: false,
        selectedItemUrlType: null,
        selectedItemUrlName: "",
        closeDetailUrl,
      }}
    >
      <span data-test={props["data-test"]}>{props.groupCard}</span>
    </GroupDetailViewContextProvider>
  );
};
