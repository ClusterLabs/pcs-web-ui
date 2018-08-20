/*global fetch*/
export const logout = async() => {
  const response = await fetch("/ui/logout", {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  return {
    status: response.status,
    data: await response.text(),
  };
};

export const login = async(username, password) => {
  const credentials = {username, password}
  const response = await fetch("/ui/login", {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: Object.keys(credentials)
    .map(key => (
      encodeURIComponent(key) + '=' + encodeURIComponent(credentials[key])
    ))
    .join('&')
  });
  return {
    status: response.status,
    data: await response.text(),
  };
};
