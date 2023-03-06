import { sync as which } from "which";
import * as path from "path";

const CLI_NOT_DEFINED = (cli: string) => {
  throw new Error(`${cli} is not found or is not the CLI program`);
};

/**
 * get the real cli path. avoid to exec IDE cmd such as `git` which may open Vscode somehow
 */
export const resolveCli = (cli: string) => {
  // return directly if the given path is already a valid one
  let temp;

  try {
    temp = which(cli);
  } catch (e) {
    CLI_NOT_DEFINED(cli);
  }

  const parsedPath = path.parse(temp);

  if (parsedPath.name !== cli) {
    CLI_NOT_DEFINED(cli);
  }

  const normalizedDir = path.normalize(parsedPath.dir).toLowerCase();
  const normalizedExt = parsedPath.ext.toLowerCase();

  return render(normalizedDir.concat(path.sep, parsedPath.name, normalizedExt));
};

const render = (path: string) => [`"`, path, `"`].join("");
