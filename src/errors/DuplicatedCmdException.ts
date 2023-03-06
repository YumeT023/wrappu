import { Exception } from "../@types/error";
import { Code } from "../constant/error";
import { interpolate } from "../utils/placeholder";
import { normalize } from "./utils/normalize";

class DuplicatedCmd implements Exception {
  private static readonly TEMPLATE = `can't register cmd('{}') anymore. ensure it hasn't been registered before`;
  code: Code;
  message: string;
  name: string;

  constructor(cmd: string) {
    this.code = Code.DUPLICATED_CMD;
    this.message = interpolate(DuplicatedCmd.TEMPLATE, cmd);
    this.name = DuplicatedCmdException.name;
  }
}

export const DuplicatedCmdException = (cmd: string) => {
  return normalize(new DuplicatedCmd(cmd), DuplicatedCmdException);
};
