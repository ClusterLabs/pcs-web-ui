export const endpoint = <
  URL,
  METHOD extends "get" | "post",
  PARAMS,
  PAYLOAD,
  VALIDATE,
  SHAPE,
>({
  url,
  method,
  params,
  payload,
  shape,
  validate,
}: {
  url: URL;
  method: METHOD;
  params: PARAMS;
  payload: PAYLOAD;
  shape: SHAPE;
  validate: VALIDATE;
}) => {
  return {
    url,
    method,
    params,
    payload,
    shape,
    validate,
  };
};
