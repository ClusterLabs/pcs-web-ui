export interface LoadUsername {
  type: "USERNAME.LOAD",
}

export interface SetUsername {
  type: "USERNAME.SET",
  payload: {
    username: string,
  }
}
