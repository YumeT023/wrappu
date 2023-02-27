import { Cli, Cmd } from "../dist";
import { ArgType } from "../dist/constant/enum";

// git wrapper simple implementation
const git = Cli.wrap("git");

const log = new Cmd("log").arg("oneline", ArgType.BOOL);

const status = new Cmd("status");

const init = new Cmd("init").arg("branch");

git.cmd(log);
git.cmd(status);
git.cmd(init);

git.setup("log", { oneline: true }).run();
git.setup("status").run();
