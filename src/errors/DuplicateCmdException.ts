import { Exception } from "../@types/error";
import { Code } from "../constant/error";
import { interpolate } from "../utils/interpolate";
import { normalize } from "./utils/normalize";

class DuplicateCmd implements Exception {
  private static readonly TEMPLATE = `can't register cmd('{}') anymore. ensure it hasn't been registered before`;
  code: Code;
  message: string;
  name: string;

  constructor(cmd: string) {
    this.code = Code.C301;
    this.message = interpolate(DuplicateCmd.TEMPLATE, cmd);
    this.name = DuplicateCmdException.name;
  }
}

export const DuplicateCmdException = (cmd: string) => {
  return normalize(new DuplicateCmd(cmd), DuplicateCmdException);
};
