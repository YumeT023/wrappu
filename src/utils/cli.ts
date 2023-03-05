import { exec } from "./cmd";
import { EOL } from "os";

/**
 * get the real cli path. avoid to exec IDE cmd such as `git` which may open Vscode somehow
 */
export const resolveCli = (path: string) => {
  // return directly if the given path is already a valid one
  if (isCLI(path)) {
    return path;
  }
  return findCli(path);
};

// TODO: ensure it works on linux based os
const findCli = (path: string) => {
  const cmd = `where ${path}`;
  const paths = exec(cmd).split(EOL) || [];

  if (!paths.length) {
    throw new Error("Unable to find the cli path");
  }

  for (let localVarPath of paths) {
    if (isCLI(localVarPath)) {
      return [`"`, localVarPath, `"`].join("");
    }
  }

  throw new Error("Unable to find the cli path");
};

const isCLI = (path: string) => {
  return /.*?(cmd|exe)/.test(path);
};
