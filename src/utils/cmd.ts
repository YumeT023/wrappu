import { execSync as run } from "node:child_process";

export const exec = (cmd: string, callback?: (out: string) => any) => {
  const localVarOutput = run(cmd, { encoding: "utf8" });
  if (callback) {
    callback(localVarOutput)
  }
  return localVarOutput;
};
