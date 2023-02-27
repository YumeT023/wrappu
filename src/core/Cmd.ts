import { ArgKey, Args, ArgType, CMDInterface } from "../@types";

export class Cmd implements CMDInterface {
  readonly name: string;
  args: Args;

  constructor(name: string) {
    this.name = name;
    this.args = new Map<ArgKey, ArgType>([]);
  }

  arg(key: string, type= ArgType.STR) {
    if (this.args.has(key)) {
      throw new Error(`cannot register the same arg twice: '${key}'`);
    }
    this.args.set(key, type);

    return this;
  }
}
