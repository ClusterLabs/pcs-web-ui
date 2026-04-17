const age = (when: number) => Math.floor((Date.now() - when) / 1000);

const timeUnits = {
  minute: 60,
  hour: 60 * 60,
  day: 24 * 60 * 60,
};

const ageUnitLabel = (ageSeconds: number, unit: keyof typeof timeUnits) => {
  const groups = Math.floor(ageSeconds / timeUnits[unit]);
  return `${groups} ${unit}${groups > 1 ? "s" : ""} ago`;
};

const ageLabel = (ageSeconds: number) => {
  if (ageSeconds < 5) {
    return "just now";
  }
  if (ageSeconds < timeUnits.minute) {
    return `${5 * Math.floor(ageSeconds / 5)}s ago`;
  }
  if (ageSeconds < timeUnits.hour) {
    return ageUnitLabel(ageSeconds, "minute");
  }

  if (ageSeconds < timeUnits.day) {
    return ageUnitLabel(ageSeconds, "hour");
  }
  return ageUnitLabel(ageSeconds, "day");
};

export {age, ageLabel};
