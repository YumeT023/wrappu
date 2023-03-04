import { execSync as run } from "node:child_process";

export const exec = (cmd: string) => {
  const localVarOutput = run(cmd, { encoding: "utf-8" });
  console.log(localVarOutput);
};
