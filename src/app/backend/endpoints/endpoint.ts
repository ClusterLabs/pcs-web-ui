export const endpoint = <URL, METHOD extends "get" | "post", SHAPE>({
  url,
  method,
  shape,
}: {
  url: URL;
  method: METHOD;
  shape: SHAPE;
}) => {
  return {
    url,
    method,
    shape,
  };
};
