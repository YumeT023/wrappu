import { CliWrapper, CMD, Commands, SArgs } from "../@types/cli";
import { exec } from "./utils/cmd";
import { Runner } from "./Runner";
import { UnknownCmdException } from "../errors";
import { DuplicateCmdException } from "../errors/DuplicateCmdException";

export class Cli implements CliWrapper {
  readonly path: string;
  commands: Commands;

  private constructor(path: string) {
    this.path = path;
    this.commands = new Map();
  }

  static wrap(path: string) {
    return new Cli(path);
  }

  cmd(cmd: CMD) {
    let name = cmd.name;

    if (this.commands.has(name)) {
      throw DuplicateCmdException(name);
    }

    this.commands.set(name, cmd);
    return this;
  }

  setup(cmdName: string, args: SArgs = {}) {
    let cmd = this.commands.get(cmdName);

    if (!cmd) {
      throw UnknownCmdException(cmdName);
    }

    cmd.validateArgsConstraints(args);

    return new Runner(this.path, cmd, args);
  }

  check(): void {
    exec(this.path);
  }
}
