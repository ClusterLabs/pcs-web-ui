import { api, http } from "app/backend/tools";

export const login: api.Call<string> = async (
  username: string,
  password: string,
) =>
  http.post("/ui/login", {
    params: [
      ["username", username],
      ["password", password],
    ],
  });

export const logout: api.Call<string> = async () => http.get("/ui/logout");
