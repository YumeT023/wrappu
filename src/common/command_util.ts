import { sync as which } from "which";
import { normalize, parse, sep } from "path";
import { format as f } from "util";
import { execSync as run } from "node:child_process";
import { RuntimeCmd, WrappuError } from "./error";

/**
 * get the real cli path. avoid to exec IDE cmd such as `git` which may open Vscode somehow
 */
export const getCliPath = (cliName: string) => {
  // return directly if the given path is already a valid one
  const format = '"%s"';
  const notFound = "cli '%s' cannot be found.";
  const _notFound = () => {
    throw new Error(f(notFound, cliName));
  };

  try {
    const path = parse(which(cliName));
    if (path.name === cliName) {
      const dir = normalize(path.dir).toLowerCase();
      const ext = path.ext.toLowerCase();
      return f(format, dir + sep + path.name + ext);
    } else {
      _notFound();
    }
  } catch (error) {
    _notFound();
  }
};

export const executeCommand = (command: string) => {
  try {
    return run(command, {
      encoding: "utf8",
    }).trim();
  } catch (err) {
    WrappuError.throw(new RuntimeCmd(err.message));
  }
};
