import { execSync as run } from "node:child_process";

export const exec = (cmd: string) => {
  const localVarOutput = run(cmd, { encoding: "utf8" });
  console.log(localVarOutput);
};
