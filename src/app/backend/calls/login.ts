import { api, endpoints, http } from "app/backend/tools";

const { url } = endpoints.login;

export const login = async (
  username: string,
  password: string,
): api.CallResult =>
  http.post(url, {
    params: [
      ["username", username],
      ["password", password],
    ],
  });
