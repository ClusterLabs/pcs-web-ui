const ajaxHeaders = {
  "X-Requested-With": "XMLHttpRequest",
};

const captureStackTrace = (error, errorClass, message) => {
  if (Error.hasOwnProperty('captureStackTrace')) { // V8
    Error.captureStackTrace(error, errorClass);
  } else {
    Object.defineProperty(error, 'stack', {
      // enumerable: true,
      writable: true,
      configurable: true,
      value: (new Error(message)).stack,
    });
  }
};

export class ApiBadStatus extends Error {
  constructor(statusCode, text, body) {
    super(
      `Server returned the http status error ${statusCode} (${text}): ${body}`,
    );
    captureStackTrace(this, ApiBadStatus, body);
    this.name = "ApiBadStatus";
    this.statusCode = statusCode;
    this.text = text;
    this.body = body;
  }
}

class ApiNotExpectedJson extends Error {
  constructor(text) {
    super("Not expected json in server response");
    captureStackTrace(this, ApiNotExpectedJson, text);
    this.name = "ApiNotExpectedJson";
    this.text = text;
  }
}

class ApiTransformationError extends Error {
  constructor(message, transformFnName, data) {
    super(message);
    captureStackTrace(this, ApiTransformationError, message);
    this.name = "ApiTransformationError";
    this.transformFnName = transformFnName;
    this.data = data;
  }
}

function failMessage(error) {
  switch (error.name) {
    case "ApiBadStatus": return (
      `Server returned http status error ${error.statusCode} (${error.text})`
    );

    case "ApiTransformationError":
      /* eslint no-case-declarations: "off" */
      const data = typeof error.data === "object"
        ? JSON.stringify(error.data)
        : error.data;
      return `Cannot transform data (${error.message}): ${data}`;

    case "ApiNotExpectedJson":
      return `Data returned from server is not in JSON format: '${error.text}'`;

    default: return error.message;
  }
}

export const isUnauthorizedError = error => (
  error.name === "ApiBadStatus" && error.statusCode === 401
);

export function fail(error) {
  return {
    name: error.name,
    message: failMessage(error),
  };
}

const checkResponse = async (response) => {
  if (!response.ok) {
    throw new ApiBadStatus(
      response.status,
      response.statusText,
      await response.text(),
    );
  }
  return response;
};

export const httpParams = keyValueObject => (
  Object.keys(keyValueObject)
    .map(key => (
      `${encodeURIComponent(key)}=${encodeURIComponent(keyValueObject[key])}`
    ))
    .join("&")
);

const getUrl = (path, params) => (
  Object.keys(params).length > 0 ? `${path}?${httpParams(params)}` : path
);

export const getJson = async (
  url,
  { params = {}, transform = undefined } = {},
) => {
  const response = await checkResponse(
    await fetch(getUrl(url, params), { headers: ajaxHeaders }),
  );

  const text = await response.text();
  let data;
  try {
    // var - to be visible outside the try block
    data = JSON.parse(text);
  } catch (error) {
    throw new ApiNotExpectedJson(text);
  }

  if (!transform) {
    return data;
  }

  try {
    return transform(data);
  } catch (error) {
    throw new ApiTransformationError(error.message, transform.name, data);
  }
};

export const getForText = async (url, { params = {} } = {}) => {
  const response = await checkResponse(
    await fetch(getUrl(url, params), { headers: ajaxHeaders }),
  );

  return response.text();
};

export const postParamsForText = async (url, { params = {} } = {}) => {
  const response = await checkResponse(await fetch(url, {
    method: "post",
    headers: {
      ...ajaxHeaders,
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: httpParams(params),
  }));
  return response.text();
};
