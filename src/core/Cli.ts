import { CliWrapper, CMD } from "../@types/core";
import { Commands, SArgs } from "../@types/utils";
import { Runner } from "./Runner";
import { UnknownCmdException } from "../errors";
import { DuplicateCmdException } from "../errors/DuplicateCmdException";
import { resolveCli } from "../utils/cli";

// TODO: disallow to instantiate directly the Cli, both in js and ts
export class Cli implements CliWrapper {
  readonly path: string;
  commands: Commands;

  private constructor(path: string) {
    this.path = path;
    this.commands = new Map();
  }

  public static wrap(path: string) {
    return new this(resolveCli(path));
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
}
