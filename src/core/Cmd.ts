import { ArgOptions, Args, CMD, SArgs } from "../@types/cli";
import { DEFAULT_ARG_OPTION } from "../constant/defaultValue";
import { UnknownArgException } from "../errors";
import { DuplicateArgException } from "../errors/DuplicateArgException";
import { validateArg } from "./validation/validate-arg";

// TODO: feat(allow this kind of cmd `npm run build`)
export class Cmd implements CMD {
  readonly name: string;
  args: Args;

  private constructor(name: string) {
    this.name = name;
    this.args = new Map();
  }

  public static create(name: string) {
    return new this(name);
  }

  arg(key: string, options: ArgOptions = {}) {
    if (this.args.has(key)) {
      throw DuplicateArgException(key, this.name);
    }
    this.args.set(key, { ...DEFAULT_ARG_OPTION, ...options });

    return this;
  }

  validateArgsConstraints(args: SArgs): this {
    for (let [name, value] of Object.entries(args)) {
      let option = this.args.get(name);

      // no option means, it does not exist
      if (!option) {
        throw UnknownArgException(name, this.name);
      }

      validateArg(name, value, this.name, option);
    }

    return this;
  }
}
