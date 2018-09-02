import * as types from "./constants"

let nextId = 1;

export const createWaiting = (message) => ({
  type: types.CREATE_WAITING,
  payload: {
    id: nextId++,
    type: "INFO",
    message,
  }
});

export const destroy = (id) => ({
  type: types.DESTROY,
  payload: {id}
});

export const toSuccess = (id, message) => ({
  type: types.TO_SUCCESS,
  payload: {
    id,
    type: "SUCCESS",
    message
  }
})

export const toError = (id, message) => ({
  type: types.TO_ERROR,
  payload: {
    id,
    type: "ERROR",
    message
  }
})
