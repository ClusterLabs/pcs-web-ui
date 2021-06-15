export const endpoint = <URL, METHOD extends "get" | "post", PARAMS, SHAPE>({
  url,
  method,
  params,
  shape,
}: {
  url: URL;
  method: METHOD;
  params: PARAMS;
  shape: SHAPE;
}) => {
  return {
    url,
    method,
    params,
    shape,
  };
};
