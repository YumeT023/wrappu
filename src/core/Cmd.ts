import { Args, CMDInterface, SArgs } from "../@types";
import { ArgType } from "../constant/enum";

export class Cmd implements CMDInterface {
  readonly name: string;
  args: Args;

  constructor(name: string) {
    this.name = name;
    this.args = new Map();
  }

  arg(key: string, type = ArgType.STR) {
    if (this.args.has(key)) {
      throw new Error(`cannot register the same arg twice: '${key}'`);
    }
    this.args.set(key, type);

    return this;
  }

  validateArgsConstraints(args: SArgs): this {
    for (let [name, value] of Object.entries(args)) {
      let type = this.args.get(name);

      // no type means, it does not exist
      if (!type) {
        throw new Error(
          `cmd '${this.name}' doesn't contain arg '${name}'. You may have forgotten to register it`
        );
      }

      if (type === ArgType.BOOL) {
        if (!/^(true|false)$/.test(String(value)) && value !== null) {
          throw new Error(
            `value: '${value}' violate the constraint: ${name}#${type}`
          );
        }
      }

      if (type === ArgType.STR && !value) {
        throw new Error(`missing value for the arg: ${name}#${type}`);
      }
    }

    return this;
  }
}
