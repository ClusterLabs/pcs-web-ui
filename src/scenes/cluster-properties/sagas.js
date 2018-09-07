import {call, put, takeEvery} from "redux-saga/effects";

import * as auth from "~/services/auth/sagas.js"

import * as actions from "./actions"
import * as types from "./constants"

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
  try{
    const clusterProperties = yield call(
      auth.getJson,
      `/managec/${clusterName}/cluster_properties`,
      {
        transform: data => transformClusterProperties(clusterName, data),
      }
    )
    yield put(actions.fetchClusterPropertiesSuccess(clusterProperties));
  }catch(error){
    yield put(actions.fetchClusterPropertiesFailed(error));
  }
}

export default [
  takeEvery(types.FETCH_CLUSTER_PROPERTIES, fetchClusterProperties),
];
