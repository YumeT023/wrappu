import { ArgOptions, Args, CMD, SArgs } from "../@types";
import { ArgType } from "../constant/enum";
import { DEFAULT_ARG_OPTION } from "../constant/defaultValue";

export class Cmd implements CMD {
  readonly name: string;
  args: Args;

  constructor(name: string) {
    this.name = name;
    this.args = new Map();
  }

  arg(key: string, options: ArgOptions = {}) {
    if (this.args.has(key)) {
      throw new Error(`cannot register the same arg twice: '${key}'`);
    }
    this.args.set(key, { ...DEFAULT_ARG_OPTION, ...options });

    return this;
  }

  validateArgsConstraints(args: SArgs): this {
    for (let [name, value] of Object.entries(args)) {
      let option = this.args.get(name);

      // no option means, it does not exist
      if (!option) {
        throw new Error(
          `cmd '${this.name}' doesn't contain arg '${name}'. You may have forgotten to register it`
        );
      }

      if (option.type === ArgType.BOOL) {
        if (!/^(true|false)$/.test(String(value)) && value !== null) {
          throw new Error(
            `value: '${value}' violate the constraint: ${name}#${option.type}`
          );
        }
      }

      if (option.type === ArgType.STR && !value) {
        throw new Error(`missing value for the arg: ${name}#${option.type}`);
      }
    }

    return this;
  }
}
