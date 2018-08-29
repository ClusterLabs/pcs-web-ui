import * as constants from "./constants"

let nextId = 1;

export const createWaiting = (message) => ({
  type: constants.CREATE_WAITING,
  payload: {
    id: nextId++,
    type: "INFO",
    message,
  }
});

export const destroy = (id) => ({
  type: constants.DESTROY,
  payload: {id}
});

export const toSuccess = (id, message) => ({
  type: constants.TO_SUCCESS,
  payload: {
    id,
    type: "SUCCESS",
    message
  }
})

export const toError = (id, message) => ({
  type: constants.TO_ERROR,
  payload: {
    id,
    type: "ERROR",
    message
  }
})
