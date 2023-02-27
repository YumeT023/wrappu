import { Cli, Cmd } from "../dist";
import { ArgType } from "../dist/constant/enum";

// git wrapper implementation
const git = Cli.wrap("git");

const logOnline = new Cmd("log").arg("oneline", ArgType.BOOL);

const addAll = new Cmd("all");

const commit = new Cmd("commit").arg("message").arg("amend", ArgType.BOOL);

git.cmd(logOnline);
git.cmd(addAll);
git.cmd(commit);

git.createJob("commit", { amend: true }).run();
