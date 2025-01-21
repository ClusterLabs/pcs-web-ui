export const match = (path: string, pattern: string) => {
  if (path === "/") {
    return ["/", "/*"].includes(pattern) ? {params: {}, matched: "/"} : null;
  }

  const pathElements = path.split("/");
  const patternElements = pattern.split("/");

  const endsWithAsterisk = patternElements[patternElements.length - 1] === "*";
  const mathPartCount = patternElements.length - (endsWithAsterisk ? 1 : 0);

  const matchByLength =
    pathElements.length === patternElements.length ||
    (endsWithAsterisk && pathElements.length >= mathPartCount);

  if (!matchByLength) {
    return null;
  }

  const params: Record<string, string> = {};
  for (let i = 0; i < mathPartCount; i++) {
    if (patternElements[i][0] === ":") {
      params[patternElements[i].slice(1)] = pathElements[i];
    } else if (patternElements[i] !== pathElements[i]) {
      return null;
    }
  }

  return {
    params,
    matched: pathElements.slice(0, mathPartCount).join("/"),
  };
};
