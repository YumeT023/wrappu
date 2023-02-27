import { ArgSeparator } from "../constant/enum";

export const normalize = (arg: string) => {
  return "--".concat(arg);
};

export const stringArg = (
  name: string,
  val: string,
  sep = ArgSeparator.SPACE
) => {
  return "".concat(normalize(name), sep, val);
};

export const boolArg = (name: string) => {
  return normalize(name) + " ";
};
