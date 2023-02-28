import { CliWrapper, CMD, Commands, SArgs } from "../@types/cli";
import { exec } from "./utils/cmd";
import { Runner } from "./Runner";

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
      throw new Error(`cannot put the same cmd twice: '${name}'.`);
    }
    this.commands.set(name, cmd);

    return this;
  }

  setup(cmdName: string, args: SArgs = {}) {
    let cmd = this.commands.get(cmdName);

    if (!cmd) {
      throw new Error(
        `Unknown cmd '${cmdName}'. You may have forgotten to register it.`
      );
    }

    cmd.validateArgsConstraints(args);

    return new Runner(this.path, cmd, args);
  }

  check(): void {
    exec(this.path);
  }
}
