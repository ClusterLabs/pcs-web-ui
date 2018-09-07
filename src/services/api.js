const ajaxHeaders = {
  "X-Requested-With": "XMLHttpRequest",
};

class ApiBadStatus extends Error{
  constructor(statusCode, text){
    super(`Server returned the http status error ${statusCode}`)
    Error.captureStackTrace(this, ApiBadStatus)
    this.name = 'ApiBadStatus';
    this.statusCode = statusCode;
    this.text = text;
  }
}

class ApiNotExpectedJson extends Error{
  constructor(text){
    super(`Not expected json in server response`)
    Error.captureStackTrace(this, ApiBadStatus)
    this.name = 'ApiNotExpectedJson';
    this.text = text;
  }
}

class ApiTransformationError extends Error{
  constructor(message, transformFnName, data){
    super(message)
    Error.captureStackTrace(this, ApiTransformationError)
    this.name = 'ApiTransformationError';
    this.transformFnName = transformFnName;
    this.data = data;
  }
}

function failMessage(error){
  switch(error.name){
    case "ApiBadStatus": return (
      `Server returned http status error ${error.statusCode} (${error.text})`
    );

    case "ApiTransformationError":
      const data = typeof error.data === "object"
        ? JSON.stringify(error.data)
        : error.data
      ;
      return `Cannot transform data (${error.message}): ${data}`;

    case "ApiNotExpectedJson":
      return `Data returned from server is not in JSON format: '${error.text}'`;

    default: return error.message;
  }
};

export const isUnauthorizedError = error => (
  error.name === "ApiBadStatus" && error.statusCode === 401
)

export function fail(error){
  return {
    name: error.name,
    message: failMessage(error),
  }
}

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

const checkResponse = response => {
  if( ! response.ok){
    throw new ApiBadStatus(response.status, response.statusText);
  }
  return response;
}

export const httpParams = keyValueObject => (
  Object.keys(keyValueObject)
    .map(key => 
      `${encodeURIComponent(key)}=${encodeURIComponent(keyValueObject[key])}`
    )
    .join('&')
)

export const getJson = async(url, {params={}, transform=undefined}={}) => {
  const response = checkResponse(
    await fetch(getUrl(url, params), {headers: ajaxHeaders})
  );

  const text = await response.text();
  try{
    // var - to be visible outside the try block
    var data = JSON.parse(text)
  }catch(error){
    throw new ApiNotExpectedJson(text)
  }

  if( ! transform){
    return data;
  }

  try{
    return transform(data);
  }catch(error){
    throw new ApiTransformationError(error.message, transform.name, data)
  }
}

export const getForText = async(url, {params={}}={}) => {
  const response = checkResponse(
    await fetch(getUrl(url, params), {headers: ajaxHeaders})
  );

  return await response.text();
}

export const postParamsForText = async(url, params) => {
  const response = checkResponse(await fetch(url, {
    method: "post",
    headers: {
      ...ajaxHeaders,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: httpParams(params)
  }));
  return await response.text();
}
