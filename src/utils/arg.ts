import { ArgSeparator } from "../constant/enum";

export const normalize = (arg: string, asAlias = false) => {
  let pre = "-";

  if (!asAlias) {
    pre += "-";
  }

  return pre.concat(arg);
};

export const stringArg = (
  name: string,
  val: string,
  asAlias: boolean,
  sep = ArgSeparator.SPACE
) => {
  return "".concat(normalize(name, asAlias), sep, val);
};

export const boolArg = (name: string, asAlias: boolean) => {
  return normalize(name, asAlias) + " ";
};
