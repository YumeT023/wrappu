import { Commands, SArgs } from "../interface/cli_metadata";
import { PreparedRunner, Runner } from "./runner";
import { DuplicatedCmd, UnknownCmd, WrappuError } from "../common/error";
import { CLI, Command } from "../interface/cli";
import { getCliPath } from "../common/command_util";

// TODO: disallow to instantiate directly the Cli, both in js and ts
export class Wrapper implements CLI {
  readonly path: string;
  commands: Commands;

  private constructor(path: string) {
    this.path = path;
    this.commands = new Map();
  }

  public static wrap(cliName: string) {
    const path = getCliPath(cliName);
    return new this(path);
  }

  cmd(cmd: Command) {
    let name = cmd.name;
    if (this.commands.has(name)) {
      WrappuError.throw(new DuplicatedCmd(name));
    }
    this.commands.set(name, cmd);
    return this;
  }

  setup(cmd: string, ...args: Array<SArgs | string>) {
    const command = this.commands.get(cmd);
    if (!command) WrappuError.throw(new UnknownCmd(cmd));

    let arg = args[0];
    if (args.length > 1 || typeof arg === "string") {
      const placeholders = args as string[];
      command.checkContainArgs(placeholders);
      return new PreparedRunner(this.path, command, placeholders);
    }
    const sArgs = (arg || {}) as SArgs;
    command.validateArgsConstraints(sArgs);
    return new Runner(this.path, command, sArgs);
  }
}
