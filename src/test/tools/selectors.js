const dt = (...args) =>
  args
    .map((arg) => {
      if (arg.includes("[")) {
        return arg;
      }
      if (["^", "$"].includes(arg[0])) {
        return `[data-test${arg[0]}="${arg.slice(1)}"]`;
      }
      return `[data-test="${arg}"]`;
    })
    .join(" ");

module.exports = {
  dt,
};
