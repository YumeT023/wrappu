import { ArgOptions, Args, ArgType, SArgs } from "../interface/cli_metadata";
import { DuplicatedArg, UnknownArg, WrappuError } from "../common/error";
import { validateArg } from "./validation_util";
import { Command } from "../interface/cli";

// TODO: feat(allow this kind of cmd `npm run build`)
export class Cmd implements Command {
  readonly name: string;
  args: Args;

  private constructor(name: string) {
    this.name = name;
    this.args = new Map();
  }

  public static create(name: string) {
    return new this(name);
  }

  arg(key: string, options: ArgOptions = DEFAULT_ARG_OPTION) {
    if (this.args.has(key)) {
      WrappuError.throw(new DuplicatedArg(key, this.name));
    }
    this.args.set(key, { ...options });
    return this;
  }

  validateArgsConstraints(args: SArgs): this {
    for (let [name, value] of Object.entries(args)) {
      let option = this.args.get(name);
      // no option means, it does not exist
      if (!option) WrappuError.throw(new UnknownArg(name, this.name));
      validateArg(name, String(value), this.name, option);
    }
    return this;
  }

  checkContainArgs(args: string[]): void {
    const cmdKeys = Array.from(this.args.keys());
    const regexp = new RegExp("^(".concat(cmdKeys.join("|")).concat(")$"));
    args.forEach((arg) => {
      if (!regexp.test(arg)) WrappuError.throw(new UnknownArg(arg, this.name));
    });
  }
}

const DEFAULT_ARG_OPTION: ArgOptions = {
  type: ArgType.STR,
  asAlias: false,
};
