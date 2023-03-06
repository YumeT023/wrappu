import { execSync as run } from "node:child_process";
import { RuntimeCmdException } from "../errors/RuntimeCmdException";

export const exec = (cmd: string) => {
  try {
    return run(cmd, {
      encoding: "utf8",
    }).trim();
  } catch (err) {
    throw RuntimeCmdException(err.message);
  }
};
