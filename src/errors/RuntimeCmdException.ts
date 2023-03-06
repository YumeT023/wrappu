import { Exception } from "../@types/error";
import { Code } from "../constant/error";
import { normalize } from "./utils/normalize";

class RuntimeCmd implements Exception {
  code: Code;
  message: string;
  name: string;

  constructor(error: string) {
    this.code = Code.RUNTIME_CMD;
    this.message = error;
    this.name = RuntimeCmd.name;
  }
}

export const RuntimeCmdException = (error: string) => {
  return normalize(new RuntimeCmd(error), RuntimeCmdException);
};
