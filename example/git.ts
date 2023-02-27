import { Cli, Cmd } from "../dist";
import { ArgType } from "../dist/constant/enum";

// git wrapper simple implementation
const git = Cli.wrap("git");

const log = new Cmd("log").arg("oneline", { type: ArgType.BOOL });

const status = new Cmd("status");

const init = new Cmd("init").arg("branch");

const commit = new Cmd("commit").arg("m", { asAlias: true });

const checkout = new Cmd("checkout").arg("b", { asAlias: true });

const branch = new Cmd("branch")
  .arg("D", { asAlias: true })
  .arg("delete")
  .arg("a", { type: ArgType.BOOL });

git.cmd(log);
git.cmd(status);
git.cmd(init);
git.cmd(commit);
git.cmd(checkout);
git.cmd(branch);

git.setup(branch.name, { D: 'master' }).run()