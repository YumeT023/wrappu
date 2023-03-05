import { Exception } from "../@types/error";
import { Code } from "../constant/error";
import { interpolate } from "../utils/interpolate";
import { normalize } from "./utils/normalize";

class DuplicateArg implements Exception {
  private static readonly TEMPLATE = `can't register arg('{}') more than one time in cmd('{}')`;
  code: Code;
  message: string;
  name: string;

  constructor(arg: string, cmd: string) {
    this.code = Code.DUPLICATED_ARG;
    this.message = interpolate(DuplicateArg.TEMPLATE, arg, cmd);
    this.name = DuplicateArgException.name;
  }
}

export const DuplicateArgException = (arg: string, cmd: string) => {
  return normalize(new DuplicateArg(arg, cmd), DuplicateArgException);
};
