import { Cli, Cmd } from "../dist";
import { ArgType } from "../dist/@types";

// git wrapper implementation
const git = Cli.wrap("git");

const logOnline = new Cmd("log").arg("oneline", ArgType.BOOL);

const addAll = new Cmd("all");

const commit = new Cmd("commit").arg("message");

git.cmd(logOnline);
git.cmd(addAll);
git.cmd(commit);

git.createJob("log").run();
git.createJob("all").run();
git
  .createJob("commit", {
    message: '"feat: able to create simple wrapper and run command"',
  })
  .run();
