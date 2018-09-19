import * as types from "./constants"
import * as msgTypes from "./msgTypes.js"

let nextId = 1;

export const create = ({type, message, disappear}) => ({
  type: types.CREATE,
  payload: {
    id: nextId++,
    type,
    message,
    disappear,
  }
});

export const destroy = (id) => ({
  type: types.DESTROY,
  payload: {id}
});

export const update = (notice, noticeUpdate) => ({
  type: types.UPDATE,
  payload: Object.assign({}, notice.payload, noticeUpdate),
})

// Sugar

export const info = (message, options) => create(
  Object.assign(
    {disappear: 5000},
    options,
    {type: msgTypes.INFO, message: message},
  )
);

export const success = (message, options) => create(
  Object.assign(
    {disappear: 3000},
    options,
    {type: msgTypes.SUCCESS, message: message},
  )
);

export const error = (message, options) => create(
  Object.assign(
    {disappear: false},
    options,
    {type: msgTypes.ERROR, message: message},
  )
);

export const toSuccess = (notice, noticeUpdate) => update(
  notice,
  Object.assign({}, noticeUpdate, {type: msgTypes.SUCCESS})
)

export const toError = (notice, noticeUpdate) => update(
  notice,
  Object.assign({}, noticeUpdate, {type: msgTypes.ERROR})
)