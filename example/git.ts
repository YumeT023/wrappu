import { Cli, Cmd } from "../src";
import { ArgType } from "../src/@types";

const git = Cli.wrap("git");

const init = new Cmd("init")
  .arg("branch")
  .arg("template")
  .arg("is-okay", ArgType.BOOL);

git.cmd(init);

console.log(init);

console.log(git);