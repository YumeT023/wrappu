import { Exception } from "../@types/error";
import { Code } from "../constant/error";
import { interpolate } from "../utils/interpolate";
import { normalize } from "./utils/normalize";

class UnknownCmd implements Exception {
  private static readonly TEMPLATE = `Unknown cmd('{}')`;
  code: Code;
  message: string;
  name: string;

  constructor(cmd: string) {
    this.code = Code.UNKNOWN_CMD;
    this.message = interpolate(UnknownCmd.TEMPLATE, cmd);
    this.name = UnknownCmdException.name;
  }
}

export const UnknownCmdException = (cmd: string) => {
  return normalize(new UnknownCmd(cmd), UnknownCmdException);
};
