import { interpolate } from "../utils/interpolate";
import { Exception } from "../@types/error";
import { normalize } from "./utils/normalize";
import { Code } from "../constant/error";

class UnknownArg implements Exception {
  private static readonly TEMPLATE =
    "arg('{}') seems to be unknown to cmd('{}')";
  code: Code;
  message: string;
  name: string;

  constructor(arg: string, cmd: string) {
    this.code = Code.UNKNOWN_ARG;
    this.message = interpolate(UnknownArg.TEMPLATE, arg, cmd);
    this.name = UnknownArgException.name;
  }
}

export const UnknownArgException = (arg: string, cmd: string) => {
  return normalize(new UnknownArg(arg, cmd), UnknownArgException);
};
