import {call, put, takeEvery} from "redux-saga/effects";

import {withAuthCare} from "../login/sagas.js"

import * as actions from "./actions"
import * as types from "./constants"
import * as api from "./api.js"

export const transformClusterProperties = (clusterName, apiData) => ({
  clusterName,
  properties: Object.keys(apiData).map(key => {
    const apiProperty = apiData[key];
    let property = {
      name: apiProperty.name,
      advanced: apiProperty.advanced,
      defaultValue: apiProperty["default"],
      shortDesc: apiProperty.shortdesc,
      longDesc: apiProperty.longdesc,
      label: apiProperty.readable_name,
      source: apiProperty.source,
      type: apiProperty.type,
      value: apiProperty.value,
    };
    if(apiProperty.type === "enum"){
      property.enum = apiProperty.enum
    }
    return property;
  }),
});

export function* fetchClusterProperties({payload: {clusterName}}){
  const response = yield call(
    withAuthCare,
    api.fetchClusterProperties,
    clusterName,
  )
  const clusterProperties = yield call(
    transformClusterProperties,
    clusterName,
    response.data
  );
  yield put(actions.fetchClusterPropertiesSuccess(clusterProperties));
}

export default [
  takeEvery(types.FETCH_CLUSTER_PROPERTIES, fetchClusterProperties),
];
