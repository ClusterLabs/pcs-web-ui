export const success = {
  status: "success",
  status_msg: null,
  report_list: [],
  data: null,
};

export const missingKey = {
  status: "input_error",
  status_msg: "Missing key cmd",
  report_list: [],
  data: null,
};

export const unknownCmd = {
  status: "unknown_cmd",
  status_msg: "Unknown command 'resource.create'",
  report_list: [],
  data: null,
};

export const invalid = {
  status: "invalid status",
  report_list: ["invalid report item"],
  invalid_attribute: true,
};

export const invalidJson = message => ({
  status: "input_error",
  status_msg: `Unable to parse input data: ${message}`,
  report_list: [],
  data: null,
});

export const error = resportList => ({
  status: "error",
  status_msg: null,
  report_list: resportList,
  data: null,
});
