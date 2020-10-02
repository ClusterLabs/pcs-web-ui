import { api, http } from "app/backend/tools";

export const login = async (
  username: string,
  password: string,
): api.CallResult =>
  http.post("/ui/login", {
    params: [
      ["username", username],
      ["password", password],
    ],
  });

export const logout = async (): api.CallResult => http.get("/ui/logout");
