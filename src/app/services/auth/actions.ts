export interface AuthRequired{
  type: "AUTH.REQUIRED",
}

export interface AuthSuccess{
  type: "AUTH.SUCCESS",
  payload: {
    username: string,
  }
}
