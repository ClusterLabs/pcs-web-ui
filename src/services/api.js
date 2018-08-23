const ajaxHeaders = {
  "X-Requested-With": "XMLHttpRequest",
};

function anyParams(params) {
  for(var key in params) {
    if(params.hasOwnProperty(key)){
      return true;
    }
  }
  return false;
}

const getUrl = (path, params) => (
  anyParams(params) ? `${path}?${httpParams(params)}` : path
);

export const httpParams = keyValueObject => (
  Object.keys(keyValueObject)
    .map(key => 
      `${encodeURIComponent(key)}=${encodeURIComponent(keyValueObject[key])}`
    )
    .join('&')
)

export const getForJson = async(url, params={}) => {
  const response = await fetch(getUrl(url, params), {headers: ajaxHeaders});
  return {status: response.status, data: await response.json()};
}

export const getForText = async(url, params={}) => {
  const response = await fetch(getUrl(url, params), {headers: ajaxHeaders});
  return {status: response.status, data: await response.text()};
}

export const postParamsForText = async(url, params) => {
  const response = await fetch(url, {
    method: "post",
    headers: {
      ...ajaxHeaders,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: httpParams(params)
  });
  return {status: response.status, data: await response.text()};
}
