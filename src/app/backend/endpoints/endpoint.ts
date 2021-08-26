export const endpoint = <
  URL,
  METHOD extends "get" | "post",
  PARAMS,
  PAYLOAD,
  SHAPE,
>({
  url,
  method,
  params,
  payload,
  shape,
}: {
  url: URL;
  method: METHOD;
  params: PARAMS;
  payload: PAYLOAD;
  shape: SHAPE;
}) => {
  return {
    url,
    method,
    params,
    payload,
    shape,
  };
};
