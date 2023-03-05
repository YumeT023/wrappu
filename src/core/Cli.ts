import { CliWrapper, CMD, PreparedRunnable } from "../@types/core";
import { Commands, SArgs } from "../@types/utils";
import { PreparedRunner, Runner } from "./runner";
import { DuplicatedCmdException, UnknownCmdException } from "../errors";
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
      throw DuplicatedCmdException(name);
    }

    this.commands.set(name, cmd);
    return this;
  }

  setup(cmd: string, args: SArgs = {}) {
    let command = this.commands.get(cmd);

    if (!command) {
      throw UnknownCmdException(cmd);
    }

    command.validateArgsConstraints(args);

    return new Runner(this.path, command, args);
  }

  prepare(cmd: string, ...placeholders: string[]): PreparedRunnable {
    let command = this.commands.get(cmd);

    if (!command) {
      throw UnknownCmdException(cmd);
    }

    command.checkContainArgs(placeholders);

    return new PreparedRunner(this.path, command, placeholders);
  }
}
